<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class AdminRegisteredController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/admin-register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $admin = Admin::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Dispara o evento de admin registrado.
        // É este evento que, por padrão, chama sendEmailVerificationNotification()
        // se o model Admin implementar MustVerifyEmail.
        event(new Registered($admin));

        Auth::login($admin);

         // Após o registro e login, o usuário é redirecionado.
        // Se o usuário precisa verificar o e-mail, ele será redirecionado
        // para a página de notificação de verificação pelo middleware 'verified'
        // nas rotas que ele tentar acessar depois.

        return redirect()->intended(route('admin.dashboard', absolute: false));
    }
}
