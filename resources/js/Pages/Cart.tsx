import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import Layout from '../Components/Layout';

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  image_url: string;
  store_name: string;
}

interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  product: Product;
}

interface CartProps {
  cartItems: CartItem[];
  auth: {
    user: {
      name: string;
      email: string;
    } | null;
  };
}

export default function Cart({ cartItems, auth }: CartProps) {
  const [name, setName] = useState(auth.user ? auth.user.name : '');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [checkoutErrors, setCheckoutErrors] = useState<Record<string, string>>({});

  const handleQtyChange = (itemId: number, currentQty: number, change: number) => {
    const newQty = currentQty + change;
    if (newQty < 1) return;

    router.put(`/cart/${itemId}`, {
      quantity: newQty
    }, {
      preserveScroll: true
    });
  };

  const handleRemove = (itemId: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini dari keranjang?')) {
      router.delete(`/cart/${itemId}`, {
        preserveScroll: true
      });
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutErrors({});

    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = 'Nama Penerima wajib diisi.';
    if (!address.trim() || address.trim().length < 10) errors.address = 'Alamat pengiriman wajib diisi lengkap (min. 10 karakter).';

    if (Object.keys(errors).length > 0) {
      setCheckoutErrors(errors);
      return;
    }

    router.post('/checkout', {
      payment_method: paymentMethod,
      shipping_address: address,
      name: name
    });
  };

  const totalPrice = cartItems.sum ? 0 : cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(num);
  };

  return (
    <Layout>
      <div className="container my-5">
        <h3 className="fw-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>Keranjang Belanja</h3>

        {cartItems.length > 0 ? (
          <div className="row g-4">
            
            {/* Left: Cart Items List */}
            <div className="col-lg-8">
              <div className="card border-light shadow-sm p-4" style={{ borderRadius: '16px' }}>
                <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                  <span className="fw-bold">Barang Belanjaan ({cartItems.length})</span>
                  <Link href="/" className="text-accent small text-decoration-none fw-semibold">
                    + Tambah Produk Lain
                  </Link>
                </div>

                {cartItems.map((item) => (
                  <div key={item.id} className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 py-3 border-bottom">
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="rounded-3 object-fit-cover bg-light"
                        style={{ width: '80px', height: '80px' }}
                      />
                      <div>
                        <Link href={`/product/${item.product.slug}`} className="text-decoration-none text-dark fw-semibold small d-block mb-1">
                          {item.product.name}
                        </Link>
                        <small className="text-muted d-block mb-1">Toko: {item.product.store_name}</small>
                        <span className="fw-bold text-dark">{formatRupiah(item.product.price)}</span>
                      </div>
                    </div>

                    <div className="d-flex align-items-center justify-content-between justify-content-md-end gap-4 mt-2 mt-md-0">
                      {/* Quantity Selector */}
                      <div className="d-flex align-items-center gap-2 border rounded-3 p-1">
                        <button
                          onClick={() => handleQtyChange(item.id, item.quantity, -1)}
                          className="btn btn-sm btn-light border-0 py-1 px-2"
                          disabled={item.quantity <= 1}
                        >
                          <i className="bi bi-minus-lg" style={{ fontSize: '11px' }}></i>
                        </button>
                        <span className="fw-bold px-1" style={{ minWidth: '24px', textAlign: 'center', fontSize: '13px' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQtyChange(item.id, item.quantity, 1)}
                          className="btn btn-sm btn-light border-0 py-1 px-2"
                        >
                          <i className="bi bi-plus-lg" style={{ fontSize: '11px' }}></i>
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="btn btn-light border-0 text-danger rounded-circle p-2 d-flex align-items-center justify-content-center"
                        style={{ width: '36px', height: '36px' }}
                        title="Hapus Barang"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Order Checkout Form & Summary */}
            <div className="col-lg-4">
              <div className="card border-light shadow-sm p-4 mb-4" style={{ borderRadius: '16px' }}>
                <h5 className="fw-bold mb-3 border-bottom pb-2">Ringkasan Belanja</h5>
                
                <div className="d-flex justify-content-between mb-2 small text-muted">
                  <span>Total Harga ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} barang)</span>
                  <span>{formatRupiah(totalPrice)}</span>
                </div>
                <div className="d-flex justify-content-between mb-3 small text-muted">
                  <span>Biaya Pengiriman</span>
                  <span className="text-success fw-semibold">Gratis Ongkir</span>
                </div>

                <div className="d-flex justify-content-between align-items-center border-top pt-3 mb-4">
                  <span className="fw-bold">Total Belanja</span>
                  <span className="fw-bold text-accent fs-4">{formatRupiah(totalPrice)}</span>
                </div>

                {/* Simulated Checkout Form */}
                <form onSubmit={handleCheckoutSubmit}>
                  <h6 className="fw-bold mb-3"><i className="bi bi-truck me-2 text-accent"></i>Informasi Pengiriman</h6>
                  
                  <div className="mb-3">
                    <label className="form-label small text-muted mb-1">Nama Penerima</label>
                    <input
                      type="text"
                      className={`form-control ${checkoutErrors.name ? 'is-invalid' : ''}`}
                      placeholder="Masukkan nama penerima"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{ borderRadius: '8px', fontSize: '14px' }}
                    />
                    {checkoutErrors.name && <div className="invalid-feedback small">{checkoutErrors.name}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label small text-muted mb-1">Alamat Lengkap Pengiriman</label>
                    <textarea
                      rows={3}
                      className={`form-control ${checkoutErrors.address ? 'is-invalid' : ''}`}
                      placeholder="Tulis alamat jalan, nomor rumah, RT/RW, kecamatan, dan kota..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      style={{ borderRadius: '8px', fontSize: '14px' }}
                    />
                    {checkoutErrors.address && <div className="invalid-feedback small">{checkoutErrors.address}</div>}
                  </div>

                  <div className="mb-4">
                    <label className="form-label small text-muted mb-1">Metode Pembayaran</label>
                    <select
                      className="form-select"
                      value={paymentMethod}
                      onChange={(e) => setAddress && setPaymentMethod(e.target.value)}
                      style={{ borderRadius: '8px', fontSize: '14px' }}
                    >
                      <option value="COD">COD (Bayar di Tempat)</option>
                      <option value="GOPAY">Gopay / E-Wallet</option>
                      <option value="TRANSFER">Transfer Bank Virtual Account</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-accent w-100 py-2.5 fw-bold"
                    style={{ borderRadius: '8px', fontSize: '15px' }}
                  >
                    Beli &amp; Buat Pesanan
                  </button>
                </form>
              </div>
            </div>

          </div>
        ) : (
          <div className="text-center py-5 my-5 bg-white border rounded-4 shadow-sm">
            <i className="bi bi-cart-x text-muted display-3 mb-3 d-block"></i>
            <h5 className="fw-bold text-dark">Keranjang Belanja Kosong</h5>
            <p className="text-muted small mb-4" style={{ maxWidth: '400px', margin: '0 auto' }}>
              Wah, keranjang belanjaan Anda masih kosong. Cari produk menarik lainnya dan mulailah berbelanja sekarang!
            </p>
            <Link href="/" className="btn btn-accent px-4 py-2" style={{ borderRadius: '8px' }}>
              Mulai Berbelanja
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
}
