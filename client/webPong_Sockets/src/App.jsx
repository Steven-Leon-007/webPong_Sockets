import React, { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import Header from './components/Header/Header';
import UserForm from './components/LoginForm/LoginForm';

const socket = io('http://localhost:3000');

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    socket.on('connect', () => {
      console.log("User connected to the server");
    })

    return () => {
      socket.off('connect');
    }
  });

  const handleRegister = async (formData) => {
    const { nickName, background } = formData;
    const response = await fetch('/createUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        socketId: socket.id,
        nickName,
        type: "viewer",
        score: 0,
        background,
        width: 600,
        height: 600,
      }),
    });

    if (response.ok) {
      const user = await response.json();
      setUser(user);
    }
  };

  return (
    <div className="app">
      <Header />
      {!user ? (
        <UserForm onRegister={handleRegister} />
      ) : <div>
        <h1>Welcome, {user.nickName}</h1>
      </div>}
    </div>
  )
}

export default App
