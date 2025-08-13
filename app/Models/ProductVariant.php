<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class ProductVariant extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'sku',
        'price',
        'stock',
        'image_url',
    ];

    /**
     * Uma variante de produto pertence a um produto.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Uma variante de produto tem várias opções de variação (Cor e Tamanho).
     */
    public function options(): BelongsToMany
    {
        return $this->belongsToMany(VariationOption::class, 'variant_options', 'product_variant_id', 'variation_option_id');
    }
}