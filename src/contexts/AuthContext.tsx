
import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mockLogin, mockValidateToken } from "@/api/mockAuth";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  user: User | null;
}

interface User {
  email: string;
  name: string;
  role: "admin" | "user";
  sectionsAutorisees?: string[];
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  }
  return context;
};

const TOKEN_KEY = "jwtToken";
const USER_KEY = "user";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // On refresh, validate token and restore user (mock, not secure in real life)
    const token = localStorage.getItem(TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);
    if (token && storedUser) {
      const payload = mockValidateToken(token);
      if (payload && payload.email) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
        return;
      }
    }
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const result = await mockLogin(email, password);

    if (result.success && result.user && result.token) {
      setUser(result.user);
      setIsAuthenticated(true);
      localStorage.setItem(USER_KEY, JSON.stringify(result.user));
      localStorage.setItem(TOKEN_KEY, result.token);
      return true;
    }
    // Clear token/user on failed login
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
    setIsAuthenticated(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
