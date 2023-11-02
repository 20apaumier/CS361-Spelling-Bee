import { Link } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import LogoutButton from './LogoutButton';
import '../styles/NavBar.css';

function NavBar({ resetGameState }) {
    const { user } = useContext(UserContext);
    
    // If the user is logged in then show Home, Profile, and Logout in the nav bar
    // If the user is not logged in then show Register and Log In on the nav bar
    return (
        <nav className="nav-bar">
            {user ? (
                <>
                    <Link to='/CS361-Spelling-Bee/' onClick={resetGameState}>Home</Link>
                    <Link to='/CS361-Spelling-Bee/profile' onClick={resetGameState}>Profile</Link>
                    <LogoutButton className = 'nav-item'/>
                </>
            ) : (
                <>
                    <Link to='/CS361-Spelling-Bee/register'>Register</Link>
                    <Link to='/CS361-Spelling-Bee/login'>Log In</Link>
                </>
            )}
        </nav>
    );
}

export default NavBar;