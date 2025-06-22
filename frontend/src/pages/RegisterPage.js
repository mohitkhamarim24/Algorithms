import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/auth/register', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} /><br />
        <input name="email" placeholder="Email" onChange={handleChange} /><br />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
