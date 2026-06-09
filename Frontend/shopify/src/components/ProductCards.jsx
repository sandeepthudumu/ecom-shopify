import React from "react";

function ProductCards({ product, onAddToCart }) {
  return (
    <div className="bg-white  rounded-md shadow-md hover:shadow-xl mt-10 transition-all duration-300 overflow-hidden w-75">
      
      <img
        src={product.image_url}
        alt={product.name}
        loading="lazy"
        className="w-full h-40 object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold truncate">
          {product.name}
        </h2>

        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-3 space-y-1">
          <p className="text-sm text-gray-600">
            Category: <span className="font-medium">{product.category}</span>
          </p>

          <p className="text-xl font-bold text-green-600">
            ₹{product.price}
          </p>

          <p
            className={`text-sm ${
              product.stock > 0
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {product.stock > 0
              ? `${product.stock} in stock`
              : "Out of stock"}
          </p>
        </div>

        <button
          disabled={product.stock <= 0}
          onClick={() => onAddToCart(product.id)}
          className="w-full mt-4 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}

export default ProductCards;