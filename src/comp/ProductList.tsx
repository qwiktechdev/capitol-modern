import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { TimestampDate } from "timestamp-date";
import { getAllProducts } from "../Services/GetUser.service";
import { getTimeAgo } from "../Services/Utility";
import { Product } from "../Services/interface";
import AdminHeader from "./AdminHeader";
import { deleteDoc, doc } from "firebase/firestore";
import { database } from "../firebase";

const ProductList = () => {
  const [users, setUsers] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [debouncedScroll, setDebouncedScroll] = useState<number | null>(null);
  const [search, setsearch] = useState("");
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    fetchUsers(1);
  }, []);

  const timestampDate = new TimestampDate();

  const fetchUsers = async (page: number) => {
    if (isFetching) return;
    setIsFetching(true);
    setIsLoading(true);

    try {
      await getAllProducts("", (result: Product[]) => {
        const queryuser = timestampDate.parseTimestampToDate(result) as any;
        setUsers(result);
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  };

  const handleScroll = () => {
    if (
      window.scrollY + window.innerHeight >= document.body.offsetHeight - 50 &&
      hasMore &&
      !isFetching
    ) {
      if (debouncedScroll !== null) {
        clearTimeout(debouncedScroll);
      }

      const timeout = setTimeout(() => {
        fetchUsers(users.length / 10 + 1);
      }, 200);
      setDebouncedScroll(timeout as any);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (debouncedScroll !== null) {
        clearTimeout(debouncedScroll);
      }
    };
  }, [hasMore, isFetching, users.length, debouncedScroll]);

  const handleProductSelected = (product: Product) => {
    // Navigate to the product detail page with the selected product's ID
    navigate(`/products/${product.productName}`, { state: { product } });
  };

  
  const deleteProduct = async (id: string) => {
    try {
      const productRef = doc(database, "files", id); // Assuming your products are stored in a 'products' collection
      await deleteDoc(productRef);
      fetchUsers(1)
      console.log("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="card !p-0 overflow-hidden">
      <div className="flex flex-col gap-4 border-b border-slate-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="font-semibold text-slate-900">Products</h3>
        <input
          type="text"
          onChange={(e) => setsearch(e.target.value)}
          className="input-field !max-w-xs !py-2"
          placeholder="Search products..."
        />
      </div>

      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Joined</th>
              <th>Product Name</th>
              <th className="hidden md:table-cell">Amount</th>
              <th className="hidden md:table-cell">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr><td colSpan={5} className="py-12 text-center text-slate-400">No products found</td></tr>
            ) : (
              users
                .filter((value) =>
                  value.ownerName.toLowerCase().includes(search.toLowerCase()) ||
                  value.title.toLowerCase().includes(search.toLowerCase()) ||
                  value.subtitle.toLowerCase().includes(search.toLowerCase()) ||
                  value.productName.toLowerCase().includes(search.toLowerCase())
                )
                .map((user, i) => (
                  <tr key={i + 1}>
                    <td>{i + 1}</td>
                    <td>{user.createdAt ? getTimeAgo(user.createdAt) : ''}</td>
                    <td className="cursor-pointer font-medium text-brand-600 hover:underline" onClick={() => handleProductSelected(user)}>
                      {user.title}
                    </td>
                    <td className="hidden md:table-cell">${user.amount}</td>
                    <td className="hidden md:table-cell">
                      <button type="button" onClick={() => deleteProduct(user.id)} className="btn-danger !px-3 !py-1.5 !text-xs">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
            )}
            {isLoading && (
              <tr><td colSpan={5} className="py-8 text-center text-slate-400">Loading...</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
