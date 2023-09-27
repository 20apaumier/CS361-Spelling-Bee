import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import LogoutButton from '../components/LogoutButton';
import '../styles/profilepage.css';

function ProfilePage() {

    const navigate = useNavigate();
    const {user} = useContext(UserContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/CS361-Spelling-Bee/`);
    };

    return (
        <div className="container">
            <h1>User Profile</h1>
            {!!user && (<h2>Hi {user.name}!</h2>)}
            <form onSubmit={handleSubmit}>
                <button type="submit" className="button" aria-label="Navigate to main menu">Main Menu</button>
            </form>
            <LogoutButton className="logoutButton"/>
        </div>
    );
}

export default ProfilePage;