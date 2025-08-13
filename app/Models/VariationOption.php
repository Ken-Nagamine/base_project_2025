<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class VariationOption extends Model
{
    use HasFactory;

    protected $fillable = [
        'variation_id',
        'option_value',
    ];

    /**
     * Uma opção de variação pertence a uma variação.
     */
    public function variation(): BelongsTo
    {
        return $this->belongsTo(Variation::class);
    }

    /**
     * Uma opção de variação pode pertencer a várias variantes de produto.
     */
    public function productVariants(): BelongsToMany
    {
        return $this->belongsToMany(ProductVariant::class, 'variant_options', 'variation_option_id', 'product_variant_id');
    }
}