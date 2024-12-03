import React, { useState } from 'react';
import api from '../api';

interface LoginFormProps {
  setToken: (token: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ setToken }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      setToken(token);
    
    } catch (err) {
      setError('Invalid login credentials');
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginForm;
