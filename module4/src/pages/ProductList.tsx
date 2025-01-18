import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Product } from '../types';
import { useProductFilter } from '../hooks/useProductFilter';

// Fungsi untuk fetch data produk
const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get('https://api.escuelajs.co/api/v1/products');
  return response.data;
};

const ProductList = () => {
  // Menggunakan React Query untuk fetch data produk
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts
  });

  // Menggunakan custom hook untuk filter produk
  const {
    categories,
    selectedCategory,
    searchQuery,
    filteredProducts,
    handleCategoryChange,
    handleSearchChange
  } = useProductFilter(products);

  // Menampilkan loading state
  if (isLoading) return (
    <div className="container text-center mt-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
    </div>
  );

  // Menampilkan error state
  if (error) return (
    <div className="container text-center mt-4 text-red-500">
      Error fetching products
    </div>
  );

  return (
    <div className="container">
      <div className="mt-4 space-y-4">
        <h2 className="text-2xl font-bold text-center">Our Products</h2>
        
        {/* Input pencarian dan dropdown kategori */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="form-input flex-1"
          />
          
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="form-input w-full sm:w-48"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Menampilkan produk yang telah difilter */}
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">
            No products found matching your criteria
          </p>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="product-image"
                />
                <div className="product-info">
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                  <Link
                    to={`/products/${product.id}`}
                    className="button button-primary mt-2"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;

