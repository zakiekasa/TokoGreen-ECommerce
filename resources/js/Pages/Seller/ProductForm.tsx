import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import Layout from '../../Components/Layout';

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  category_id: number;
  description: string;
  price: number;
  stock: number;
  image_url: string;
}

interface ProductFormProps {
  categories: Category[];
  isEdit: boolean;
  product: Product | null;
}

export default function ProductForm({ categories, isEdit, product }: ProductFormProps) {
  const [previewUrl, setPreviewUrl] = React.useState(product?.image_url || '');

  const { data, setData, post, processing, errors } = useForm<{
    name: string;
    category_id: number | string;
    description: string;
    price: number | string;
    stock: number | string;
    image: File | null;
  }>({
    name: product?.name || '',
    category_id: product?.category_id || (categories[0]?.id || ''),
    description: product?.description || '',
    price: product?.price || '',
    stock: product?.stock || '',
    image: null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit && product) {
      // Force POST with _method = PUT to allow multipart file uploads in Laravel
      router.post(`/seller/product/${product.id}`, {
        ...data,
        _method: 'PUT'
      });
    } else {
      post('/seller/product');
    }
  };

  return (
    <Layout>
      <div className="container my-5">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb small">
            <li className="breadcrumb-item"><Link href="/seller/dashboard" className="text-decoration-none text-muted">Dashboard Toko</Link></li>
            <li className="breadcrumb-item active" aria-current="page">{isEdit ? 'Edit Produk' : 'Tambah Produk Baru'}</li>
          </ol>
        </nav>

        <div className="row g-4">
          {/* Form Column */}
          <div className="col-lg-8">
            <div className="card border-light shadow-sm p-4" style={{ borderRadius: '16px' }}>
              <h4 className="fw-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {isEdit ? 'Edit Informasi Produk' : 'Tambah Produk Jualan Baru'}
              </h4>

              <form onSubmit={handleSubmit}>
                {/* Product Name */}
                <div className="mb-3">
                  <label className="form-label small text-muted mb-1">Nama Produk</label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    placeholder="Contoh: Keyboard Mechanical RGB TKL"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    style={{ borderRadius: '8px', fontSize: '14px' }}
                  />
                  {errors.name && <div className="invalid-feedback small">{errors.name}</div>}
                </div>

                <div className="row g-3 mb-3">
                  {/* Category */}
                  <div className="col-md-6">
                    <label className="form-label small text-muted mb-1">Kategori Produk</label>
                    <select
                      className={`form-select ${errors.category_id ? 'is-invalid' : ''}`}
                      value={data.category_id}
                      onChange={(e) => setData('category_id', e.target.value)}
                      style={{ borderRadius: '8px', fontSize: '14px' }}
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                    {errors.category_id && <div className="invalid-feedback small">{errors.category_id}</div>}
                  </div>

                  {/* Stock */}
                  <div className="col-md-6">
                    <label className="form-label small text-muted mb-1">Stok Awal</label>
                    <input
                      type="number"
                      min="0"
                      className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
                      placeholder="Contoh: 50"
                      value={data.stock}
                      onChange={(e) => setData('stock', e.target.value)}
                      style={{ borderRadius: '8px', fontSize: '14px' }}
                    />
                    {errors.stock && <div className="invalid-feedback small">{errors.stock}</div>}
                  </div>
                </div>

                <div className="row g-3 mb-3">
                  {/* Price */}
                  <div className="col-md-6">
                    <label className="form-label small text-muted mb-1">Harga (Rupiah)</label>
                    <div className="input-group">
                      <span className="input-group-text border-end-0 bg-light" style={{ borderRadius: '8px 0 0 8px', fontSize: '14px' }}>Rp</span>
                      <input
                        type="number"
                        min="100"
                        className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                        placeholder="Contoh: 150000"
                        value={data.price}
                        onChange={(e) => setData('price', e.target.value)}
                        style={{ borderRadius: '0 8px 8px 0', fontSize: '14px' }}
                      />
                      {errors.price && <div className="invalid-feedback small">{errors.price}</div>}
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div className="col-md-6">
                    <label className="form-label small text-muted mb-1">Unggah Gambar Produk</label>
                    <input
                      type="file"
                      accept="image/*"
                      className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                      onChange={(e) => {
                        const file = e.target.files ? e.target.files[0] : null;
                        setData('image', file);
                        if (file) {
                          setPreviewUrl(URL.createObjectURL(file));
                        }
                      }}
                      style={{ borderRadius: '8px', fontSize: '14px' }}
                    />
                    {errors.image && <div className="invalid-feedback small">{errors.image}</div>}
                  </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label className="form-label small text-muted mb-1">Deskripsi Produk Lengkap</label>
                  <textarea
                    rows={6}
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                    placeholder="Jelaskan spesifikasi detail barang, kelebihan, garansi, dll..."
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    style={{ borderRadius: '8px', fontSize: '14px' }}
                  />
                  {errors.description && <div className="invalid-feedback small">{errors.description}</div>}
                </div>

                {/* Action Buttons */}
                <div className="d-flex gap-2 justify-content-end">
                  <Link href="/seller/dashboard" className="btn btn-light border px-4" style={{ borderRadius: '8px' }}>
                    Batal
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-accent px-4 py-2"
                    disabled={processing}
                    style={{ borderRadius: '8px' }}
                  >
                    {processing ? 'Menyimpan...' : (isEdit ? 'Simpan Perubahan' : 'Tambahkan Produk')}
                  </button>
                </div>

              </form>
            </div>
          </div>

          {/* Real-time Preview Column */}
          <div className="col-lg-4">
            <div className="card border-light shadow-sm p-4 text-center" style={{ borderRadius: '16px', position: 'sticky', top: '100px' }}>
              <h6 className="fw-bold mb-3 border-bottom pb-2 text-start">Pratinjau Kartu Produk</h6>
              
              <div className="card h-100 text-start shadow-sm border border-light-subtle" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                <div className="bg-light d-flex align-items-center justify-content-center aspect-ratio-1" style={{ height: '220px', overflow: 'hidden' }}>
                  {previewUrl ? (
                    <img src={previewUrl} alt="Pratinjau Gambar" className="w-100 h-100 object-fit-cover" />
                  ) : (
                    <i className="bi bi-image text-muted display-6"></i>
                  )}
                </div>
                <div className="card-body p-3">
                  <h6 className="card-title fw-bold text-dark text-truncate mb-1">{data.name || 'Nama Produk Baru'}</h6>
                  <div className="text-accent fw-extrabold fs-6 mb-2">
                    {data.price ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(data.price)) : 'Rp 0'}
                  </div>
                  <div className="d-flex align-items-center gap-1 text-muted small mb-2">
                    <i className="bi bi-check-circle-fill text-accent" style={{ fontSize: '10px' }}></i>
                    <span className="text-truncate">{product?.store_name || 'Toko Saya'}</span>
                  </div>
                  <div className="text-muted small">
                    <i className="bi bi-geo-alt me-1"></i>Indonesia
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}
