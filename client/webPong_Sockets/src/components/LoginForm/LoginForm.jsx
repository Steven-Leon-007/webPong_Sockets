import React, { useState } from 'react';

function UserForm({ onRegister }) {
    const [formData, setFormData] = useState({
        nickName: '',
        background: '',
        //Here we must take user's window width, but later on
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="nickName" placeholder="Nickname" onChange={handleChange} />
            <input name="background" placeholder="Background" onChange={handleChange} />
            <button type="submit">Play</button>
        </form>
    );
}

export default UserForm;
