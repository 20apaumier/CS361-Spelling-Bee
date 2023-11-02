import { useState, useContext, React} from "react";
import axios from 'axios';
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../context/userContext";
import "../styles/LoginPage.css"

export default function RegisterPage() {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    // used to manage user registration data
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const registerUser = async (e) => {
        e.preventDefault();
        const {name, email, password} = data;
        try {
            // post request to register user
            const { data } = await axios.post('/register', {
                name, email, password
            })
            if (data.error) {
                toast.error(data.error);
            } else {
                // if the login in successful, set user context and clear data
                setUser(data);
                setData({})
                // show a success message then navigate to the home page of the app
                toast.success('Login Successful. Welcome!')
                navigate('/CS361-Spelling-Bee/')
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='login-container'>
          <form className='login-form' onSubmit={registerUser}>
            <div className="login-title">Register</div>
            <input type='text' placeholder='Name' value={data.name} onChange={(e) => setData({...data, name: e.target.value})} />
            <input type='email' placeholder='Email' value={data.email} onChange={(e) => setData({...data, email: e.target.value})} />
            <input type='password' placeholder='Password' value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />
            <button type='submit'>Submit</button>
          </form>
        </div>
    );
}
