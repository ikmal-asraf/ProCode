import React from 'react';

function ProductList({ products }) {
  if (!products.length) return <p className="text-gray-500">No products found.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">Product List</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left ">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Price ($)</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Weight (g)</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                <td className="border border-gray-300 px-4 py-2">{item.price}</td>
                <td className="border border-gray-300 px-4 py-2">{item.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


export default ProductList;
