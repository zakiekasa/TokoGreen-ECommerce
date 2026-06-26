import React from 'react';
import { Link, router, useForm } from '@inertiajs/react';
import Layout from '../../Components/Layout';

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/login');
  };


  return (
    <Layout>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card border-light shadow-lg p-4 mb-4" style={{ borderRadius: '16px' }}>
              <div className="text-center mb-4">
                <i className="bi bi-box-arrow-in-right text-accent display-6"></i>
                <h3 className="fw-bold mt-2" style={{ fontFamily: 'Outfit, sans-serif' }}>Masuk Ke Akun</h3>
                <p className="text-muted small">Kelola pesanan dan tokomu secara efisien</p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Email */}
                <div className="mb-3">
                  <label className="form-label small text-muted mb-1">Alamat Email</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="Masukkan email Anda"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    style={{ borderRadius: '8px', fontSize: '14px' }}
                  />
                  {errors.email && <div className="invalid-feedback small">{errors.email}</div>}
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label small text-muted mb-1">Password</label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    placeholder="Masukkan password Anda"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    style={{ borderRadius: '8px', fontSize: '14px' }}
                  />
                  {errors.password && <div className="invalid-feedback small">{errors.password}</div>}
                </div>

                {/* Remember Me */}
                <div className="mb-4 d-flex justify-content-between align-items-center">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberMe"
                      checked={data.remember}
                      onChange={(e) => setData('remember', e.target.checked)}
                    />
                    <label className="form-check-label small text-muted" htmlFor="rememberMe">Ingat Saya</label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-accent w-100 py-2.5 fw-bold mb-3"
                  disabled={processing}
                  style={{ borderRadius: '8px', fontSize: '15px' }}
                >
                  {processing ? 'Memproses...' : 'Masuk Sekarang'}
                </button>

                <div className="text-center small text-muted">
                  Belum punya akun? <Link href="/register" className="text-accent fw-semibold text-decoration-none">Daftar di sini</Link>
                </div>
              </form>
            </div>



          </div>
        </div>
      </div>
    </Layout>
  );
}
