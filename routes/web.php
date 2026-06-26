<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SellerController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

// Catalog & Product Detail
Route::get('/', [ProductController::class, 'index'])->name('home');
Route::get('/product/{slug}', [ProductController::class, 'show'])->name('products.show');

// Shopping Cart
Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
Route::put('/cart/{id}', [CartController::class, 'update'])->name('cart.update');
Route::delete('/cart/{id}', [CartController::class, 'destroy'])->name('cart.destroy');

// Transactions / Orders
Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
Route::post('/checkout', [OrderController::class, 'store'])->name('orders.store');

// Authenticated Routes (Multi-Role Auth)
Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
Route::post('/register', [AuthController::class, 'register']);
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);

// Seller Routes
Route::get('/seller/dashboard', [SellerController::class, 'index'])->name('seller.dashboard');
Route::get('/seller/product/create', [SellerController::class, 'create'])->name('seller.product.create');
Route::post('/seller/product', [SellerController::class, 'store'])->name('seller.product.store');
Route::get('/seller/product/{id}/edit', [SellerController::class, 'edit'])->name('seller.product.edit');
Route::put('/seller/product/{id}', [SellerController::class, 'update'])->name('seller.product.update');
Route::delete('/seller/product/{id}', [SellerController::class, 'destroy'])->name('seller.product.destroy');



Route::post('/auth/logout', function () {
    Auth::logout();
    session()->invalidate();
    session()->regenerateToken();
    return redirect()->route('home')->with('success', 'Berhasil keluar!');
})->name('logout');
