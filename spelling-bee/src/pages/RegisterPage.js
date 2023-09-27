import { useState, React} from "react";
import axios from 'axios';
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import "../styles/login.css"

export default function RegisterPage() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const registerUser = async (e) => {
        e.preventDefault();
        const {name, email, password} = data;
        try {
            const { data } = await axios.post('/register', {
                name, email, password
            })
            if (data.error) {
                toast.error(data.error);
            } else {
                setData({})
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
