<?php
namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductImageController extends Controller
{
    /**
     * Salva uma ou mais imagens para um produto.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Product $product
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request, Product $product)
    {
        $request->validate([
            'images' => 'required|array',
            'images.*' => 'mimetypes:image/avif,image/jpeg,image/png,image/gif,image/webp|max:2048', // Valida cada arquivo no array de imagens
        ]);

        foreach ($request->file('images') as $image) {
            // Salva o arquivo no disco (storage/app/public/products)
            $path = Storage::disk('public')->putFile('images/products', $image);

            // 3. Cria a entrada no banco de dados
            $product->images()->create([
                'product_id' => $product->id,
                'image' => $path,
                'order' => $product->images()->max('order') + 1, // Define a ordem
            ]);
        }

        return back()->with('success', 'Imagens salvas com sucesso!');
    }

    public function reorder(Request $request, Product $product)
    {
        // recebe images_ids do front
        $request->validate(['image_ids' => 'required|array']);
        $imageIds = $request->input('image_ids');
        foreach ($imageIds as $index => $imageId) {
            $image = ProductImage::find($imageId['id']);
            if ($image && $image->product_id === $product->id) {
                $image->update(['order' => $imageId['order']]);
            }
        }
        return back()->with('success', 'Imagem removida com sucesso!');
    }

    /**
     * Remove uma imagem de um produto.
     *
     * @param \App\Models\Product $product
     * @param \App\Models\ProductImage $image
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Product $product, ProductImage $image)
    {
        if ($image->product_id !== $product->id) {
            abort(403);
        }

        Storage::disk('public')->delete($image->image);
        $image->delete();

        return back()->with('success', 'Imagem removida com sucesso!');
        // return redirect()->back()->with('success', 'Image deleted successfully!');
    }
}