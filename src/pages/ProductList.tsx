import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  price: number;
  category: {
    id: number;
    name: string;
  };
  images: string[];
}

const fetchProducts = async () => {
  const response = await axios.get('https://api.escuelajs.co/api/v1/products');
  return response.data;
};

const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts
  });

  const categories = products 
    ? [...new Set(products.map((product: Product) => product.category.name))] 
    : [];

  const filteredProducts = selectedCategory
    ? products?.filter((product: Product) => product.category.name === selectedCategory)
    : products;

  if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error fetching products</div>;

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <select
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="mb-4 px-3 py-2 border rounded">
        <option value="">All Categories</option>
        {categories.map((category: string) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts?.map((product: Product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg">
            <img src={product.images[0]} alt={product.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{product.title}</h3>
              <p className="text-gray-700 mb-2">Price: ${product.price}</p>
              <Link to={`/products/${product.id}`} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

