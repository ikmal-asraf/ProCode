import React, { useState } from 'react';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

function PlaceOrder({ selectedItems, setPackageResults  }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

    const handlePlaceOrder = async () => {
    try {
      const response = await axios.post(`${apiUrl}/place-order`, {
        items: selectedItems,
      });

      setPackageResults(response.data.packages); // assumes backend returns { packages: [...] }
    } catch (error) {
      console.error('Order failed:', error);
      alert('Something went wrong while placing the order.');
    }
  };

  if (!selectedItems.length) return null;

  const totalPages = Math.ceil(selectedItems.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedItems = selectedItems.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="w-full max-w-xs mx-auto mt-8 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-800 font-bold">Order Summary</h2>
      <div className="mb-4 text-center text-gray-700 font-medium">
        Total Selected Items: {selectedItems.length}
      </div>
      <ul className="space-y-2 mb-4">
        {paginatedItems.map((item) => (
          <li key={item.id} className="flex justify-between border-b pb-2">
            <span>{item.name}</span>
            <span>${item.price}</span>
          </li>
        ))}
      </ul>
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mb-4">
          <button
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="font-medium">{currentPage} / {totalPages}</span>
          <button
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
      <button
        onClick={handlePlaceOrder}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
      >
        Place Order
      </button>
    </div>
  );
}

export default PlaceOrder;