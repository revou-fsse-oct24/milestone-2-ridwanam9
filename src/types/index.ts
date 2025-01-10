export interface User {
    id: number;
    email: string;
    name: string;
    avatar?: string;
  }
  
  export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: Category;
    images: string[];
  }
  
  export interface Category {
    id: number;
    name: string;
    image?: string;
  }
  
  export interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
  }
  
  export interface FormErrors {
    [key: string]: string;
  }
  
  