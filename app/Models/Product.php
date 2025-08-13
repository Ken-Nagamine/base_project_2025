<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'slug',
        'brand_id',
        'category_id',
        'height',
        'weight',
        'width',
        'length',
        'meta_title',
        'meta_description',
        'active',
        'product_tags'
    ];

    /**
     * Um produto pode ter várias variações (Cor, Tamanho).
     */
    public function variations(): HasMany
    {
        return $this->hasMany(Variation::class);
    }

    /**
     * Um produto pode ter várias variantes (SKUs).
     */
    public function variants(): HasMany
    {
        return $this->hasMany(ProductVariant::class);
    }

    // Um produto pertence a um fabricante
    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

     /**
     * Get the category that owns the product.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the images for the product.
    */
    public function images(): HasMany
    {
        // 💡 Aqui está o novo relacionamento com o Model ProductImage
        return $this->hasMany(ProductImage::class);
    }
}