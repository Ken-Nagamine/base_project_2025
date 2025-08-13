<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Brand extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
    */
    protected $table = 'brands';


    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'logo_url',
        'website_url',
        'active'
    ];
    
    // Um fabricante pode ter muitos produtos
    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }
}