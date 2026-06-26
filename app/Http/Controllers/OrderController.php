<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    private function getCartItems()
    {
        if (auth()->check()) {
            return CartItem::where('user_id', auth()->id())->with('product')->get();
        }
        $sessionId = session()->getId();
        return CartItem::where('session_id', $sessionId)->with('product')->get();
    }

    private function clearCart()
    {
        if (auth()->check()) {
            CartItem::where('user_id', auth()->id())->delete();
        } else {
            CartItem::where('session_id', session()->getId())->delete();
        }
    }

    public function index(): Response
    {
        $ordersQuery = Order::query()->with('items.product');
        
        if (auth()->check()) {
            $ordersQuery->where('user_id', auth()->id());
        } else {
            // For demo purposes, if not logged in, we can show order history from this session
            // We can save order IDs in session, or just return orders created in this session
            $ordersQuery->where('shipping_address', 'like', '%Session ID: ' . session()->getId() . '%');
        }

        $orders = $ordersQuery->latest()->get();

        return Inertia::render('Orders', [
            'orders' => $orders,
            'auth' => [
                'user' => auth()->user()
            ]
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'payment_method' => 'required|string',
            'shipping_address' => 'required|string|min:10',
            'name' => 'required|string|min:3',
        ]);

        $cartItems = $this->getCartItems();

        if ($cartItems->isEmpty()) {
            return redirect()->back()->withErrors(['cart' => 'Keranjang belanja Anda kosong.']);
        }

        $totalAmount = $cartItems->sum(function ($item) {
            return $item->product->price * $item->quantity;
        });

        DB::beginTransaction();
        try {
            // Include Session ID in the address for guest tracking if not authenticated
            $address = $request->shipping_address . "\nNama Penerima: " . $request->name;
            if (!auth()->check()) {
                $address .= "\n[Session ID: " . session()->getId() . "]";
            }

            $order = Order::create([
                'user_id' => auth()->id(), // null if guest
                'order_number' => 'TRX-' . strtoupper(Str::random(10)),
                'total_amount' => $totalAmount,
                'status' => 'completed', // auto complete in mock/demo
                'payment_method' => $request->payment_method,
                'shipping_address' => $address,
            ]);

            foreach ($cartItems as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price' => $item->product->price,
                ]);

                // Reduce stock
                $product = $item->product;
                $product->stock = max(0, $product->stock - $item->quantity);
                $product->save();
            }

            $this->clearCart();

            DB::commit();

            return redirect()->route('orders.index')->with('success', 'Pesanan Anda berhasil diproses!');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors(['error' => 'Gagal memproses pesanan: ' . $e->getMessage()]);
        }
    }
}
