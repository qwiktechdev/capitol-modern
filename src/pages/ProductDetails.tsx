import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Product } from "../Services/interface";
// Add your delete and update functions
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { database } from "../firebase";

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product }: { product: Product } = location.state;
  const [productData, setProductData] = useState<Product>(product);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await updateProduct(productData); // Implement this function in your service
      alert("Product updated successfully!");
      navigate("/upload/product");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(productData.id); // Implement this function in your service
      alert("Product deleted successfully!");
      navigate("/upload/product");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

   const deleteProduct = async (id: string) => {
    try {
      const productRef = doc(database, "files", id); // Assuming your products are stored in a 'products' collection
      await deleteDoc(productRef);
      console.log("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  
  // Update product in Firestore
const updateProduct = async (product: Product) => {
    try {
      const productRef = doc(database, "files", product.id); // Assuming each product's document ID is the product name
      await updateDoc(productRef, { ...product });
      console.log("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-lg px-4 md:px-8">
        <h1 className="page-title">Product Details</h1>
        <div className="card mt-6 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Product Name</label>
            <input type="text" name="productName" value={productData.productName} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Owner Name</label>
            <input type="text" name="ownerName" value={productData.ownerName} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Amount</label>
            <input type="text" name="amount" value={productData.amount} onChange={handleChange} className="input-field" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={handleSave} className="btn-primary">Save Changes</button>
            <button type="button" onClick={() => setShowDeleteModal(true)} className="btn-danger">Delete Product</button>
          </div>
        </div>

        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="modal-panel">
              <p className="text-slate-700">Are you sure you want to delete this product?</p>
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={() => setShowDeleteModal(false)} className="btn-secondary">Cancel</button>
                <button type="button" onClick={handleDelete} className="btn-danger">Yes, Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
