import { Link } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../context/userContext'; // Update with the actual path
import '../styles/navbar.css';

function NavBar() {
    const { user } = useContext(UserContext);
    
    return (
        <nav className="nav-bar">
            {user ? (
                <>
                    <Link to='/CS361-Spelling-Bee/'>Home</Link>
                    <Link to='/CS361-Spelling-Bee/profile'>Profile</Link>
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