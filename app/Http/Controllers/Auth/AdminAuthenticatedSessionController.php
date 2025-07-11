<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class AdminAuthenticatedSessionController extends Controller
{
    /**
     * Display the admin login view.
     */
    public function create(): Response
    {
        return Inertia::render('auth/admin-login'); // Renderiza o componente React de login do admin
    }

    /**
     * Handle an incoming admin authentication request.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ]);

        // Tenta autenticar usando o guard 'admin'
        if (! Auth::guard('admin')->attempt($request->only('email', 'password'), $request->boolean('remember'))) {
            throw ValidationException::withMessages([
                'email' => trans('auth.failed'),
            ]);
        }

        $request->session()->regenerate();

        // Redireciona para o dashboard do admin após o login
        return redirect()->intended(route('admin.dashboard'));
    }

    /**
     * Destroy an authenticated admin session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        // 1. Desloga o guard 'admin'.
        Auth::guard('admin')->logout();

        // 2. Remove as chaves de sessão específicas do guard 'admin'.
        $request->session()->forget('login_admin_'.sha1(request()->getHost())); // Chave de autenticação
        $request->session()->forget('login_admin_'.sha1(request()->getHost()).'_password_hash'); // Chave do hash da senha

        // 3. Importante: NÃO chame invalidate() ou regenerateToken() aqui.
        // Isso invalidaria toda a sessão, deslogando outros guards.
        // $request->session()->invalidate();
        // $request->session()->regenerateToken();

        return redirect('/admin/login'); // Redireciona para a página inicial
    }
}
