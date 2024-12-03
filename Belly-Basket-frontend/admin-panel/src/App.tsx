import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import ShopForm from './components/ShopForm';

const App: React.FC = () => {
  const [token, setToken] = useState<string>(localStorage.getItem('token') || '');

  useEffect(() => {
    if (!token) {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <div>
      <h1>Admin Panel</h1>
      {!token ? (
        <LoginForm setToken={setToken} />
      ) : (
        <ShopForm />
      )}
    </div>
  );
};

export default App;
