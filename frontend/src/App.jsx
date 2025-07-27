import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';

function App() {
  const [products, setProducts] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${apiUrl}/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Failed to fetch products:', err));
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    <div className="container">
      <h1>{import.meta.env.VITE_APP_NAME}</h1>
      <ProductList products={products} />
    </div>
    </>
  );
}

export default App;