import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
  };
  images: string[];
}

const fetchProduct = async (id: string) => {
  const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
  return response.data;
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useQuery<Product>({ // Update here
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id!)
  });
  const { addToCart } = useCart();

  if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error fetching product</div>;
  if (!product) return <div className="text-center mt-8">Product not found</div>;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
    });
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img src={product.images[0]} alt={product.title} className="w-full h-auto object-cover rounded-lg" />
        </div>
        <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
          <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
          <p className="text-xl mb-4">Price: ${product.price}</p>
          <p className="text-gray-700 mb-4">Category: {product.category.name}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

