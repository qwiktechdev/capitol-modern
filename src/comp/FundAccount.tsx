import React from 'react';
import { FaBitcoin, FaHeadset } from 'react-icons/fa';

const FundAccountq: React.FC = () => {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-soft">
      <div className="mb-6 inline-flex rounded-2xl bg-brand-100 p-5 text-brand-600">
        <FaBitcoin className="text-4xl" />
      </div>
      <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Fund Your Account</h1>
      <p className="mt-4 max-w-md text-slate-600">
        We now offer the option for customers to fund their accounts using cryptocurrency.
      </p>
      <div className="mt-8 flex items-center gap-3 rounded-xl bg-brand-50 px-6 py-4">
        <FaHeadset className="text-brand-600" />
        <p className="font-semibold text-brand-800">Please contact support to fund your account</p>
      </div>
    </div>
  );
};

export default FundAccountq;
