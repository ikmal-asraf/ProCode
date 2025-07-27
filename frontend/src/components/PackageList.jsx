import React from 'react';

function PackageList({ packages }) {
  if (!packages.length) return null;

  return (
    <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Package Summary
      </h2>
      <div className="space-y-6">
        {packages.map((pkg, index) => (
          <div key={pkg.id || index} className="border border-gray-200 rounded-md p-4">
            <h3 className="text-lg font-semibold mb-2 text-blue-700">Package {index + 1}</h3>
            <p className="text-sm text-gray-700">
              <strong>Items:</strong> {pkg.items.join(', ')}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Total Weight:</strong> {pkg.totalWeight}g
            </p>
            <p className="text-sm text-gray-700">
              <strong>Total Price:</strong> ${pkg.totalPrice.toFixed(2)}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Courier Price:</strong> ${pkg.courierPrice.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PackageList;