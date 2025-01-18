import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto mt-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to ShopSmart</h1>
      <p className="text-xl mb-8">Browse our amazing products and start shopping!</p>
      <Link to="/products" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
        Shop Now
      </Link>
    </div>
  );
};

export default Home;

