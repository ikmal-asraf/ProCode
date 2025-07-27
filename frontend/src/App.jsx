import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';
import PlaceOrder from './components/PlaceOrder';
import PackageList from './components/PackageList';
import './App.css';
function App() {
  const [products, setProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
        axios.get(`${apiUrl}/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Failed to fetch products:', err));
  }, []);

  const handleSelectionChange = (updatedItems) => {
    setSelectedItems(updatedItems);
  };

  return (
    <div className="min-h-screen flex flex-row items-start gap-6 bg-gray-100 py-10 px-4 w-full">
      <div className="w-2/3">
        <ProductList
          products={products}
          selectedItems={selectedItems}
          onSelectionChange={handleSelectionChange}
        />
      </div>
      <div className="w-full max-w-xs flex flex-col gap-6">
        <PlaceOrder
          selectedItems={selectedItems}
          onPlaceOrder={() => alert("Order placed")}
        />

      </div>
    </div>
  );
}

export default App;