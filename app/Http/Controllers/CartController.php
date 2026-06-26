<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class CartController extends Controller
{
    private function getCartQuery()
    {
        if (auth()->check()) {
            return CartItem::where('user_id', auth()->id());
        }
        
        $sessionId = session()->getId();
        return CartItem::where('session_id', $sessionId);
    }

    public function index(): Response
    {
        $cartItems = $this->getCartQuery()->with('product')->get();
        
        return Inertia::render('Cart', [
            'cartItems' => $cartItems,
            'auth' => [
                'user' => auth()->user()
            ]
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $productId = $request->product_id;
        $quantity = $request->quantity;

        // Check if item exists in cart
        $cartItemQuery = $this->getCartQuery()->where('product_id', $productId);
        $cartItem = $cartItemQuery->first();

        if ($cartItem) {
            $cartItem->quantity += $quantity;
            $cartItem->save();
        } else {
            $data = [
                'product_id' => $productId,
                'quantity' => $quantity,
            ];
            
            if (auth()->check()) {
                $data['user_id'] = auth()->id();
            } else {
                $data['session_id'] = session()->getId();
            }

            CartItem::create($data);
        }

        return redirect()->back()->with('success', 'Produk berhasil ditambahkan ke keranjang!');
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = $this->getCartQuery()->where('id', $id)->firstOrFail();
        $cartItem->quantity = $request->quantity;
        $cartItem->save();

        return redirect()->back();
    }

    public function destroy(int $id): RedirectResponse
    {
        $cartItem = $this->getCartQuery()->where('id', $id)->firstOrFail();
        $cartItem->delete();

        return redirect()->back()->with('success', 'Produk dihapus dari keranjang.');
    }
}
