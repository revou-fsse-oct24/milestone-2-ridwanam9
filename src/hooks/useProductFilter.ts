import { useMemo, useState, useCallback } from 'react';
import { Product, Category } from '../types';

export const useProductFilter = (products: Product[] | undefined) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    if (!products) return [];
    const categorySet = new Set(products.map(product => product.category.name));
    return Array.from(categorySet);
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    
    return products.filter(product => {
      const matchesCategory = !selectedCategory || product.category.name === selectedCategory;
      const matchesSearch = !searchQuery || 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return {
    categories,
    selectedCategory,
    searchQuery,
    filteredProducts,
    handleCategoryChange,
    handleSearchChange
  };
};

