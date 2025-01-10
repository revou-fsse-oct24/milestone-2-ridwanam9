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

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">Error fetching products</div>;

  return (
    <div className="container">
      <div className="mt-4">
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="form-input"
        >
          <option value="">All Categories</option>
          {categories.map((category: string) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="product-grid">
        {filteredProducts?.map((product: Product) => (
          <div key={product.id} className="product-card">
            <img 
              src={product.images[0]} 
              alt={product.title} 
              className="product-image"
            />
            <div className="product-info">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price">${product.price}</p>
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
    </div>
  );
};

export default ProductList;

