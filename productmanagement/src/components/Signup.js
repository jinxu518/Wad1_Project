import { useEffect, useRef, useState } from "react";
import { signup } from "../productNetwork";

import { useNavigate } from "react-router-dom";
import '../css/signup.css'
export default function Signup() {
  const email = useRef();
  const password = useRef();
  const repassword = useRef();
  const [errmsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  function isValidPassword(password) {
    if (password.length < 10) {
      return false;
    }

    if (!/[!@#$%^&*()_+{}[\]:;<>,.?~\\]/.test(password)) {
      return false;
    }

    if (!(/[a-z]/.test(password) && /[A-Z]/.test(password))) {
      return false;
    }

    return true;
  }

  useEffect(() => {
    // Use the ref to focus the input when the component mounts
    email.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validpass = isValidPassword(password.current.value);
    if (!validpass) {
      setErrMsg("<ul><li>At least 10 letters or digit</li><li>Must contain at least one special character</li><li>Must have both lower case and upper case letters</li><ul>")
      return;
    }
    if (password.current.value !== repassword.current.value) {
      setErrMsg("Password and Re Password not match!");
      return;
    }
    let user = { email: email.current.value, password: password.current.value };
    const res = await signup(user);
    if (res && res.success) {
      navigate("/");
    }
    else {
      setErrMsg(res&&res.error);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="login-heading-with-image">
        <img src="../images/logo.png" alt="Image Description" className="image rotate-image" />
        User Sign Up
      </h1>
      <form onSubmit={handleSubmit}>
        <table className="regtable">
          <tbody>
            <tr>
              <td width="12%">
                <label htmlFor="email">Email</label>
              </td>
              <td>
                <input
                  className="form-control input-text"
                  type="email"
                  ref={email}
                  name="email"
                  placeholder="Email"
                  required
                />
              </td>
            </tr>

            <tr>
              <td>
                <label htmlFor="password">Password</label>
              </td>
              <td>
                <input
                  className="form-control input-text"
                  type="password"
                  ref={password}
                  name="password"
                  placeholder="password"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="repasswor">Re Password</label>
              </td>
              <td>
                <input
                  className="form-control input-text"
                  type="password"
                  ref={repassword}
                  name="repassword"
                  placeholder="Re password"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                &nbsp;
              </td>
              <td>
                <p style={{ color: 'red' }} dangerouslySetInnerHTML={{ __html: errmsg }} />

              </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td align="right">
                <input type="button" value="Login" className="mybtn" onClick={() => { navigate('/') }} />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <input type="submit" value="Register" className="mybtn" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}
