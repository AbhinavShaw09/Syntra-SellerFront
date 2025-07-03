"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { jwtDecode } from "jwt-decode";
import { apiFetch } from "@/lib/api";
import { BakckendEndpoints } from "@/utils/endpoints";

type DecodedToken = {
  username: string;
  exp: number;
  iat: number;
};

type User = {
  accessToken: string;
  decoded: DecodedToken;
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("accessToken");
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setUser({ accessToken: token, decoded });
        }
      } catch (err) {
        console.error("Invalid token:", err);
        logout();
      }
    }
    setLoading(false);
  }, [logout]);

  const login = async (username: string, password: string) => {
    try {
      type LoginResponse = { access_token: string };

      const data = await apiFetch<
        LoginResponse,
        { username: string; password: string }
      >(BakckendEndpoints.AUTH.LOGIN, {
        method: "POST",
        body: { username, password },
      });

      const accessToken = data.access_token;
      const decoded = jwtDecode<DecodedToken>(accessToken);

      localStorage.setItem("accessToken", accessToken);
      setUser({ accessToken, decoded });
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      type RegisterResponse = { msessage: string };
      await apiFetch<
        RegisterResponse,
        { username: string; email: string; password: string }
      >(BakckendEndpoints.AUTH.REGISTER, {
        method: "POST",
        body: { username, email, password },
      });
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };
  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
