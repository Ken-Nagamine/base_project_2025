<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class IndexController extends Controller
{

    public function create(): Response
    {
        return Inertia::render('index'); // Renderiza o componente React de login do admin
    }
}


