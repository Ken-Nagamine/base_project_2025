<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Variation extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'option_name',
    ];

    /**
     * Uma variação pertence a um produto.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Uma variação (Cor) tem várias opções (Preto, Branco).
     */
    public function options(): HasMany
    {
        return $this->hasMany(VariationOption::class);
    }
}