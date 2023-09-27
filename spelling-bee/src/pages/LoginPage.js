import { useState, useContext, React} from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import '../styles/login.css'
import { UserContext } from '../context/userContext';

export default function LoginPage() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: '',
        password: '',
    });
    const { setUser } = useContext(UserContext);

    const loginUser = async (e) => {
        e.preventDefault();
        const {email, password } = data;
        console.log('email: ', email);
        console.log('password: ', password);
        try {
            const {data} = await axios.post('/login', {
                email,
                password
            });
            if (data.error) {
                toast.error(data.error)
                console.log('error logging in: ', data.error)
            } else {
                console.log("logging in, setting data to {} and navigating to home page.")
                setUser(data);
                setData({});
                navigate('/CS361-Spelling-Bee/')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="login-container">
          <form className="login-form" onSubmit={loginUser}>
            <div className="login-title">Log In</div>
            <input type='email' placeholder="Email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
            <input type='password' placeholder="Password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
            <button type='submit'>Submit</button>
          </form>
        </div>
      );
}
