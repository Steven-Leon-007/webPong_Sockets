import { useState } from 'react';
import socketManager from '../../socketManager';

function loginFormFunctions(setUserLogged) {
  const [formData, setFormData] = useState({ nickName: '', background: '' });
  const screenWidth = window.innerWidth;
  const handleRegister = () => {
    const { nickName, background } = formData;
    const newUser = {
      nickName,
      type: 'viewer',
      score: 0,
      board: {
        background,
        width: 600,
        height: 600,
      },
    };
    socketManager.registerUser(newUser);
    setUserLogged(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return { formData, handleRegister, handleInputChange };
}

export default loginFormFunctions;
