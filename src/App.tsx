import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductUploadForm from "./pages/Dashboard";
import Dashboard from "./pages/MainDasboard";
import ViewProduct from "./comp/ViewProduct";
import ProductDetail from "./pages/ProductDetails";
import WhoWeAre from "./pages/WhoWeAre";
import ContactUS from "./pages/ContactUS";
import UserRegistration from "./pages/UserRegistration";
import UserLogPage from "./pages/UserLogPage";
import TransactionPage from "./pages/Transaction";
import Transfer from "./pages/Transfer.tsx";
import Logtransfer from "./pages/Logtransfer";
import LoanPage from "./pages/LoanPage";
import LoanLog from "./pages/LoanLog";
import FundAccount from "./pages/FundAccount";
import Support from "./pages/Support";
import AccountSettings from "./pages/AccountSettings";
import AccountSettingsPage from "./pages/AccountSeetingPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/who-we-are" element={<WhoWeAre />} />
          <Route path="/Contact-us" element={<ContactUS />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/register" element={<UserRegistration />} />
          <Route path="/auth/dashboard" element={<Dashboard />} />
          <Route path="/auth/User/dashboard" element={<UserLogPage />} />
          <Route path="/auth/transaction/dashboard" element={<TransactionPage />} />
          <Route path="/auth/transfer/dashboard" element={<Transfer />} />
          <Route path="/transfer-history/:token" element={<Logtransfer />} />
          <Route path="/auth/loan/dashboard" element={<LoanPage />} />
          <Route path="/loan-history/:token" element={<LoanLog />} />
          <Route path="/auth/fund-account/dashboard" element={<FundAccount />} />
          <Route path="/auth/account-support/dashboard" element={<Support />} />
          <Route path="/auth/account-setting/dashboard" element={<AccountSettingsPage />} />
          <Route path="/upload/admin" element={<ProductUploadForm />} />
          <Route path="/upload/product" element={<ViewProduct />} />
          <Route path="/products/:productName" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
