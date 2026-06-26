<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create a default buyer user
        $user = User::factory()->create([
            'name' => 'Budi Santoso',
            'email' => 'budi@example.com',
            'password' => bcrypt('password'),
            'role' => 'buyer',
        ]);

        // Create a default seller user
        $seller = User::factory()->create([
            'name' => 'Toko Hijau Official',
            'email' => 'seller@example.com',
            'password' => bcrypt('password'),
            'role' => 'seller',
        ]);

        // 2. Create Categories
        $categories = [
            [
                'name' => 'Elektronik',
                'slug' => 'elektronik',
                'icon' => 'bi-laptop',
            ],
            [
                'name' => 'Fashion & Pakaian',
                'slug' => 'fashion-pakaian',
                'icon' => 'bi-handbag',
            ],
            [
                'name' => 'Handphone & Gadget',
                'slug' => 'handphone-gadget',
                'icon' => 'bi-phone',
            ],
            [
                'name' => 'Rumah Tangga',
                'slug' => 'rumah-tangga',
                'icon' => 'bi-house-door',
            ],
            [
                'name' => 'Kecantikan & Kesehatan',
                'slug' => 'kecantikan-kesehatan',
                'icon' => 'bi-heart-pulse',
            ],
        ];

        $categoryModels = [];
        foreach ($categories as $cat) {
            $categoryModels[$cat['slug']] = Category::create($cat);
        }

        // 3. Create Products
        $products = [
            // Handphone & Gadget
            [
                'category_slug' => 'handphone-gadget',
                'name' => 'iPhone 15 Pro Max 256GB - Titanium Grey',
                'description' => 'iPhone 15 Pro Max memiliki desain titanium kelas dirgantara yang kuat dan ringan, dengan tepi membulat baru serta tombol Tindakan yang dapat disesuaikan. Pembaruan kamera yang luar biasa menghadirkan kamera utama 48 MP yang canggih serta lensa Telefoto 5x baru.',
                'price' => 22999000,
                'stock' => 15,
                'image_url' => 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=600&auto=format&fit=crop',
                'rating' => 4.9,
                'rating_count' => 128,
                'store_name' => 'Toko Hijau Official',
                'store_location' => 'Jakarta Pusat',
            ],
            [
                'category_slug' => 'handphone-gadget',
                'name' => 'Samsung Galaxy S24 Ultra 12/512GB - Titanium Black',
                'description' => 'Rasakan pengalaman mobile bertenaga AI tercanggih dengan Samsung Galaxy S24 Ultra. Dilengkapi kamera utama 200 MP, zoom optik 5x & 10x, dan stylus S-Pen bawaan yang legendaris.',
                'price' => 20499000,
                'stock' => 22,
                'image_url' => 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=600&auto=format&fit=crop',
                'rating' => 4.8,
                'rating_count' => 95,
                'store_name' => 'Toko Hijau Official',
                'store_location' => 'Jakarta Barat',
            ],
            [
                'category_slug' => 'handphone-gadget',
                'name' => 'TWS Earbuds Pro Noise Cancelling',
                'description' => 'Nikmati suara berkualitas tinggi tanpa gangguan dengan Active Noise Cancellation yang dinamis. Daya tahan baterai hingga 30 jam dengan case pengisi daya nirkabel.',
                'price' => 899000,
                'stock' => 120,
                'image_url' => 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop',
                'rating' => 4.7,
                'rating_count' => 342,
                'store_name' => 'Toko Hijau Official',
                'store_location' => 'Bandung',
            ],

            // Elektronik
            [
                'category_slug' => 'elektronik',
                'name' => 'Keyboard Mechanical TKL 87-Keys RGB Switch',
                'description' => 'Keyboard mekanikal kompak layout TKL (Tenkeyless) dengan switch merah (red switch) yang senyap dan tactile. Lampu latar RGB yang dapat diprogram sepenuhnya dengan perangkat lunak.',
                'price' => 450000,
                'stock' => 50,
                'image_url' => 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=600&auto=format&fit=crop',
                'rating' => 4.6,
                'rating_count' => 210,
                'store_name' => 'Toko Hijau Official',
                'store_location' => 'Tangerang',
            ],
            [
                'category_slug' => 'elektronik',
                'name' => 'Monitor Gaming IPS 24 Inch 144Hz 1ms',
                'description' => 'Monitor gaming performa tinggi dengan refresh rate 144Hz and response time 1ms. Panel IPS memberikan warna yang akurat dan sudut pandang lebar 178 derajat.',
                'price' => 1850000,
                'stock' => 35,
                'image_url' => 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop',
                'rating' => 4.8,
                'rating_count' => 154,
                'store_name' => 'Toko Hijau Official',
                'store_location' => 'Jakarta Utara',
            ],
            [
                'category_slug' => 'elektronik',
                'name' => 'Mouse Wireless Ergonomis 2.4G Silent Click',
                'description' => 'Mouse nirkabel dengan desain ergonomis yang pas di tangan untuk mencegah kelelahan pergelangan tangan. Dilengkapi klik senyap (silent click) untuk kenyamanan bekerja.',
                'price' => 125000,
                'stock' => 150,
                'image_url' => 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=600&auto=format&fit=crop',
                'rating' => 4.5,
                'rating_count' => 512,
                'store_name' => 'Toko Hijau Official',
                'store_location' => 'Surabaya',
            ],

            // Fashion & Pakaian
            [
                'category_slug' => 'fashion-pakaian',
                'name' => 'Jaket Bomber Klasik Canvas Unisex - Hitam',
                'description' => 'Jaket bomber dengan bahan canvas premium tebal namun tetap adem dipakai. Cocok untuk cuaca santai, riding, maupun hangout sehari-hari. Desain unisex untuk pria dan wanita.',
                'price' => 249000,
                'stock' => 60,
                'image_url' => 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop',
                'rating' => 4.7,
                'rating_count' => 420,
                'store_name' => 'Toko Hijau Official',
                'store_location' => 'Bandung',
            ],
            [
                'category_slug' => 'fashion-pakaian',
                'name' => 'Sepatu Sneakers Klasik Minimalis Putih',
                'description' => 'Sepatu kasual dengan desain minimalis retro yang elegan. Terbuat dari kulit sintetis grade A yang mudah dibersihkan dan sol karet anti-selip.',
                'price' => 389000,
                'stock' => 40,
                'image_url' => 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop',
                'rating' => 4.6,
                'rating_count' => 198,
                'store_name' => 'Toko Hijau Official',
                'store_location' => 'Surabaya',
            ],

            // Rumah Tangga
            [
                'category_slug' => 'rumah-tangga',
                'name' => 'Air Fryer Digital Low Watt 4.5L',
                'description' => 'Goreng makanan favorit Anda tanpa minyak dengan teknologi sirkulasi udara cepat 360 derajat. Panel layar sentuh digital dengan 8 menu prasetel otomatis.',
                'price' => 749000,
                'stock' => 25,
                'image_url' => 'https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?q=80&w=600&auto=format&fit=crop',
                'rating' => 4.8,
                'rating_count' => 88,
                'store_name' => 'Toko Hijau Official',
                'store_location' => 'Jakarta Timur',
            ],
            [
                'category_slug' => 'rumah-tangga',
                'name' => 'Termos Air Panas Stainless Steel 500ml',
                'description' => 'Termos vakum dinding ganda menjaga suhu panas hingga 12 jam dan dingin hingga 24 jam. Terbuat dari Food Grade Stainless Steel 304 berkualitas tinggi.',
                'price' => 115000,
                'stock' => 180,
                'image_url' => 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=600&auto=format&fit=crop',
                'rating' => 4.7,
                'rating_count' => 640,
                'store_name' => 'Toko Hijau Official',
                'store_location' => 'Semarang',
            ],
        ];

        foreach ($products as $prod) {
            Product::create([
                'category_id' => $categoryModels[$prod['category_slug']]->id,
                'user_id' => $seller->id,
                'name' => $prod['name'],
                'slug' => Str::slug($prod['name']),
                'description' => $prod['description'],
                'price' => $prod['price'],
                'stock' => $prod['stock'],
                'image_url' => $prod['image_url'],
                'rating' => $prod['rating'],
                'rating_count' => $prod['rating_count'],
                'store_name' => $prod['store_name'],
                'store_location' => $prod['store_location'],
            ]);
        }
    }
}
