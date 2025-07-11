<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Inertia\Inertia;
use Inertia\Response;

class UserPasswordResetLinkController extends Controller
{
    /**
     * Show the password reset link request page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/user-forgot-password', [
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming password reset link request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => [
                'required',
                'email',
                // A regra 'exists' verifica se o e-mail existe na tabela 'users' na coluna 'email'.
                // Se não existir, a validação falha e um erro é retornado.
                'exists:users,email',
            ],
        ]);

        Password::sendResetLink(
            $request->only('email')
        );

        return back()->with('status', __('Se o endereço de e-mail estiver em nossos registros, um link para redefinir sua senha foi enviado para ele.'));
    }
}
