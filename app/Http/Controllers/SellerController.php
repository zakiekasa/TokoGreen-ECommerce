<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class SellerController extends Controller
{
    public function index(): Response
    {
        // Enforce seller check
        if (!auth()->user() || auth()->user()->role !== 'seller') {
            abort(403, 'Akses ditolak. Anda bukan penjual.');
        }

        $products = Product::where('user_id', auth()->id())->latest()->get();

        return Inertia::render('Seller/Dashboard', [
            'products' => $products,
        ]);
    }

    public function create(): Response
    {
        if (!auth()->user() || auth()->user()->role !== 'seller') {
            abort(403);
        }

        $categories = Category::all();

        return Inertia::render('Seller/ProductForm', [
            'categories' => $categories,
            'isEdit' => false,
            'product' => null,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        if (!auth()->user() || auth()->user()->role !== 'seller') {
            abort(403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'required|string',
            'price' => 'required|numeric|min:100',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|image|max:2048',
        ]);

        $imageUrl = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop';
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $imageUrl = asset('storage/' . $path);
        }

        Product::create([
            'category_id' => $request->category_id,
            'user_id' => auth()->id(),
            'name' => $request->name,
            'slug' => Str::slug($request->name) . '-' . rand(100, 999),
            'description' => $request->description,
            'price' => $request->price,
            'stock' => $request->stock,
            'image_url' => $imageUrl,
            'rating' => 5.0,
            'rating_count' => 0,
            'store_name' => auth()->user()->name,
            'store_location' => 'Indonesia',
        ]);

        return redirect()->route('seller.dashboard')->with('success', 'Produk baru berhasil ditambahkan!');
    }

    public function edit(int $id): Response
    {
        if (!auth()->user() || auth()->user()->role !== 'seller') {
            abort(403);
        }

        $product = Product::where('user_id', auth()->id())->where('id', $id)->firstOrFail();
        $categories = Category::all();

        return Inertia::render('Seller/ProductForm', [
            'categories' => $categories,
            'isEdit' => true,
            'product' => $product,
        ]);
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        if (!auth()->user() || auth()->user()->role !== 'seller') {
            abort(403);
        }

        $product = Product::where('user_id', auth()->id())->where('id', $id)->firstOrFail();

        $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'required|string',
            'price' => 'required|numeric|min:100',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|image|max:2048',
        ]);

        $imageUrl = $product->image_url;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $imageUrl = asset('storage/' . $path);
        }

        $product->update([
            'category_id' => $request->category_id,
            'name' => $request->name,
            'slug' => Str::slug($request->name) . '-' . rand(100, 999),
            'description' => $request->description,
            'price' => $request->price,
            'stock' => $request->stock,
            'image_url' => $imageUrl,
        ]);

        return redirect()->route('seller.dashboard')->with('success', 'Detail produk berhasil diperbarui!');
    }

    public function destroy(int $id): RedirectResponse
    {
        if (!auth()->user() || auth()->user()->role !== 'seller') {
            abort(403);
        }

        $product = Product::where('user_id', auth()->id())->where('id', $id)->firstOrFail();
        $product->delete();

        return redirect()->route('seller.dashboard')->with('success', 'Produk berhasil dihapus dari toko Anda.');
    }
}
