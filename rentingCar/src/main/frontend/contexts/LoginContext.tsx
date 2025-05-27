import React, { createContext, useState, ReactNode, FC } from 'react';


interface LoginContextValue {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}


const LoginContext = createContext<LoginContextValue>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  isAdmin: false,
  setIsAdmin: () => {},
});


interface LoginProviderProps {
  children: ReactNode;
}

export const LoginProvider: FC<LoginProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
