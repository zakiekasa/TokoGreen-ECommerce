import React, { useState, useEffect } from 'react';
import { Link, router, usePage } from '@inertiajs/react';

interface User {
  id: number;
  name: string;
  email: string;
}

interface PageProps {
  auth: {
    user: User | null;
  };
  cartCount: number;
  flash: {
    success: string | null;
    error: string | null;
  };
  [key: string]: any;
}

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { auth, cartCount, flash } = usePage<PageProps>().props;
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'danger'>('success');

  useEffect(() => {
    if (flash.success) {
      setToastMessage(flash.success);
      setToastType('success');
      const timer = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timer);
    } else if (flash.error) {
      setToastMessage(flash.error);
      setToastType('danger');
      const timer = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [flash]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.get('/', { search: searchQuery });
  };

  const handleLogout = () => {
    router.post('/auth/logout');
  };

  // Safe route helper since we don't have ziggy installed by default,
  // we can map simple names to paths, or just write raw URLs.
  // Let's write raw URLs for absolute robustness, or map them simply!
  const getUrl = (name: string, param?: string) => {
    switch (name) {
      case 'home': return '/';
      case 'cart': return '/cart';
      case 'orders': return '/orders';
      case 'product': return `/product/${param}`;
      case 'login': return '/login';
      case 'register': return '/register';
      case 'seller-dashboard': return '/seller/dashboard';
      case 'logout': return '/auth/logout';
      default: return '/';
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-white">
      {/* Main Header / Navbar */}
      <nav className="navbar navbar-expand-lg sticky-top shadow-sm py-3 bg-white">
        <div className="container">
          <Link href={getUrl('home')} className="navbar-brand d-flex align-items-center me-4">
            <i className="bi bi-bag-check-fill text-accent fs-3 me-2"></i>
            <span className="fw-extrabold fs-4 tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Toko<span className="text-accent">Green</span>
            </span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex-grow-1 mx-lg-4 my-2 my-lg-0 d-flex position-relative">
            <div className="input-group">
              <input
                type="text"
                className="form-control border-secondary-subtle py-2 px-3 bg-light"
                placeholder="Cari barang impian Anda di sini..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ borderRadius: '8px 0 0 8px', fontSize: '14px' }}
              />
              <button className="btn btn-accent px-4" type="submit" style={{ borderRadius: '0 8px 8px 0' }}>
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>

          {/* Right Navigation Controls */}
          <div className="d-flex align-items-center gap-3 mt-2 mt-lg-0">
            {/* Cart Icon */}
            <Link href={getUrl('cart')} className="btn position-relative p-2 border-0 bg-transparent text-dark hover-bg-light rounded-circle">
              <i className="bi bi-cart3 fs-5"></i>
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-white">
                  {cartCount}
                </span>
              )}
            </Link>

            <div className="vr d-none d-lg-block mx-2" style={{ height: '24px' }}></div>

            {/* Auth Actions */}
            {auth.user ? (
              <div className="dropdown">
                <button
                  className="btn btn-light dropdown-toggle d-flex align-items-center gap-2 border-0 bg-transparent"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle fs-5 text-accent"></i>
                  <span className="d-none d-md-inline fw-semibold text-dark">{auth.user.name}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow border-0" aria-labelledby="userDropdown" style={{ borderRadius: '12px' }}>
                  <li className="px-3 py-2 border-bottom">
                    <div className="fw-bold">{auth.user.name}</div>
                    <div className="text-muted small text-capitalize">{auth.user.role === 'seller' ? 'Penjual' : 'Pembeli'} &bull; {auth.user.email}</div>
                  </li>
                  {auth.user.role === 'seller' && (
                    <li>
                      <Link href={getUrl('seller-dashboard')} className="dropdown-item py-2 fw-semibold text-accent">
                        <i className="bi bi-shop me-2"></i> Dashboard Toko
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link href={getUrl('orders')} className="dropdown-item py-2">
                      <i className="bi bi-bag me-2"></i> Transaksi Saya
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="dropdown-item text-danger py-2">
                      <i className="bi bi-box-arrow-right me-2"></i> Keluar
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <Link href={getUrl('login')} className="btn btn-light px-3 py-2 small" style={{ borderRadius: '8px', fontSize: '13px' }}>
                  Masuk
                </Link>
                <Link href={getUrl('register')} className="btn btn-accent px-3 py-2 small fw-semibold" style={{ borderRadius: '8px', fontSize: '13px' }}>
                  Daftar
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Floating Flash Toast / Notification */}
      {toastMessage && (
        <div className="position-fixed top-0 start-50 translate-middle-x mt-5" style={{ zIndex: 2050 }}>
          <div className={`alert alert-${toastType} shadow-lg d-flex align-items-center gap-2 py-3 px-4`} role="alert" style={{ borderRadius: '12px', minWidth: '300px' }}>
            <i className={`bi ${toastType === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} fs-5`}></i>
            <div className="fw-semibold small">{toastMessage}</div>
            <button type="button" className="btn-close ms-auto small" onClick={() => setToastMessage(null)}></button>
          </div>
        </div>
      )}

      {/* Main Body Content */}
      <main className="flex-grow-1">
        {children}
      </main>

      {/* Compact Footer */}
      <footer className="bg-white border-top text-dark py-4 mt-auto">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-bag-check-fill text-accent fs-4"></i>
              <span className="fw-extrabold fs-5" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Toko<span className="text-accent">Green</span>
              </span>
              <span className="text-muted small mx-2 d-none d-sm-inline">|</span>
              <span className="text-muted small d-none d-sm-inline">Platform E-Commerce</span>
            </div>
            
            <div className="d-flex align-items-center gap-3 small text-muted">
              <span>&copy; {new Date().getFullYear()} TokoGreen. Hak Cipta Dilindungi.</span>
              <a href="https://github.com/zakiekasa" target="_blank" rel="noopener noreferrer" className="text-decoration-none text-accent fw-semibold">
                <i className="bi bi-github me-1"></i> GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
