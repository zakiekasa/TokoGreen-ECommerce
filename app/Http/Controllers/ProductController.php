<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->input('search');
        $categorySlug = $request->input('category');

        $productsQuery = Product::query()->with('category');

        if ($search) {
            $productsQuery->where('name', 'like', '%' . $search . '%')
                ->orWhere('description', 'like', '%' . $search . '%');
        }

        if ($categorySlug) {
            $productsQuery->whereHas('category', function ($q) use ($categorySlug) {
                $q->where('slug', $categorySlug);
            });
        }

        $products = $productsQuery->latest()->get();
        $categories = Category::all();

        return Inertia::render('Home', [
            'products' => $products,
            'categories' => $categories,
            'filters' => [
                'search' => $search,
                'category' => $categorySlug,
            ],
            // Check if user is logged in (using simple Auth for demo)
            'auth' => [
                'user' => auth()->user()
            ]
        ]);
    }

    public function show(string $slug): Response
    {
        $product = Product::with('category')->where('slug', $slug)->firstOrFail();
        
        // Fetch recommendations from same category
        $recommendations = Product::where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->limit(4)
            ->get();

        return Inertia::render('ProductDetail', [
            'product' => $product,
            'recommendations' => $recommendations,
            'auth' => [
                'user' => auth()->user()
            ]
        ]);
    }
}
