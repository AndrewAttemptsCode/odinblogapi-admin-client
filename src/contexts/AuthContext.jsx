import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryToken = params.get('token');

    if (!queryToken) {
      return logout();
    }

    if (queryToken) {
      sessionStorage.setItem('token', queryToken);
    }

    const token = sessionStorage.getItem('token');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;

        if (decoded.exp < now || decoded.role !== 'ADMIN') {
          return logout();
        }
        
        setIsAdmin(decoded.role === 'ADMIN');
        setUser(decoded);
      } catch (error) {
        console.error('Invalid token:', error);
        logout();
      }
    }

    setLoading(false);
  }, []);

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    sessionStorage.removeItem('token');
    window.location.href=`${import.meta.env.VITE_PUBLIC_URL}`;
  }

  const value = {
    isAdmin,
    user,
    logout,
    loading,
  }

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};
