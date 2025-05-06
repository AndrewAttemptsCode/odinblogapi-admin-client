import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryToken = params.get('token');

    if (queryToken) {
      localStorage.setItem('token', queryToken);
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;

        if (decoded.exp < now) {
          logout();
        }
        
        setIsAdmin(decoded.role === 'ADMIN');
        setUser(decoded);
      } catch (error) {
        console.error('Invalid token:', error);
        logout();
      }
    }
  }, []);

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('token');
  }

  const value = {
    isAdmin,
    user,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};
