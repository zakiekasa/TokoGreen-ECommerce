import React, { useState } from 'react';
import { Link, router, useForm } from '@inertiajs/react';
import Layout from '../../Components/Layout';

export default function Register() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'buyer', // buyer or seller
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/register');
  };

  return (
    <Layout>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card border-light shadow-lg p-4" style={{ borderRadius: '16px' }}>
              <div className="text-center mb-4">
                <i className="bi bi-person-plus-fill text-accent fs-1"></i>
                <h3 className="fw-bold mt-2" style={{ fontFamily: 'Outfit, sans-serif' }}>Daftar Akun Baru</h3>
                <p className="text-muted small">Gabung dengan TokoGreen dan mulai transaksi Anda</p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Role Switcher Cards (custom role selector) */}
                <div className="mb-4">
                  <label className="form-label small text-muted mb-2 d-block text-center">Saya ingin mendaftar sebagai:</label>
                  <div className="row g-2">
                    <div className="col">
                      <div
                        onClick={() => setData('role', 'buyer')}
                        className={`card text-center p-3 cursor-pointer h-100 ${data.role === 'buyer' ? 'border-accent bg-accent-light text-accent fw-bold' : 'border-light-subtle bg-light text-dark'}`}
                        style={{ borderRadius: '12px', cursor: 'pointer', borderWidth: '2px' }}
                      >
                        <i className="bi bi-bag-check fs-4 mb-1"></i>
                        <div style={{ fontSize: '13px' }}>Pembeli</div>
                      </div>
                    </div>
                    <div className="col">
                      <div
                        onClick={() => setData('role', 'seller')}
                        className={`card text-center p-3 cursor-pointer h-100 ${data.role === 'seller' ? 'border-accent bg-accent-light text-accent fw-bold' : 'border-light-subtle bg-light text-dark'}`}
                        style={{ borderRadius: '12px', cursor: 'pointer', borderWidth: '2px' }}
                      >
                        <i className="bi bi-shop fs-4 mb-1"></i>
                        <div style={{ fontSize: '13px' }}>Penjual / Toko</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Name */}
                <div className="mb-3">
                  <label className="form-label small text-muted mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    placeholder="Masukkan nama lengkap Anda"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    style={{ borderRadius: '8px', fontSize: '14px' }}
                  />
                  {errors.name && <div className="invalid-feedback small">{errors.name}</div>}
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label small text-muted mb-1">Alamat Email</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="nama@email.com"
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
                    placeholder="Minimal 6 karakter"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    style={{ borderRadius: '8px', fontSize: '14px' }}
                  />
                  {errors.password && <div className="invalid-feedback small">{errors.password}</div>}
                </div>

                {/* Confirm Password */}
                <div className="mb-4">
                  <label className="form-label small text-muted mb-1">Ulangi Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Konfirmasi password Anda"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    style={{ borderRadius: '8px', fontSize: '14px' }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-accent w-100 py-2.5 fw-bold mb-3"
                  disabled={processing}
                  style={{ borderRadius: '8px', fontSize: '15px' }}
                >
                  {processing ? 'Mendaftarkan...' : 'Daftar Sekarang'}
                </button>

                <div className="text-center small text-muted">
                  Sudah punya akun? <Link href="/login" className="text-accent fw-semibold text-decoration-none">Masuk di sini</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
