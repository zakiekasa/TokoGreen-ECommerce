import React from 'react';
import { Link } from '@inertiajs/react';
import Layout from '../Components/Layout';

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
}

interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  product: Product;
}

interface Order {
  id: number;
  order_number: string;
  total_amount: number;
  status: string;
  payment_method: string;
  shipping_address: string;
  created_at: string;
  items: OrderItem[];
}

interface OrdersProps {
  orders: Order[];
}

export default function Orders({ orders }: OrdersProps) {
  
  const formatDate = (dateStr: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateStr).toLocaleDateString('id-ID', options);
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(num);
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <span className="badge bg-success-subtle text-success border border-success-subtle py-1.5 px-3 rounded-pill small">Selesai</span>;
      case 'pending':
        return <span className="badge bg-warning-subtle text-warning border border-warning-subtle py-1.5 px-3 rounded-pill small">Menunggu Pembayaran</span>;
      default:
        return <span className="badge bg-secondary-subtle text-secondary border border-secondary-subtle py-1.5 px-3 rounded-pill small">{status}</span>;
    }
  };

  return (
    <Layout>
      <div className="container my-5">
        <h3 className="fw-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>Riwayat Transaksi</h3>

        {orders.length > 0 ? (
          <div className="d-flex flex-column gap-4">
            {orders.map((order) => (
              <div key={order.id} className="card border-light shadow-sm overflow-hidden" style={{ borderRadius: '16px' }}>
                
                {/* Order Header / Meta */}
                <div className="card-header bg-light border-0 py-3 px-4 d-flex flex-wrap justify-content-between align-items-center gap-3">
                  <div className="d-flex flex-wrap align-items-center gap-3">
                    <span className="small text-muted"><i className="bi bi-calendar3 me-1"></i> {formatDate(order.created_at)}</span>
                    <span className="vr d-none d-md-block" style={{ height: '16px' }}></span>
                    <span className="fw-bold text-dark small">{order.order_number}</span>
                  </div>
                  <div>
                    {getStatusBadge(order.status)}
                  </div>
                </div>

                {/* Order Body / Products List */}
                <div className="card-body p-4">
                  <div className="row g-4">
                    
                    {/* Products details */}
                    <div className="col-md-7 border-end-md">
                      <div className="d-flex flex-column gap-3">
                        {order.items.map((item) => (
                          <div key={item.id} className="d-flex align-items-center gap-3">
                            <img
                              src={item.product.image_url}
                              alt={item.product.name}
                              className="rounded-2 object-fit-cover bg-light border"
                              style={{ width: '60px', height: '60px' }}
                            />
                            <div className="flex-grow-1">
                              <h6 className="fw-semibold m-0 small" style={{ lineClamp: 1 }}>{item.product.name}</h6>
                              <small className="text-muted">{item.quantity} barang x {formatRupiah(item.price)}</small>
                            </div>
                            <div className="fw-bold text-dark small">
                              {formatRupiah(item.price * item.quantity)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping Address and Payment */}
                    <div className="col-md-5 ps-md-4">
                      <h6 className="fw-bold mb-2 small"><i className="bi bi-geo-alt me-1 text-accent"></i> Alamat Pengiriman</h6>
                      <p className="text-muted small mb-3" style={{ whiteSpace: 'pre-line', lineHeight: '1.4' }}>
                        {order.shipping_address}
                      </p>

                      <div className="d-flex justify-content-between align-items-center border-top pt-3">
                        <div>
                          <small className="text-muted d-block">Metode Pembayaran</small>
                          <span className="badge bg-light text-dark border">{order.payment_method}</span>
                        </div>
                        <div className="text-end">
                          <small className="text-muted d-block">Total Pembayaran</small>
                          <span className="fw-bold text-accent fs-5">{formatRupiah(order.total_amount)}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5 my-5 bg-white border rounded-4 shadow-sm">
            <i className="bi bi-journal-x text-muted display-3 mb-3 d-block"></i>
            <h5 className="fw-bold text-dark">Belum Ada Transaksi</h5>
            <p className="text-muted small mb-4" style={{ maxWidth: '400px', margin: '0 auto' }}>
              Anda belum melakukan pemesanan apa pun. Ayo, cari produk favorit Anda dan buat transaksi pertama Anda hari ini!
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
