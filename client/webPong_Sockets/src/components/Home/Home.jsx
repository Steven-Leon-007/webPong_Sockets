import React from 'react';
import './Home.scss';
import Header from './Header/Header';
import HomeFunctions from './HomeFunctions';

function Home() {
    const users = HomeFunctions();

    return (
        <div className="home">
            <Header />
            <main>
                <h2>Connected Users:</h2>
                <ul>
                    {users.map((user, index) => (
                        <li key={index}>{user.nickName}</li>
                    ))}
                </ul>
            </main>
        </div>
    );
}

export default Home;
