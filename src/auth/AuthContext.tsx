import { createContext, useContext, useState, ReactNode, FC, useCallback, useEffect } from "react";
import useLocalStorage from "../_hooks/useLocalStorage";
// import jwtDecode, { JwtPayload } from 'jwt-decode';

interface UserData {
  token: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (userData: UserData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { setLocalStorage } = useLocalStorage();

  useEffect(() => {
    console.log("isAuthenticated=>>>>> ", isAuthenticated);
    const accessToken = getAccessToken();
    if (accessToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = (userData: UserData) => {
    setIsAuthenticated(true);
    setLocalStorage("accessToken", userData.token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("accessToken");
  };

  const getAccessToken = useCallback(() => {
    return localStorage.getItem("accessToken");
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { useAuth, AuthProvider };
