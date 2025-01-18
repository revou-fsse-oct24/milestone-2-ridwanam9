import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: number;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('https://api.escuelajs.co/api/v1/auth/login', { email, password });
      const { access_token } = response.data;
      const userResponse = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
        headers: { Authorization: `Bearer ${access_token}` }
      });
      const userData = userResponse.data;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', access_token);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      await axios.post('https://api.escuelajs.co/api/v1/users/', { name, email, password, avatar: 'https://picsum.photos/800' });
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

