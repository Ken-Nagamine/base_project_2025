<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class UserAuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/user-login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]); // Renderiza o componente React de login do usuário
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ]);

        // Tenta autenticar usando o guard 'web' (usuário padrão)
        if (! Auth::guard('web')->attempt($request->only('email', 'password'), $request->boolean('remember'))) {
            throw ValidationException::withMessages([
                'email' => trans('auth.failed'),
            ]);
        }

        $request->session()->regenerate();

        // Redireciona para o dashboard do usuário após o login
        return redirect()->intended(route('user.dashboard'));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
         // 1. Desloga o guard 'web' (usuário normal).
        Auth::guard('web')->logout();

        // 2. Remove as chaves de sessão específicas do guard 'web'.
        // Isso impede que ele permaneça "logado" mesmo sem o status do guard.
        $request->session()->forget('login_web_'.sha1(request()->getHost())); // Chave de autenticação
        $request->session()->forget('login_web_'.sha1(request()->getHost()).'_password_hash'); // Chave do hash da senha

        // 3. Importante: NÃO chame invalidate() ou regenerateToken() aqui.
        // Isso invalidaria toda a sessão, deslogando outros guards.
        // $request->session()->invalidate();
        // $request->session()->regenerateToken();

        return redirect('/'); // Redireciona para a página inicial
    }
}
