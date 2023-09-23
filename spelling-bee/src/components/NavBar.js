import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav>
            <Link to= '/CS361-Spelling-Bee/'>Home</Link>
            <Link to= '/CS361-Spelling-Bee/register'>Register</Link>
            <Link to= '/CS361-Spelling-Bee/login'>Log In</Link>
        </nav>
    )
}

export default NavBar;