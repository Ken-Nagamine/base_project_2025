<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Neste exemplo o front faz os filtros.
        $categories = Category::all()->map(function ($category) {
            // Certifique-se de que a URL está correta, especialmente se for para um asset local
            $category->image = $category->image ? Storage::url($category->image) : null;
            return $category;
        });

        // 1. Obtenha todos os números de ordem já existentes no banco
        $existingOrders = Category::pluck('order')->toArray();
        // 2. Defina o range de números possíveis para 'order'
        // Ex: De 1 a 50 (ajuste conforme sua necessidade)
        $maxOrder = 20;
        $allPossibleOrders = range(1, $maxOrder);
        // 3. Calcule quais números do range total não estão nos números existentes
        $availableOrders = array_diff($allPossibleOrders, $existingOrders);
        // Reindexa o array para garantir que os índices sejam sequenciais no JS
        $availableOrders = array_values($availableOrders);

        return Inertia::render('admin/categories/categories', [
            'initialCategories' => $categories,
            'availableOrders' => $availableOrders
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Não é utilizado no caso de modal
        return inertia('admin/dashboard');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:190',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'order' => 'required|integer|min:1|unique:categories,order',
        ]);

        $imagePath = null;
        if( $request->hasFile('image')){
            $imagePath = Storage::disk('public')->putFile('images/categories', $request->file('image'));
        }

        Category::create([
            'name' => $request->name,
            'order' => $request->order,
            'image' => $imagePath,
            'active' => $request->active
        ]);

        return redirect(route('admin.categories.index', absolute: false));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Não é utilizado no caso de modal
        return inertia('admin/dashboard');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // Não é utilizado no caso de modal
        return inertia('admin/dashboard');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|max:190',
             // 'image' é opcional na edição, 'nullable' permite que não seja enviado
            // 'sometimes' valida apenas se o campo estiver presente
            'image' => 'nullable|sometimes|image|mimes:jpeg,png,jpg,webp|max:2048',
            'order' => 'required'
        ]);
         
        $imagePath = $category->image; // Mantém a imagem existente por padrão

         // Se uma nova imagem foi enviada
        if ($request->hasFile('image')) { 
            // Remove a imagem antiga se existir
            if ($imagePath && Storage::disk('public')->exists($imagePath)) {
                Storage::disk('public')->delete($imagePath);
            }
            $imagePath = Storage::disk('public')->putFile('images/categories', $request->file('image'));
        } 

        $category->update([
            'name' => $request->name,
            'image' => $imagePath,
            'order' => $request->order,
            'active' => $request->active
        ]);

        return redirect(route('admin.categories.index', absolute: false));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        if ($category->image && Storage::disk('public')->exists($category->image)) {
            Storage::disk('public')->delete($category->image);
        }
        $category->delete();

        return redirect('admin/categories');
    }
}
