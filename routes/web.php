<?php

use App\Http\Controllers\Auth\UserAuthenticatedSessionController;
use App\Http\Controllers\Auth\UserRegisteredController;
use App\Http\Controllers\Auth\UserPasswordResetLinkController;
use App\Http\Controllers\Auth\AdminAuthenticatedSessionController;
use App\Http\Controllers\Auth\AdminEmailVerificationNotificationController;
use App\Http\Controllers\Auth\AdminEmailVerificationPromptController;
use App\Http\Controllers\Auth\AdminNewPasswordController;
use App\Http\Controllers\Auth\AdminPasswordResetLinkController;
use App\Http\Controllers\Auth\AdminRegisteredController;
use App\Http\Controllers\Auth\AdminVerifyEmailController;
use App\Http\Controllers\Auth\UserEmailVerificationNotificationController;
use App\Http\Controllers\Auth\UserEmailVerificationPromptController;
use App\Http\Controllers\Auth\UserNewPasswordController;
use App\Http\Controllers\Auth\UserVerifyEmailController;
use App\Http\Controllers\IndexController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// --- Rotas Públicas e da Área de Usuário (Guarda 'user') ---
// Essas rotas não precisam de middleware 'guest' se seus controladores já o gerenciam
Route::get('/', [IndexController::class, 'create'])->name('home');

// O 'name' é crucial para o redirecionamento do middleware Authenticate
// O middleware 'guest' garante que só acessa se não estiver logado
Route::middleware('guest')->group(function () {
    Route::get('login', [UserAuthenticatedSessionController::class, 'create'])->name('login'); // Rota para o formulário de login do usuário   
    Route::post('login', [UserAuthenticatedSessionController::class, 'store']);

    // Rotas de Registro para o usuário padrão (se habilitado)
    Route::get('register', [UserRegisteredController::class, 'create'])->name('register');
    Route::post('register', [UserRegisteredController::class, 'store']);

    Route::get('forgot-password', [UserPasswordResetLinkController::class, 'create'])
        ->name('password.request');
    Route::post('forgot-password', [UserPasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::get('reset-password', [UserNewPasswordController::class, 'create'])
        ->name('password.reset');
    Route::post('reset-password', [UserNewPasswordController::class, 'store'])
        ->name('password.store');
});

Route::middleware('auth:web')->group(function () { // ['auth:web', 'verified'] para validar email
    Route::get('/dashboard', function () {
        return Inertia::render('client/client-dashboard', [
            'user' => auth()->guard('web')->user(), // Passa o usuário logado para o frontend
        ]);
    })->name('user.dashboard'); // Rota protegida para usuários

    Route::get('verify-email', UserEmailVerificationPromptController::class)
        ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', UserVerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', [UserEmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');


    Route::post('logout', [UserAuthenticatedSessionController::class, 'destroy'])->name('logout'); // Rota para logout do usuário
});



//**********************************************************************/
// --- Rotas da Área de Administração (Guarda 'admin') ---
// Todas as rotas dentro deste grupo só podem ser acessadas pelo guarda 'admin'
// O 'prefix' define a URL base (site.com/admin/...)
// O 'name' define o prefixo para os nomes das rotas (admin.login, admin.dashboard, etc.)
Route::prefix('/admin')->name('admin.')->group(function () {

    // Rotas de Autenticação para o administrador
    // O middleware 'guest:admin' garante que só acessa se não estiver logado como admin
    Route::middleware('guest:admin')->group(function () { // Use guest:admin para que admins deslogados possam acessar
        Route::get('/login', [AdminAuthenticatedSessionController::class, 'create'])->name('login'); // Rota para o formulário de login do admin
        Route::post('/login', [AdminAuthenticatedSessionController::class, 'store']); // Processa o login admin     

        Route::get('/forgot-password', [AdminPasswordResetLinkController::class, 'create'])
            ->name('password.request');
        Route::post('/forgot-password', [AdminPasswordResetLinkController::class, 'store'])
            ->name('password.email');

        Route::get('reset-password/{token}', [AdminNewPasswordController::class, 'create'])
            ->name('password.reset');
        Route::post('reset-password', [AdminNewPasswordController::class, 'store'])
            ->name('password.store');
    });

    Route::middleware('auth:admin')->group(function () {  // ['auth', 'verified'] para validar email
    
        Route::get('/dashboard', function () {
            return Inertia::render('admin/admin-dashboard', [
                'admin' => auth()->guard('admin')->user(), // Passa o admin logado
            ]);
        })->name('dashboard'); // Rota protegida para admins
        
        Route::get('/register', [AdminRegisteredController::class, 'create'])->name('register');
        Route::post('/register', [AdminRegisteredController::class, 'store']);

        Route::get('verify-email', AdminEmailVerificationPromptController::class)
            ->name('verification.notice');

        Route::get('verify-email/{id}/{hash}', AdminVerifyEmailController::class)
            ->middleware(['signed', 'throttle:6,1'])
            ->name('verification.verify');

        Route::post('email/verification-notification', [AdminEmailVerificationNotificationController::class, 'store'])
            ->middleware('throttle:6,1')
            ->name('verification.send');

        // Outras rotas administrativas aqui...




        Route::post('/logout', [AdminAuthenticatedSessionController::class, 'destroy'])->name('logout'); // Rota para logout do admin
    });

});

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

// require __DIR__.'/settings.php';
// require __DIR__.'/auth.php';
// require __DIR__.'/admin.php';
