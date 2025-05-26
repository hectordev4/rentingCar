import {createContext} from 'react';
import useState from 'react';

const LoginContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn: boolean) => {},
  isAdmin: false,
  setIsAdmin: (isAdmin: boolean) => {}
});



function LoginProvider({children}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin}}>
      {children}
    </LoginContext.Provider>
  );
}
