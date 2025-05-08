import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { User, UserRole } from "@/types";
import { toast } from "@/components/ui/sonner"; // for only showing errors.

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (
    name: string,
    email: string,
    password: string,
    department: string,
    role: UserRole
  ) => Promise<boolean>;

  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${backendUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      // console.log(data);
      setUser(data);

      setIsLoggedIn(true);
      sessionStorage.setItem("user", JSON.stringify(data));
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Login failed.");
      return false;
    }
  };
  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
      setIsLoggedIn(true);
    }
  }, []);

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    sessionStorage.removeItem("user");
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    department: string,
    role: UserRole
  ) => {
    try {
      const response = await fetch(`${backendUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, department, role }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      setUser(data);
      setIsLoggedIn(true);
      sessionStorage.setItem("user", JSON.stringify(data));
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Registration failed.");
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
