<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Neste exemplo o front faz os filtros.
        $categories = Brand::all()->map(function ($brand) {
            // Certifique-se de que a URL está correta, especialmente se for para um asset local
            $brand->logo_url = $brand->logo_url ? Storage::url($brand->logo_url) : null;
            return $brand;
        });

        return Inertia::render('admin/brands/brands', [
            'initialBrands' => $categories,
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
            'name' => 'required|string|max:190|unique:brands',
            'description' => 'nullable|string',
            'logo_url' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'website_url' => 'nullable|string|max:190',
        ]);

        $imagePath = null;
        if( $request->hasFile('logo_url')){
            $imagePath = Storage::disk('public')->putFile('images/brands', $request->file('logo_url'));
        }

        Brand::create([
            'name' => $request->name,
            'description' => $request->description,
            'logo_url' => $imagePath,
            'website_url' => $request->website_url,
            'active' => $request->active
        ]);

        return redirect(route('admin.brands.index', absolute: false));
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
    public function update(Request $request, Brand $brand)
    {
        $request->validate([
            'name' => 'required|string|max:190|unique:brands, name,' . $brand->id,
            'description' => 'nullable|string',
            'logo_url' => 'nullable|sometimes|image|mimes:jpeg,png,jpg,webp|max:2048',
            'website_url' => 'nullable|string|max:190',
        ]);
         
        $imagePath = $brand->logo_url; // Mantém a imagem existente por padrão

         // Se uma nova imagem foi enviada
        if ($request->hasFile('logo_url')) { 
            // Remove a imagem antiga se existir
            if ($imagePath && Storage::disk('public')->exists($imagePath)) {
                Storage::disk('public')->delete($imagePath);
            }
            $imagePath = Storage::disk('public')->putFile('images/brands', $request->file('logo_url'));
        } 

        $brand->update([
            'name' => $request->name,
            'description' => $request->description,
            'logo_url' => $imagePath,
            'website_url' => $request->website_url,
            'active' => $request->active
        ]);

        return redirect(route('admin.brands.index', absolute: false));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Brand $brand)
    {
        if ($brand->image && Storage::disk('public')->exists($brand->logo_url)) {
            Storage::disk('public')->delete($brand->logo_url);
        }
        $brand->delete();

        return redirect('admin/brands');
    }
}
