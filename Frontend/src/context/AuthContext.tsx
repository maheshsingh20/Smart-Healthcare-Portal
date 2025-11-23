import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "doctor" | "patient";
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string, role: string) => Promise<void>;
  signup: (data: any, role: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: string) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/auth/${role}/login`,
        { email, password }
      );

      const { token: newToken } = response.data;
      // Backend returns different keys: patient, doctor, or admin
      const userData = response.data[role] || response.data.user;

      const userWithRole = {
        id: userData.id || userData._id,
        name: userData.name,
        email: userData.email,
        role: role as "admin" | "doctor" | "patient"
      };

      setToken(newToken);
      setUser(userWithRole);

      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(userWithRole));

      axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  const signup = async (data: any, role: string) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/auth/${role}/signup`,
        data
      );

      // Signup might not return token for doctors (pending approval)
      if (response.data.token) {
        const { token: newToken } = response.data;
        const userData = response.data[role] || response.data.user;

        const userWithRole = {
          id: userData.id || userData._id,
          name: userData.name,
          email: userData.email,
          role: role as "admin" | "doctor" | "patient"
        };

        setToken(newToken);
        setUser(userWithRole);

        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(userWithRole));

        axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Signup failed");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        signup,
        logout,
        isAuthenticated: !!token,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
