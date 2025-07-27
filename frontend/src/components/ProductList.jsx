import React, { useState } from 'react';

function ProductList({ products, selectedItems, onSelectionChange }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleCheckboxChange = (item) => {
    const alreadySelected = selectedItems.some(i => i.id === item.id);
    if (alreadySelected) {
      onSelectionChange(selectedItems.filter(i => i.id !== item.id));
    } else {
      onSelectionChange([...selectedItems, item]);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = products.slice(startIdx, startIdx + itemsPerPage);

  if (!products.length) return <p className="text-gray-500 text-center">No products found.</p>;

  return (
    <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8 mt-8 mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Product List</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-center border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Price ($)</th>
              <th className="px-6 py-3">Weight (g)</th>
              <th className="px-6 py-3">Select</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedProducts.map((item) => (
              <tr key={item.id} className="bg-white hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3 font-medium text-gray-800">{item.name}</td>
                <td className="px-6 py-3 text-gray-600">{item.price}</td>
                <td className="px-6 py-3 text-gray-600">{item.weight}</td>
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedItems.some(i => i.id === item.id)}
                    onChange={() => handleCheckboxChange(item)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 mt-6">
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
    </div>
  );
}

export default ProductList;