import { useContext, useEffect, useRef, useState } from 'react';
import { login } from '../productNetwork';
import context from '../services/context';
import { useNavigate } from 'react-router-dom';
import '../css/login.css'
function Login() {

    const { state, setState } = useContext(context);
    const [err, setErr] = useState("");
    const email = useRef();  
    const password = useRef();
    const navigate = useNavigate();
    const handleSubmit = async () => {
        try {
            const obj = { email: email.current.value, password: password.current.value }
            const user = await login(obj);

            if (user.success) {
                localStorage.setItem("user", JSON.stringify(user));
                const tokendata = JSON.parse(localStorage.getItem("user"));
                setState({ ...state, user: user })
            }
            else {
                setErr('Invalid email or password.')
            }
        }
        catch (error) {
            setErr(error);
        }
    };
    useEffect(() => {
        // Use the ref to focus the input when the component mounts
        email.current.focus();
      }, []);
    const handleSignUp = () => {
        navigate("/signup");
    }


    return (
        <div className='login-container '>
           <h1 className="login-heading-with-image">
        <img src="../images/logo.png" alt="Image Description" className="image rotate-image" />
       Login
    </h1>
            <form >
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control input-text"
                        id="email"
                        name="email"
                        ref={email}
                                        />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control input-text"
                        id="password"
                        name="password"
                        ref={password}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className='error'>{err}</label>
                                   </div>
                <div className='btn-container '>
                    <div>
                    <button type="button" onClick={handleSignUp} className='mybtn'> &#22291; Sign up  </button>

                    </div>
                   <div>
                   <button type="button" onClick={handleSubmit} className='mybtn'>&#10003; Login  </button>
             
                   </div>
                
                </div>
              
            </form>
        </div>
    );
}
export default Login;