import React from 'react';
import { Link, router } from '@inertiajs/react';
import Layout from '../../Components/Layout';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  image_url: string;
  rating: number;
  rating_count: number;
}

interface DashboardProps {
  products: Product[];
}

export default function Dashboard({ products }: DashboardProps) {

  const handleDelete = (productId: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini dari toko Anda?')) {
      router.delete(`/seller/product/${productId}`);
    }
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(num);
  };

  // Simple statistics
  const totalItems = products.length;
  const outOfStock = products.filter(p => p.stock === 0).length;
  const totalStock = products.reduce((acc, p) => acc + p.stock, 0);

  return (
    <Layout>
      <div className="container my-5">
        {/* Header Section */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
          <div>
            <h3 className="fw-bold m-0" style={{ fontFamily: 'Outfit, sans-serif' }}>Dashboard Toko Saya</h3>
            <p className="text-muted small m-0 mt-1">Kelola dan pantau seluruh katalog produk jualan Anda</p>
          </div>
          <Link href="/seller/product/create" className="btn btn-accent d-flex align-items-center gap-2" style={{ borderRadius: '8px' }}>
            <i className="bi bi-plus-circle"></i> Tambah Produk Baru
          </Link>
        </div>

        {/* Statistics Cards */}
        <div className="row g-3 mb-5">
          <div className="col-md-4">
            <div className="card border-light shadow-sm p-3 h-100" style={{ borderRadius: '12px' }}>
              <div className="d-flex align-items-center gap-3">
                <i className="bi bi-box-seam text-accent fs-2 bg-accent-light p-3 rounded-3"></i>
                <div>
                  <h6 className="text-muted small m-0">Total Jenis Produk</h6>
                  <h3 className="fw-extrabold m-0 text-dark">{totalItems}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-light shadow-sm p-3 h-100" style={{ borderRadius: '12px' }}>
              <div className="d-flex align-items-center gap-3">
                <i className="bi bi-archive text-primary fs-2 bg-primary-subtle p-3 rounded-3"></i>
                <div>
                  <h6 className="text-muted small m-0">Total Stok Barang</h6>
                  <h3 className="fw-extrabold m-0 text-dark">{totalStock} <span className="fs-6 fw-normal text-muted">pcs</span></h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-light shadow-sm p-3 h-100" style={{ borderRadius: '12px' }}>
              <div className="d-flex align-items-center gap-3">
                <i className="bi bi-exclamation-octagon text-danger fs-2 bg-danger-subtle p-3 rounded-3"></i>
                <div>
                  <h6 className="text-muted small m-0">Stok Habis</h6>
                  <h3 className="fw-extrabold m-0 text-danger">{outOfStock} <span className="fs-6 fw-normal text-muted">produk</span></h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Table Card */}
        <div className="card border-light shadow-sm overflow-hidden" style={{ borderRadius: '16px' }}>
          <div className="card-header bg-light border-0 py-3 px-4">
            <h5 className="fw-bold m-0 text-dark small text-uppercase" style={{ letterSpacing: '1px' }}>Daftar Barang Jualan</h5>
          </div>
          
          <div className="table-responsive">
            {products.length > 0 ? (
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light text-muted small">
                  <tr>
                    <th className="px-4 py-3" style={{ width: '80px' }}>Produk</th>
                    <th className="py-3">Nama Produk</th>
                    <th className="py-3 text-end" style={{ width: '180px' }}>Harga</th>
                    <th className="py-3 text-center" style={{ width: '120px' }}>Stok</th>
                    <th className="py-3 text-center" style={{ width: '120px' }}>Rating</th>
                    <th className="px-4 py-3 text-center" style={{ width: '180px' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((prod) => (
                    <tr key={prod.id}>
                      <td className="px-4">
                        <img
                          src={prod.image_url}
                          alt={prod.name}
                          className="rounded border bg-light object-fit-cover"
                          style={{ width: '50px', height: '50px' }}
                        />
                      </td>
                      <td>
                        <span className="fw-semibold text-dark text-truncate d-block" style={{ maxWidth: '280px' }}>
                          {prod.name}
                        </span>
                      </td>
                      <td className="text-end fw-bold text-dark">
                        {formatRupiah(prod.price)}
                      </td>
                      <td className="text-center">
                        {prod.stock === 0 ? (
                          <span className="badge bg-danger">Habis</span>
                        ) : (
                          <span className="fw-bold">{prod.stock}</span>
                        )}
                      </td>
                      <td className="text-center">
                        <span className="small text-muted d-flex align-items-center justify-content-center gap-1">
                          <i className="bi bi-star-fill text-warning" style={{ fontSize: '12px' }}></i>
                          <strong>{prod.rating}</strong>
                          <span style={{ fontSize: '10px' }}>({prod.rating_count})</span>
                        </span>
                      </td>
                      <td className="px-4 text-center">
                        <div className="d-inline-flex gap-2">
                          <Link href={`/seller/product/${prod.id}/edit`} className="btn btn-sm btn-outline-dark d-flex align-items-center gap-1 py-1.5" style={{ borderRadius: '6px' }}>
                            <i className="bi bi-pencil-square"></i> Edit
                          </Link>
                          <button onClick={() => handleDelete(prod.id)} className="btn btn-sm btn-light border text-danger d-flex align-items-center gap-1 py-1.5" style={{ borderRadius: '6px' }}>
                            <i className="bi bi-trash"></i> Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-5 my-4">
                <i className="bi bi-bag-plus text-muted display-4 mb-3 d-block"></i>
                <h5 className="fw-bold">Belum Ada Produk</h5>
                <p className="text-muted small mb-3">Toko Anda belum memiliki produk jualan. Mulai tambahkan barang dagangan Anda sekarang!</p>
                <Link href="/seller/product/create" className="btn btn-accent px-4" style={{ borderRadius: '8px' }}>
                  Tambah Produk Pertama
                </Link>
              </div>
            )}
          </div>
        </div>

      </div>
    </Layout>
  );
}
