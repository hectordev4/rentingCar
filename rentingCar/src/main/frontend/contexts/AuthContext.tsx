import React, { createContext, useState, FC, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from 'Frontend/middleware/AuthService';

// --- AuthContextValue ---
interface AuthContextValue {
  isLoggedIn: boolean;
  isAdmin: boolean;
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

  // Check authentication status on mount
  useEffect(() => {
    const syncAuthState = () => {
      const token = sessionStorage.getItem('accessToken');
      setIsLoggedIn(!!token);
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
    if (accessToken && idToken) {
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('idToken', idToken);
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
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate('/home');
  };

  // Checks if the user is authenticated by verifying the presence of an access token
  const isAuthenticated = () => !!sessionStorage.getItem('accessToken');

  //Object that contains the context values
  const contextValue: AuthContextValue = {
    isLoggedIn,
    isAdmin,
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