<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('slug')->unique();
            $table->timestamps();
            // dados para transporte
            $table->string('height')->nullable(); // altura
            $table->string('weight')->nullable(); // peso
            $table->string('width')->nullable(); // largura
            $table->string('length')->nullable(); //comprimento

            $table->string("product_tags")->nullable();
            $table->string('meta_title')->nullable();
            $table->string("meta_description")->nullable();
            $table->boolean("active")->default(true);
            
            $table->foreignId('brand_id')->nullable()->constrained('brands')->onDelete('set null');
            $table->foreignId('category_id')->nullable()->constrained('categories')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
