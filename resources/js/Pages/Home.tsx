import React from 'react';
import { Link, router } from '@inertiajs/react';
import Layout from '../Components/Layout';

interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
}

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

interface HomeProps {
  products: Product[];
  categories: Category[];
  filters: {
    search: string | null;
    category: string | null;
  };
}

export default function Home({ products, categories, filters }: HomeProps) {
  
  const handleCategoryClick = (slug: string | null) => {
    router.get('/', { 
      category: slug || undefined,
      search: filters.search || undefined 
    });
  };

  const handleAddToCart = (e: React.MouseEvent, productId: number) => {
    e.preventDefault();
    e.stopPropagation();
    router.post('/cart', {
      product_id: productId,
      quantity: 1
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
      {/* Banner / Hero Carousel (Hero slider) */}
      {!filters.search && !filters.category && (
        <div className="container mt-4">
          <div id="heroCarousel" className="carousel slide shadow-sm" data-bs-ride="carousel" style={{ borderRadius: '16px', overflow: 'hidden' }}>
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
            </div>
            <div className="carousel-inner" style={{ height: '300px' }}>
              <div className="carousel-item active" style={{ height: '100%' }}>
                <div className="d-flex align-items-center justify-content-between p-5 h-100 bg-accent-light" style={{ background: 'linear-gradient(135deg, #ffffff 50%, #e8f5e9 100%)' }}>
                  <div className="ps-md-5">
                    <span className="badge bg-accent text-white mb-2 py-2 px-3 fw-semibold">Spesial Promo Gadget</span>
                    <h2 className="display-6 fw-bold mb-2 text-dark">iPhone 15 Pro Max</h2>
                    <p className="text-muted d-none d-md-block mb-4">Rasakan performa tangguh Titanium dengan cashback hingga Rp 1.500.000!</p>
                    <Link href="/product/iphone-15-pro-max-256gb---titanium-grey" className="btn btn-accent px-4 py-2" style={{ borderRadius: '8px' }}>Cek Sekarang</Link>
                  </div>
                  <img src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=400&auto=format&fit=crop" className="d-none d-lg-block me-md-5 h-75 object-fit-contain" alt="iPhone 15" />
                </div>
              </div>
              <div className="carousel-item" style={{ height: '100%' }}>
                <div className="d-flex align-items-center justify-content-between p-5 h-100" style={{ background: 'linear-gradient(135deg, #ffffff 50%, #e8f5e9 100%)' }}>
                  <div className="ps-md-5">
                    <span className="badge bg-danger text-white mb-2 py-2 px-3 fw-semibold">Flash Sale Rumah Tangga</span>
                    <h2 className="display-6 fw-bold mb-2 text-dark">Air Fryer Digital 4.5L</h2>
                    <p className="text-muted d-none d-md-block mb-4">Goreng sehat tanpa minyak dengan konsumsi daya super hemat watt.</p>
                    <Link href="/product/air-fryer-digital-low-watt-4.5l" className="btn btn-accent px-4 py-2" style={{ borderRadius: '8px' }}>Beli Sekarang</Link>
                  </div>
                  <img src="https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?q=80&w=400&auto=format&fit=crop" className="d-none d-lg-block me-md-5 h-75 object-fit-contain" alt="Air Fryer" />
                </div>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon bg-dark bg-opacity-25 rounded-circle p-3" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon bg-dark bg-opacity-25 rounded-circle p-3" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      )}

      <div className="container my-5">
        <div className="row">
          
          {/* Sidebar / Category Navigation (Left side on Desktop) */}
          <div className="col-lg-3 mb-4">
            <div className="card border-light shadow-sm p-3" style={{ borderRadius: '12px' }}>
              <h5 className="fw-bold mb-3 pb-2 border-bottom">Kategori Pilihan</h5>
              <div className="d-flex flex-column gap-1">
                <button
                  onClick={() => handleCategoryClick(null)}
                  className={`btn text-start py-2 px-3 border-0 d-flex align-items-center gap-2 ${!filters.category ? 'bg-accent text-white' : 'btn-light'}`}
                  style={{ borderRadius: '8px' }}
                >
                  <i className="bi bi-grid-fill"></i>
                  <span>Semua Produk</span>
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.slug)}
                    className={`btn text-start py-2 px-3 border-0 d-flex align-items-center gap-2 ${filters.category === cat.slug ? 'bg-accent text-white' : 'btn-light'}`}
                    style={{ borderRadius: '8px' }}
                  >
                    <i className={`bi ${cat.icon || 'bi-tag-fill'}`}></i>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Listing Section */}
          <div className="col-lg-9">
            
            {/* Header info */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h4 className="fw-bold m-0">
                  {filters.search 
                    ? `Hasil pencarian: "${filters.search}"` 
                    : filters.category 
                      ? categories.find(c => c.slug === filters.category)?.name 
                      : 'Rekomendasi Untukmu'}
                </h4>
                <p className="text-muted small m-0 mt-1">Menampilkan {products.length} produk pilihan terbaik</p>
              </div>
              
              {/* Reset filter buttons */}
              {(filters.search || filters.category) && (
                <button 
                  onClick={() => router.get('/')} 
                  className="btn btn-sm btn-light border"
                  style={{ borderRadius: '8px' }}
                >
                  <i className="bi bi-x-circle me-1"></i> Bersihkan Filter
                </button>
              )}
            </div>

            {/* Products Grid */}
            {products.length > 0 ? (
              <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
                {products.map((prod) => (
                  <div className="col" key={prod.id}>
                    <Link href={`/product/${prod.slug}`} className="text-decoration-none text-dark">
                      <div className="card h-100 product-card shadow-sm">
                        <div className="product-card-img-wrapper">
                          <img src={prod.image_url} className="product-card-img" alt={prod.name} />
                        </div>
                        <div className="card-body d-flex flex-column p-3">
                          <h6 className="card-title card-title-limit fw-semibold mb-2" title={prod.name}>
                            {prod.name}
                          </h6>
                          <div className="text-dark fw-bold fs-5 mb-2">
                            {formatRupiah(prod.price)}
                          </div>
                          
                          {/* Seller & location info (Store details style) */}
                          <div className="d-flex align-items-center gap-1 text-muted small mb-2">
                            <i className="bi bi-check-circle-fill text-accent" style={{ fontSize: '11px' }}></i>
                            <span className="text-truncate fw-medium">{prod.store_name}</span>
                          </div>
                          <div className="text-muted small mb-3">
                            <i className="bi bi-geo-alt me-1"></i>{prod.store_location}
                          </div>

                          {/* Ratings and Add to Cart */}
                          <div className="mt-auto pt-2 border-top d-flex align-items-center justify-content-between">
                            <span className="small text-muted d-flex align-items-center gap-1">
                              <i className="bi bi-star-fill text-warning"></i>
                              <strong>{prod.rating}</strong>
                              <span>({prod.rating_count})</span>
                            </span>
                            <button
                              onClick={(e) => handleAddToCart(e, prod.id)}
                              className="btn btn-sm btn-accent rounded-circle p-2 d-flex align-items-center justify-content-center"
                              style={{ width: '32px', height: '32px' }}
                              title="Tambah ke Keranjang"
                            >
                              <i className="bi bi-plus-lg"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5 my-5 bg-white border rounded-3 shadow-sm">
                <i className="bi bi-search text-muted display-4 mb-3 d-block"></i>
                <h5 className="fw-bold">Produk Tidak Ditemukan</h5>
                <p className="text-muted small">Coba cari kata kunci lain atau pilih kategori yang berbeda.</p>
                <button onClick={() => router.get('/')} className="btn btn-accent mt-2" style={{ borderRadius: '8px' }}>
                  Kembali ke Beranda
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </Layout>
  );
}
