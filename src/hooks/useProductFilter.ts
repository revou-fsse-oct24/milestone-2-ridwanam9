import { useMemo, useState, useCallback } from 'react';
import { Product } from '../types';

export const useProductFilter = (products: Product[] | undefined) => {
  // State untuk kategori yang dipilih dan query pencarian
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Mendapatkan list kategori unik dari produk
  const categories = useMemo(() => {
    if (!products) return [];
    const categorySet = new Set(products.map(product => product.category.name));
    return Array.from(categorySet);
  }, [products]);

  // Filter produk berdasarkan kategori dan pencarian
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    
    return products.filter(product => {
      const matchesCategory = !selectedCategory || 
        product.category.name === selectedCategory;
      const matchesSearch = !searchQuery || 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  // Handler untuk perubahan kategori
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  // Handler untuk perubahan query pencarian
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Mengembalikan nilai dan fungsi yang diperlukan
  return {
    categories,
    selectedCategory,
    searchQuery,
    filteredProducts,
    handleCategoryChange,
    handleSearchChange
  };
};

