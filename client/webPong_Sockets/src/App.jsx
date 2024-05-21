import React, { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import Header from './components/Header/Header';
import UserForm from './components/LoginForm/LoginForm';

const socket = io('/');


function App() {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);


  useEffect(() => {
    socket.on('connect', () => {
      console.log("User connected to the server");
    })

    return () => {
      socket.off('connect');
    }
  });

  const handleRegister = (formData) => {
    const { nickName, background } = formData;
    const newUser = {
      socketId: socket.id,
      nickName,
      type: "viewer",
      score: 0,
      board: {
        background,
        width: 600,
        height: 600,
      }
    };
    setUser(newUser);
    setAllUsers([...allUsers, newUser]);
    socket.emit("register", newUser);
  };

  return (
    <div className="app">
      <Header />
      {!user ? (
        <UserForm onRegister={handleRegister} />
      ) : (<div>
        <h1>Welcome, {user.nickName}</h1>
      </div>)
      }
    </div>
  )
}

export default App
