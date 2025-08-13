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
        Schema::create('product_images', function (Blueprint $table) {
            $table->id();

            // Chave estrangeira para o produto principal. Pode ser nula
            // se a imagem pertencer apenas a uma variante.
            $table->foreignId('product_id')->nullable()->constrained('products')->onDelete('cascade');

            // Chave estrangeira para a variante (SKU). Pode ser nula
            // se a imagem for para o produto principal.
            $table->foreignId('product_variant_id')->nullable()->constrained('product_variants')->onDelete('cascade');
            
            // Valida se pelo menos uma das chaves estrangeiras está preenchida.
            // Para isso, você pode adicionar uma validação no backend.
            $table->string('image');
            $table->integer('order')->default(0);
            $table->boolean('is_thumbnail')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_images');
    }
};
