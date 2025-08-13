<?php
namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Category;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\VariationOption;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * Exibe a lista de produtos.
     */
    public function index(Request $request)
    {
        $query = Product::query();
        // Se houver um termo de busca, aplica o filtro
        $search = $request->input('search');
        if ($search) {
            $query->where('name', 'like', '%' . $search . '%');
                // ->orWhere('slug', 'like', '%' . $search . '%');
        }
        $products = $query->with('category')->with('brand')->paginate(10);

        return Inertia::render('admin/products/products', [
            'initialProducts' => $products->toArray(),
            'filters' => [
                'search' => $search
            ]
        ]);
    }

    /**
     * Mostra o formulário para criar um novo produto.
     */
    public function create()
    {
        $brands = Brand::where('active', true)->get();
        $categories = Category::where('active', true)->get();
        return Inertia::render('admin/products/create-product', [
            'brands' => $brands,
           'categories' => $categories
        ]);
    }

    /**
     * Salva um novo produto e suas variações.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'slug' => 'required|string|unique:products',
            'variants' => 'required|array',
            'variants.*.sku' => 'required|string|unique:product_variants',
            'variants.*.price' => 'required|numeric|min:0',
            'variants.*.stock' => 'required|integer|min:0',
            'variants.*.options' => 'required|array',
            'variants.*.options.*.option_value' => 'required|string|max:255',
            'variants.*.options.*.option_name' => 'required|string|max:255',
        ]);

        DB::beginTransaction();
        try {
            // 1. Cria o produto principal
            $product = Product::create($request->only(
                'name', 'description', 'slug', 'brand_id', 'category_id',
                'height', 'weight', 'width', 'length', 'meta_title', 'meta_description',
                'product_tags'
            ));

            // 2. Processa as variantes e suas opções
            foreach ($request->input('variants') as $variantData) {
                // Cria a variante do produto
                $productVariant = $product->variants()->create([
                    'sku' => $variantData['sku'],
                    'price' => $variantData['price'],
                    'stock' => $variantData['stock'],
                ]);

                $optionsToAttach = [];
                foreach ($variantData['options'] as $optionData) {
                    // Encontra ou cria a variação (ex: 'Cor')
                    $variation = $product->variations()->firstOrCreate(['option_name' => $optionData['option_name']]);

                    // Encontra ou cria a opção de variação (ex: 'Preto')
                    $variationOption = $variation->options()->firstOrCreate(['option_value' => $optionData['option_value']]);

                    $optionsToAttach[] = $variationOption->id;
                }
                
                // Conecta a variante com suas opções
                $productVariant->options()->attach($optionsToAttach);
            }

            DB::commit();
            // return redirect()->route('admin.products.index')->with('success', 'Produto e variações criados com sucesso!');
            return redirect(route('admin.products.index', absolute: false));
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Ocorreu um erro ao criar o produto. ' . $e->getMessage())->withInput();

            // return redirect()->back()->with('success_message', 'Item added successfully!');
            // return redirect()->back()->withErrors(['field_name' => 'This field is required.']);
        }
    }

    /**
     * Exibe os detalhes de um produto.
     */
    public function show(Product $product)
    {
        $product->load([
            'variants.options.variation',
            'images' => function($query){
                $query->orderBy('order');
            }
        ]);
        return Inertia::render('admin/products/show-product', [
            'product' => $product
        ]);
    }

    /**
     * Mostra o formulário para editar um produto.
     */
    public function edit(Product $product)
    {
        $product->load([
            'variants.options.variation',
            'images' => function($query){
                $query->orderBy('order');
            }
        ]);

         // Mapeia os dados para uma nova estrutura mais simples para o frontend
        $mappedVariants = $product->variants->map(function ($variant) {
            $mappedOptions = $variant->options->map(function ($option) {
                return [
                    'option_value' => $option->option_value,
                    // Pega o nome da variação do objeto 'variation' e move para o nível superior
                    'option_name' => $option->variation->option_name,
                ];
            });

            return [
                'id' => $variant->id,
                'sku' => $variant->sku,
                'price' => $variant->price,
                'stock' => $variant->stock,
                'options' => $mappedOptions->toArray(),
            ];
        });
        
        $productData = $product->toArray(); // Pega os atributos do produto
        $productData['variants'] = $mappedVariants->toArray(); // Adiciona as variantes mapeadas

        $brands = Brand::where('active', true)->get();
        $categories = Category::where('active', true)->get();

        return Inertia::render('admin/products/edit-product', [
            'product' => $productData,
            'brands' => $brands,
            'categories' => $categories
        ]);
    }

    /**
     * Atualiza um produto.
     * Note: A lógica de atualização de variações pode ser mais complexa.
     */
    public function update(Request $request, Product $product)
    {
       // As regras de validação são as mesmas do método store
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'slug' => 'required|string|max:255|unique:products,slug,' . $product->id,
            'brand_id' => 'nullable|integer',
            'category_id' => 'nullable|integer',
            'variants' => 'required|array',
            'variants.*.sku' => 'required|string|distinct|max:255',
            'variants.*.price' => 'required|numeric|min:0',
            'variants.*.stock' => 'required|integer|min:0',
            'variants.*.options' => 'required|array',
            'variants.*.options.*.option_value' => 'required|string|max:255',
            'variants.*.options.*.option_name' => 'required|string|max:255',
        ]);

        DB::beginTransaction();
        try {
            // 1. Atualiza o produto principal
            $product->update($request->only(
                'name', 'description', 'slug', 'brand_id', 'category_id',
                'height', 'weight', 'width', 'length', 'meta_title', 'meta_description',
                'product_tags'
            ));

            // 2. Deleta as variações e opções antigas
            // O onDelete('cascade') na migration fará a limpeza das `variation_options`
            $product->variants()->delete();

            // 3. Processa as variantes e suas opções
            foreach ($request->input('variants') as $variantData) {
                // Cria a variante do produto
                $productVariant = $product->variants()->create([
                    'sku' => $variantData['sku'],
                    'price' => $variantData['price'],
                    'stock' => $variantData['stock'],
                ]);

                $optionsToAttach = [];
                foreach ($variantData['options'] as $optionData) {
                    // Encontra ou cria a variação (ex: 'Cor')
                    $variation = $product->variations()->firstOrCreate(['option_name' => $optionData['option_name']]);

                    // Encontra ou cria a opção de variação (ex: 'Preto')
                    $variationOption = $variation->options()->firstOrCreate(['option_value' => $optionData['option_value']]);

                    $optionsToAttach[] = $variationOption->id;
                }
                
                // Conecta a variante com suas opções
                $productVariant->options()->attach($optionsToAttach);
            }
            // Se tudo deu certo, salva as mudanças
            DB::commit();

            // return back()->with('success', 'Produto atualizado com sucesso!');
            return redirect(route('admin.products.index', absolute: false));
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Ocorreu um erro ao atualizar o produto. ' . $e->getMessage());
        }
    }

    /**
     * Remove um produto.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('admin.products.index')->with('success', 'Produto removido com sucesso!');
    }
}