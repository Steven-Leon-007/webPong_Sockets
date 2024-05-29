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
        <label htmlFor="nickName">Enter a nickname</label>
        <input
          type="text"
          name="nickName"
          value={formData.nickName}
          onChange={handleInputChange}
          placeholder="Nickname"
        />
      </div>
      <div className="input-container">
        <label htmlFor="background">Enter the background color you want to use</label>
        <p> {formData.background}</p>
        <input
          type="color"
          name="background"
          value={formData.background}
          onChange={handleInputChange}
          placeholder="Background"
        />
      </div>
      <button onClick={handleRegister}>Play</button>
    </div>
  );
}

export default UserForm;
