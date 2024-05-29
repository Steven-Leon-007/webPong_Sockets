import { useState } from 'react';
import socketManager from '../../socketManager';

function loginFormFunctions(setUserLogged, setSelectedUserId) {
  const [formData, setFormData] = useState({ nickName: '', background: '#ffffff', discColor: '#ff0000' });

  const handleRegister = () => {
    const screenWidth = window.innerWidth;
    const { nickName, background, discColor } = formData;
    const newUser = {
      nickName,
      type: "viewer",
      score: 0,
      board: {
        background,
        width: screenWidth,
        height: 600,
        position: { x: 0, y: 0 }
      },
      discColor
    };
    socketManager.registerUser(newUser);
    setUserLogged(true);
    setSelectedUserId(nickName);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  return { formData, handleRegister, handleInputChange };
}

export default loginFormFunctions;