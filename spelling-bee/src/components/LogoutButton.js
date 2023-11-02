import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';

// This was changed to a Link in order to maintain formality in the navbar
// The logout button (Link) is now in the navbar

function LogoutButton() {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    // function to log out the user and clear the cookies then navigate to login screen
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8000/logout');
            setUser(null); // Set user to null in user context
            // Clear token cookie
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            navigate('/CS361-Spelling-Bee/login');
        } catch (error) {
            console.error('Error during logout', error);
        }
    };

    return (
        <Link onClick={handleLogout} >Logout</Link>
    );
}

export default LogoutButton;