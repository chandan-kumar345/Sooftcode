"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import axios, { AxiosInstance } from 'axios';

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  loading: boolean;
  login: (emailOrUsername: string, password: string) => Promise<boolean>;
  logout: () => void;
  api: AxiosInstance;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Memoize the Axios instance so it is NOT recreated on every render.
  // A new object reference on every render causes context consumers to
  // re-render infinitely (the root cause of the page-refresh loop).
  const api = useMemo(() => {
    const instance = axios.create({ baseURL: API_URL });
    instance.interceptors.request.use((config) => {
      const currentToken = localStorage.getItem('sooftcode_token');
      if (currentToken) {
        config.headers.Authorization = `Bearer ${currentToken}`;
      }
      return config;
    });
    return instance;
  }, []); // empty deps → created once, never recreated

  useEffect(() => {
    const checkLoggedIn = async () => {
      const storedToken = localStorage.getItem('sooftcode_token');
      if (storedToken) {
        setToken(storedToken);
        try {
          const response = await axios.get(`${API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          });
          if (response.data?.success) {
            setUser(response.data.data);
          } else {
            localStorage.removeItem('sooftcode_token');
          }
        } catch (error) {
          console.error('[Auth Context] Token validation failed:', error);
          localStorage.removeItem('sooftcode_token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  // Memoize callbacks so their references are stable across renders
  const login = useCallback(async (emailOrUsername: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        emailOrUsername,
        password,
      });

      if (response.data?.success) {
        const { token: userToken, ...userData } = response.data.data;
        localStorage.setItem('sooftcode_token', userToken);
        setToken(userToken);
        setUser(userData);
        return true;
      }
      return false;
    } catch (error) {
      console.error('[Auth Context] Login error:', error);
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('sooftcode_token');
    setToken(null);
    setUser(null);
  }, []);

  // Memoize the context value object so consumers only re-render when
  // token, user, or loading actually change — not on every parent render.
  const contextValue = useMemo(
    () => ({ token, user, loading, login, logout, api }),
    [token, user, loading, login, logout, api]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
