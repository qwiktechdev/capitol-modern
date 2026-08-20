import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import ProductList from './ProductList';

function ViewProduct() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader />
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="page-header flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="page-title">Control Panel</h1>
            <p className="page-subtitle">Manage your product catalog</p>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => navigate(-1)} className="btn-secondary">
              Back
            </button>
            <Link to="/upload/admin">
              <button type="button" className="btn-primary">Create New Product</button>
            </Link>
          </div>
        </div>
        <ProductList />
      </div>
    </div>
  );
}

export default ViewProduct;
