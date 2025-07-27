import React, { useState } from 'react';

function PackageList({ packages }) {
  const [currentPage, setCurrentPage] = useState(1);

  if (!packages.length) return null;

  const totalPages = packages.length;
  const currentPackage = packages[currentPage - 1];

  return (
    <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Package Summary
      </h2>
      <div className="space-y-6">
        <div className="border border-gray-200 rounded-md p-4">
          <h3 className="text-lg font-semibold mb-2 text-blue-700">Package {currentPage}</h3>
          <p className="text-sm text-gray-700">
            <strong>Items:</strong> {currentPackage.items.join(', ')}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Total Weight:</strong> {currentPackage.total_weight}g
          </p>
          <p className="text-sm text-gray-700">
            <strong>Total Price:</strong> ${currentPackage.total_price}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Courier Price:</strong> ${currentPackage.courier_price}
          </p>
        </div>
      </div>
      {totalPages > 1 && (
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
      )}
    </div>
  );
}
export default PackageList;