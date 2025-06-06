import React, { createContext, useState, FC, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material'; // Assuming Material UI

// --- AuthContextValue ---
interface AuthContextValue {
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: () => void; // Renamed handleLogin for clarity
  logout: () => void; // Renamed handleLogout for clarity
  isAuthenticated: () => boolean;
  setIsLoggedIn: (loggedIn: boolean) => void; // Expose setter if other parts need to directly influence login state (less common)
  setIsAdmin: (isAdmin: boolean) => void; // Expose setter if other parts need to directly influence admin state
}

// Initial default values for the context
export const AuthContext = createContext<AuthContextValue>({
  isLoggedIn: false,
  isAdmin: false,
  login: () => {},
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // You'd set this based on actual admin check
  const navigate = useNavigate();

  // Effect to initialize isLoggedIn state on component mount
  // or when relevant storage changes (e.g., token expiration)
  useEffect(() => {
    // You might want a more sophisticated check here,
    // e.g., decoding JWT, checking token expiration, etc.
    const token = sessionStorage.getItem('accessToken');
    const currentlyAuthenticated = !!token;
    setIsLoggedIn(currentlyAuthenticated);
    // You'd also check for admin role here based on token claims or user info
    // setIsAdmin(checkIfAdmin(token));
  }, []); // Run once on mount

  const isAuthenticated = () => {
    // This function can remain simple or grow more complex
    // to include token expiry checks etc.
    const accessToken = sessionStorage.getItem('accessToken');
    return !!accessToken;
  };

  const login = () => {
    // In a real app, this would involve API calls for authentication
    // and storing tokens upon success.
    // For now, it just navigates to the login page.
    navigate('/login');
  };

  const logout = () => {
    sessionStorage.removeItem('idToken');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    setIsLoggedIn(false); // Update the state immediately
    setIsAdmin(false); // Clear admin state
    navigate('/home'); // Navigate to a public page
    // window.location.reload(); // Only if a hard refresh is absolutely necessary
  };

  const contextValue: AuthContextValue = {
    isLoggedIn,
    isAdmin,
    login,
    logout,
    isAuthenticated,
    setIsLoggedIn,
    setIsAdmin,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};