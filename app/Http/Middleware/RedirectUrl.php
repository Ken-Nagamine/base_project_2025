<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth; // Se precisar verificar autenticação

class RedirectUrl
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
         // Ex: 'admin/dashboard', 'admin/users'
        if (str_contains($request->path(), 'admin')) {
            // Lógica a ser executada se 'admin' estiver no caminho
            // Por exemplo, você pode redirecionar, abortar, ou verificar permissões.
            // Exemplo: Se for uma URL de admin e o usuário não for admin logado, redirecione.
            if (!Auth::guard('admin')->check()) {
                // dd(!Auth::guard('admin')->check());
                if(!str_contains($request->path(), 'admin/login') && $request->isMethod('get')){
                    // return redirect()->route('admin.login');
                    return redirect('/admin/login');
                }
            }
        }

        return $next($request);
    }
}
