<?php

use Illuminate\Support\Facades\Route;
// use Inertia\Inertia;
use App\Http\Controllers\Admin\Auth\AuthenticatedSessionController as AdminAuthenticatedSessionController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;

// Rotas de autenticação para o admin
Route::get('admin/login', [AdminAuthenticatedSessionController::class, 'create'])->name('login');

Route::post('admin/login', [AdminAuthenticatedSessionController::class, 'store']);

Route::post('admin/logout', [AdminAuthenticatedSessionController::class, 'destroy'])->name('logout');

// Rotas protegidas pelo guard 'admin'
Route::middleware('auth:admin')->group(function () {
    Route::get('dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    // Adicione outras rotas do painel administrativo aqui
});