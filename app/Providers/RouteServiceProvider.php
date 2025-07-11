<?php
namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    public const HOME = '/dashboard';
    public const ADMIN_HOME = '/admin/dashboard'; // Defina um HOME para o admin

    public function boot(): void
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });

        $this->routes(function () {
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/api.php'));

            Route::middleware('web')
                ->group(base_path('routes/web.php'));

            // NOVO: Rotas para o painel administrativo
            Route::middleware(['web', 'auth:admin']) // Aplica o guard 'admin'
                ->prefix('admin') // Todas as rotas admin terão o prefixo '/admin'
                ->as('admin.') // Todas as rotas admin terão o prefixo 'admin.' no nome (ex: 'admin.dashboard')
                ->group(base_path('routes/admin.php'));
        });
    }
}