import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import Layout from '../Components/Layout';

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  rating: number;
  rating_count: number;
  store_name: string;
  store_location: string;
}

interface ProductDetailProps {
  product: Product;
  recommendations: Product[];
}

export default function ProductDetail({ product, recommendations }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);

  const incrementQty = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    router.post('/cart', {
      product_id: product.id,
      quantity: quantity
    });
  };

  const handleBuyNow = () => {
    // Add to cart first, then redirect to cart page
    router.post('/cart', {
      product_id: product.id,
      quantity: quantity
    }, {
      onSuccess: () => {
        router.visit('/cart');
      }
    });
  };

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
        
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb small">
            <li className="breadcrumb-item"><Link href="/" className="text-decoration-none text-muted">Beranda</Link></li>
            <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
          </ol>
        </nav>

        {/* Product Layout Grid */}
        <div className="row g-4 mb-5">
          {/* Column 1: Image */}
          <div className="col-lg-4">
            <div className="card border-light shadow-sm p-2" style={{ borderRadius: '16px' }}>
              <div className="rounded-3 overflow-hidden bg-light aspect-ratio-1">
                <img src={product.image_url} className="w-100 h-100 object-fit-cover" alt={product.name} />
              </div>
            </div>
          </div>

          {/* Column 2: Info */}
          <div className="col-lg-5">
            <div>
              <h2 className="fw-bold mb-2 text-dark" style={{ fontFamily: 'Outfit, sans-serif' }}>{product.name}</h2>
              
              {/* Rating & Sold count */}
              <div className="d-flex align-items-center gap-3 mb-3 small">
                <span className="d-flex align-items-center gap-1">
                  <i className="bi bi-star-fill text-warning"></i>
                  <strong>{product.rating}</strong>
                  <span className="text-muted">({product.rating_count} rating)</span>
                </span>
                <span className="text-muted">|</span>
                <span className="text-muted">Terjual <strong className="text-dark">{(product.rating_count * 1.5).toFixed(0)}</strong> produk</span>
              </div>

              {/* Price */}
              <h1 className="fw-extrabold text-dark mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {formatRupiah(product.price)}
              </h1>

              {/* Store Details (Store badge style) */}
              <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3 mb-4">
                <i className="bi bi-shop fs-3 text-accent bg-white p-2 rounded-circle shadow-sm"></i>
                <div>
                  <h6 className="fw-bold m-0">{product.store_name}</h6>
                  <small className="text-muted"><i className="bi bi-geo-alt me-1"></i>{product.store_location}</small>
                </div>
                <span className="badge bg-accent-light text-accent ms-auto py-2 px-3 fw-semibold">Pelayanan Terbaik</span>
              </div>

              {/* Description */}
              <div className="mb-4">
                <h6 className="fw-bold border-bottom pb-2 mb-2">Detail & Deskripsi Produk</h6>
                <p className="text-muted small" style={{ lineHeight: '1.7', whiteSpace: 'pre-line' }}>
                  {product.description}
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: Purchase Card */}
          <div className="col-lg-3">
            <div className="card border-light shadow-sm p-4" style={{ borderRadius: '16px', position: 'sticky', top: '100px' }}>
              <h6 className="fw-bold mb-3">Atur Jumlah & Catatan</h6>
              
              {/* Quantity */}
              <div className="d-flex align-items-center justify-content-between mb-3">
                <span className="text-muted small">Jumlah</span>
                <div className="d-flex align-items-center gap-2 border rounded-3 p-1">
                  <button onClick={decrementQty} className="btn btn-sm btn-light border-0 py-1 px-2" disabled={quantity <= 1}>
                    <i className="bi bi-minus-lg" style={{ fontSize: '12px' }}></i>
                  </button>
                  <span className="fw-bold px-2" style={{ minWidth: '30px', textAlign: 'center' }}>{quantity}</span>
                  <button onClick={incrementQty} className="btn btn-sm btn-light border-0 py-1 px-2" disabled={quantity >= product.stock}>
                    <i className="bi bi-plus-lg" style={{ fontSize: '12px' }}></i>
                  </button>
                </div>
              </div>

              {/* Stock info */}
              <div className="d-flex justify-content-between align-items-center mb-4 small text-muted">
                <span>Stok Produk</span>
                <span className="fw-semibold text-dark">{product.stock} Tersisa</span>
              </div>

              {/* Subtotal */}
              <div className="border-top pt-3 mb-4">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="text-muted small">Subtotal</span>
                  <span className="fw-bold text-accent fs-5">
                    {formatRupiah(product.price * quantity)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-flex flex-column gap-2">
                <button
                  onClick={handleAddToCart}
                  className="btn btn-accent w-100 py-2 d-flex align-items-center justify-content-center gap-2"
                  style={{ borderRadius: '8px' }}
                >
                  <i className="bi bi-cart-plus"></i> Tambah Keranjang
                </button>
                <button
                  onClick={handleBuyNow}
                  className="btn btn-outline-accent w-100 py-2"
                  style={{ borderRadius: '8px' }}
                >
                  Beli Langsung
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations Section */}
        {recommendations.length > 0 && (
          <div className="mt-5 pt-4 border-top">
            <h4 className="fw-bold mb-4">Rekomendasi Serupa</h4>
            <div className="row row-cols-2 row-cols-md-4 g-3">
              {recommendations.map((item) => (
                <div className="col" key={item.id}>
                  <Link href={`/product/${item.slug}`} className="text-decoration-none text-dark">
                    <div className="card h-100 product-card shadow-sm">
                      <div className="product-card-img-wrapper">
                        <img src={item.image_url} className="product-card-img" alt={item.name} />
                      </div>
                      <div className="card-body d-flex flex-column p-3">
                        <h6 className="card-title card-title-limit fw-semibold mb-2" title={item.name}>
                          {item.name}
                        </h6>
                        <div className="text-dark fw-bold fs-6 mb-2">
                          {formatRupiah(item.price)}
                        </div>
                        <div className="d-flex align-items-center gap-1 text-muted small mt-auto">
                          <i className="bi bi-geo-alt-fill text-accent" style={{ fontSize: '10px' }}></i>
                          <span className="text-truncate">{item.store_name} ({item.store_location})</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
}
