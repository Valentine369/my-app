<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('Products', [
            'products' => Product::latest()->get(),
            'title' => 'Список товарів',
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate(
            [
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'price' => 'required|numeric|min:0',
            ],
            [
                'name.required' => 'Поле "Назва товару" є обов’язковим.',
                'name.max' => 'Назва товару не повинна перевищувати 255 символів.',
                'price.required' => 'Поле "Ціна" є обов’язковим.',
                'price.numeric' => 'Ціна повинна бути числом.',
                'price.min' => 'Ціна не може бути меншою за 0.',
            ]
        );

        Product::create($validated);

        return redirect()->back();
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->back();
    }
}