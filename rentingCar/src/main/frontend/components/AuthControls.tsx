import React, { useContext } from 'react';
import { AuthContext } from 'Frontend/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AuthControls() {
  const { isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } = useContext(AuthContext);
    const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <button
        onClick={() => {
          if (!isLoggedIn) {
            navigate('/login');
          } else {
            setIsLoggedIn(false);
          }
        }}
      >
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
