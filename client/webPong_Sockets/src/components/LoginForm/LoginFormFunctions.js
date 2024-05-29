import { useState } from 'react';
import socketManager from '../../socketManager';

function loginFormFunctions(setUserLogged, setSelectedUserId) {
  const [formData, setFormData] = useState({ nickName: '', background: '#ffffff' });
  const [disc, setDisc] = useState(null);

  const userType = socketManager.getAllUsers().length >= 2 ? "viewer" : "player";
  socketManager.getDisc();

  const handleRegister = () => {
    const screenWidth = window.innerWidth;
    const { nickName, background } = formData;
    const newUser = {
      nickName,
      type: userType,
      score: 0,
      board: {
        background,
        width: screenWidth,
        height: 600,
        position: { x: 0, y: 0 }
      },
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
