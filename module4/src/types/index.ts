// Mendefinisikan interface untuk User
export interface User {
  id: number;        // ID unik untuk user
  email: string;     // Alamat email user
  name: string;      // Nama user
  avatar?: string;   // URL avatar user (opsional dengan ?)
}

// Mendefinisikan interface untuk Product
export interface Product {
  id: number;        // ID unik produk
  title: string;     // Nama produk
  price: number;     // Harga produk
  description: string; // Deskripsi produk
  category: Category; // Kategori produk (menggunakan interface Category)
  images: string[];  // Array URL gambar produk
}

// Mendefinisikan interface untuk Category
export interface Category {
  id: number;        // ID unik kategori
  name: string;      // Nama kategori
  image?: string;    // URL gambar kategori (opsional)
}

// Mendefinisikan interface untuk CartItem
export interface CartItem {
  id: number;        // ID produk dalam keranjang
  title: string;     // Nama produk
  price: number;     // Harga produk
  quantity: number;  // Jumlah item dalam keranjang
}

// Mendefinisikan interface untuk FormErrors
export interface FormErrors {
  [key: string]: string;  // Object dinamis untuk menyimpan error form
}

