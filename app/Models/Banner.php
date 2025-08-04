<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
     /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'banners';


    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'phrase_1',
        'phrase_2',
        'title',
        'link',
        'position',
        'image_desktop',
        'image_mobile',
        'order',
        'active'
    ];

     /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'active' => 'boolean'
        ];
    }
}
