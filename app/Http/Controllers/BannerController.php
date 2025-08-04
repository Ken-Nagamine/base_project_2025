<?php

namespace App\Http\Controllers;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Banner;
use Illuminate\Support\Facades\Storage;

class BannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        // Inicia a query do Eloquent
        $query = Banner::query();
        // Se houver um termo de busca, aplica o filtro
        if ($search) {
            $query->where('title', 'like', '%' . $search . '%');
            //   ->orWhere('email', 'like', '%' . $search . '%');
        }
        $banners = $query->paginate(10);

        $banners->getCollection()->transform(function ($banner) {
            if ($banner->image_desktop) {
                $banner->image_desktop = Storage::url($banner->image_desktop);
            } else {
                $banner->image_desktop = null;
            }
            if ($banner->image_mobile) {
                $banner->image_mobile = Storage::url($banner->image_mobile);
            } else {
                $banner->image_mobile = null;
            }
            return $banner;
        });

        return Inertia::render('admin/banners/banners', [
            'initialBanners' => $banners->toArray(),
            'filters' => [
                'search' => $search
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // 1. Obtenha todos os números de ordem já existentes no banco
        $existingOrders = Banner::pluck('order')->toArray();
        // 2. Defina o range de números possíveis para 'order'
        $maxOrder = 20;
        $allPossibleOrders = range(1, $maxOrder);
        // 3. Calcule quais números do range total não estão nos números existentes
        $availableOrders = array_diff($allPossibleOrders, $existingOrders);
        // Reindexa o array para garantir que os índices sejam sequenciais no JS
        $availableOrders = array_values($availableOrders);
        return inertia('admin/banners/create-banner', [
            'availableOrders' => $availableOrders,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:190',
            'phrase_1' => 'nullable|sometimes|string|max:190',
            'phrase_2' => 'nullable|sometimes|string|max:190',
            'link' => 'nullable|string|max:190', 
            'image_desktop' => 'image|mimes:jpeg,png,jpg,webp|max:2048',
            'image_mobile' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'order' => 'required|integer|min:1|unique:banners,order',
        ]);

        $imageDesktopPath = null;
        $imageMobilePath = null;
        if( $request->hasFile('image_desktop')){
            $imageDesktopPath = Storage::disk('public')->putFile('images/banners', $request->file('image_desktop'));
        }

        if( $request->hasFile('image_mobile')){
            $imageMobilePath = Storage::disk('public')->putFile('images/banners', $request->file('image_mobile'));
        }

        Banner::create([
            'title' => $request->title,
            'phrase_1' => $request->phrase_1,
            'phrase_2' => $request->phrase_2,
            'link' => $request->link, 
            'image_desktop' => $imageDesktopPath,
            'image_mobile' => $imageMobilePath,
            'order' => $request->order,
            'active' => $request->active
        ]);

        return redirect(route('admin.banners.index', absolute: false));
    }

    /**
     * Display the specified resource.
     */
    public function show(Banner $banner)
    {
        if ($banner->image_desktop) {
            $banner->image_desktop = Storage::url($banner->image_desktop);
        } else {
            $banner->image_desktop = null;
        }
        if ($banner->image_mobile) {
            $banner->image_mobile = Storage::url($banner->image_mobile);
        } else {
            $banner->image_mobile = null;
        }
        return Inertia::render('admin/banners/show-banner', ['banner' => $banner]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Banner $banner)
    {
         // 1. Obtenha todos os números de ordem já existentes no banco
        $existingOrders = Banner::pluck('order')->toArray();
        // 2. Defina o range de números possíveis para 'order'
        $maxOrder = 20;
        $allPossibleOrders = range(1, $maxOrder);
        // 3. Calcule quais números do range total não estão nos números existentes
        $availableOrders = array_diff($allPossibleOrders, $existingOrders);
        // Reindexa o array para garantir que os índices sejam sequenciais no JS
        $availableOrders = array_values($availableOrders);

        $banner->image_desktop = $banner->image_desktop ? Storage::url($banner->image_desktop) : null;
        $banner->image_mobile = $banner->image_mobile ? Storage::url($banner->image_mobile) : null;

        return inertia('admin/banners/edit-banner', [
            'banner' => $banner,
            'availableOrders' => $availableOrders,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Banner $banner)
    {
         $request->validate([
            'title' => 'required|string|max:190',
            'phrase_1' => 'nullable|sometimes|string|max:190',
            'phrase_2' => 'nullable|sometimes|string|max:190',
            'link' => 'nullable|string|max:190', 
            'image_desktop' => 'nullable|sometimes|image|mimes:jpeg,png,jpg,webp|max:2048',
            'image_mobile' => 'nullable|sometimes|image|mimes:jpeg,png,jpg,webp|max:2048',
            'order' => 'required'
        ]);

        $imageDesktopPath = $banner->image_desktop; 
        $imageMobilePath = $banner->image_mobile; 

         if ($request->hasFile('image_desktop')) { 
            // Remove a imagem antiga se existir
            if ($imageDesktopPath && Storage::disk('public')->exists($imageDesktopPath)) {
                Storage::disk('public')->delete($imageDesktopPath);
            }
            $imageDesktopPath = Storage::disk('public')->putFile('images/banners', $request->file('image_desktop'));
        } 

         if ($request->hasFile('image_mobile')) { 
            // Remove a imagem antiga se existir
            if ($imageMobilePath && Storage::disk('public')->exists($imageMobilePath)) {
                Storage::disk('public')->delete($imageMobilePath);
            }
            $imageMobilePath = Storage::disk('public')->putFile('images/banners', $request->file('image_mobile'));
        } 

        $banner->update([
            'title' => $request->title,
            'phrase_1' => $request->phrase_1,
            'phrase_2' => $request->phrase_2,
            'link' => $request->link, 
            'image_desktop' => $imageDesktopPath,
            'image_mobile' => $imageMobilePath,
            'order' => $request->order,
            'active' => $request->active
        ]);

        return redirect(route('admin.banners.index', absolute: false));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Banner $banner)
    {
        if ($banner->image_desktop && Storage::disk('public')->exists($banner->image_desktop)) {
            Storage::disk('public')->delete($banner->image_desktop);
        }

        if ($banner->image_mobile && Storage::disk('public')->exists($banner->image_mobile)) {
            Storage::disk('public')->delete($banner->image_mobile);
        }

        $banner->delete();

        return redirect('admin/banners');
    }
}
