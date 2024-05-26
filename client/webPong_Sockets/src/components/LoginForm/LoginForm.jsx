import React from 'react';
import useLoginFormFunctions from './LoginFormFunctions';
import "./LoginForm.scss";

function UserForm({ setUserLogged, setSelectedUserId }) {
  const { formData, handleRegister, handleInputChange } = useLoginFormFunctions(setUserLogged, setSelectedUserId);

  return (
    <div>
      <input
        type="text"
        name="nickName"
        value={formData.nickName}
        onChange={handleInputChange}
        placeholder="Nickname"
      />
      <input
        type="text"
        name="background"
        value={formData.background}
        onChange={handleInputChange}
        placeholder="Background"
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default UserForm;
