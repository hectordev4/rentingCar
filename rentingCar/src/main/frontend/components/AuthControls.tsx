import React, { useContext } from 'react';
import { LoginContext } from 'Frontend/contexts/LoginContext';

export default function AuthControls() {
  const { isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } = useContext(LoginContext);

  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        {isLoggedIn ? 'Log out' : 'Log in'}
      </button>
      <button
        onClick={() => setIsAdmin(!isAdmin)}
        disabled={!isLoggedIn}
      >
        {isAdmin ? 'Set User' : 'Set Admin'}
      </button>
    </div>
  );
}
