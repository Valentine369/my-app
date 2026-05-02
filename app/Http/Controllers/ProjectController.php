<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = [
            ['id' => 1, 'name' => 'Сайт-візитка', 'status' => 'Завершено'],
            ['id' => 2, 'name' => 'Інтернет-магазин', 'status' => 'В розробці'],
            ['id' => 3, 'name' => 'Мобільний додаток', 'status' => 'Планується'],
        ];

        return Inertia::render('Projects', [
            'projects' => $projects,
            'title' => 'Мій портфоліо'
        ]);
    }
}