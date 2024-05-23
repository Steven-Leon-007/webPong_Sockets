import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './components/Home/Home';
import UserForm from './components/LoginForm/LoginForm';
import socketManager from './socketManager';

function App() {
  const [userLogged, setUserLogged] = useState(false);
  useEffect(() => {
    socketManager.init();
  }, []);

  return (
    <div className="app">
      {!userLogged ? (
        <UserForm setUserLogged={setUserLogged}/>
      ):
        <Home />
      }
    </div>
  );
}

export default App;
