import React from 'react';
import useLoginFormFunctions from './LoginFormFunctions';
import "./LoginForm.scss";
import Logo from "../../assets/logo.webp";

function UserForm({ setUserLogged, setSelectedUserId }) {
  const { formData, handleRegister, handleInputChange } = useLoginFormFunctions(setUserLogged, setSelectedUserId);

  return (
    <div className='login-form'>
      <img src={Logo} alt="App logo WebPong" />
      <div className="input-container">
        <label htmlFor="nickName">Enter your nickname</label>
        <input
          type="text"
          name="nickName"
          value={formData.nickName}
          onChange={handleInputChange}
          placeholder="Nickname"
        />
      </div>
      <div className="input-container">
        <label htmlFor="background">Enter the board background color</label>
        <input
          type="color"
          name="background"
          value={formData.background}
          onChange={handleInputChange}
          placeholder="Background Color"
        />
      </div>
      <div className="input-container">
        <label htmlFor="discColor">Enter the disc color you want</label>
        <input
          type="color"
          name="discColor"
          value={formData.discColor}
          onChange={handleInputChange}
          placeholder="Disc Color"
        />
      </div>
      <button onClick={handleRegister}>Register</button>

    </div>
  );
}

export default UserForm;