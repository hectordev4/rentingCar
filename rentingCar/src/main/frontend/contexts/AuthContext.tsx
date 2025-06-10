import React, { createContext, useState, FC, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from 'Frontend/middleware/AuthService';
import { jwtDecode } from 'jwt-decode';

// --- AuthContextValue ---
interface AuthContextValue {
  isLoggedIn: boolean;
  isAdmin: boolean;
  userId: string | null;
  setUserId: (id: string | null) => void;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: () => boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  setIsAdmin: (isAdmin: boolean) => void;
}

// Initial default values for the context
export const AuthContext = createContext<AuthContextValue>({
  isLoggedIn: false,
  isAdmin: false,
  userId: null,
  setUserId: () => {},
  login: async () => {},
  logout: () => {},
  isAuthenticated: () => false,
  setIsLoggedIn: () => {},
  setIsAdmin: () => {},
});

// --- AuthProviderProps ---
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();

  //Initial state for authentication
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Check authentication status on mount
  useEffect(() => {
    const syncAuthState = () => {
      const token = sessionStorage.getItem('accessToken');
      setIsLoggedIn(!!token);
      const storedUserId = sessionStorage.getItem('userId');
      setUserId(storedUserId);
    };

    // Sync on mount
    syncAuthState();

    // Sync when sessionStorage changes (e.g., in another tab)
    window.addEventListener('storage', syncAuthState);

    return () => {
      window.removeEventListener('storage', syncAuthState);
    };
  }, []);

  //Calls the signIn function from AuthService to authenticate the user
  const login = async (username: string, password: string): Promise<void> => {
    try {
      const response = await signIn(username, password);
      const accessToken = response?.AuthenticationResult?.AccessToken;
      const idToken = response?.AuthenticationResult?.IdToken;
      // Extract userId from idToken (JWT)
      let fetchedUserId: string | null = null;
      if (idToken) {
        const decoded: any = jwtDecode(idToken);
        fetchedUserId = decoded.sub || decoded.username || null;
      }
      if (accessToken && idToken) {
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('idToken', idToken);
        if (fetchedUserId) {
          sessionStorage.setItem('userId', fetchedUserId);
          setUserId(fetchedUserId);
        }
        setIsLoggedIn(true);
        navigate('/home');
      } else {
        throw new Error('Tokens not found in authentication response');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // Logs out the user by removing tokens from sessionStorage and updating state
  const logout = () => {
    sessionStorage.removeItem('idToken');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('userId');
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserId(null);
    navigate('/home');
  };

  // Checks if the user is authenticated by verifying the presence of an access token
  const isAuthenticated = () => !!sessionStorage.getItem('accessToken');

  //Object that contains the context values
  const contextValue: AuthContextValue = {
    isLoggedIn,
    isAdmin,
    userId,
    setUserId,
    login,
    logout,
    isAuthenticated,
    setIsLoggedIn,
    setIsAdmin,
  };

  //Provider
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};