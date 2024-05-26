import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './components/Home/Home';
import UserForm from './components/LoginForm/LoginForm';
import socketManager from './socketManager';

function App() {
  const [userLogged, setUserLogged] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  useEffect(() => {
    socketManager.init();
  }, []);

  return (
    <div className="app">
      {!userLogged ? (
        <UserForm setUserLogged={setUserLogged} setSelectedUserId={setSelectedUserId}/>
      ):
        <Home selectedUserId={selectedUserId}/>
      }
    </div>
  );
}

export default App;
