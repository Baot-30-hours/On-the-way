import React, { useState } from 'react';
import { Form, Divider, Button } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import '../css/LogIn.css';
import { useEffect } from 'react';
import { setUserInSession } from '../GlobalFunctions';


export const LogIn = ({setUser}) => {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    if (
      userInfo.email &&
      userInfo.password
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/getUserByEmailAndPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userInfo.email,
        password: userInfo.password,
      }),
    });
    const body = await response.text();
    if (body) {
      const user = JSON.parse(body.replace(/\\/g, ""))
      if(user.error){
        alert(user.error)
      }
      else{//success
        console.log(`user ${user.user.email} exist in the db!`);
        setUserInSession(user.user);
        setDisable(true);
        setUser(user.user.firstName)
        navigate("/");
      }
    }
    else{
      alert("Failed to login with these credentials")
    }
  };

  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    const userObject = jwtDecode(response.credential)
    console.log(userObject);
    setUserInSession({userObject});
    setUser(userObject.given_name)
    navigate("/");
  }

  useEffect(() => {
    /* global google */
    google.accounts?.id.initialize({
      client_id: "316960033546-4pnd0l53bbrj3u8qq3q9hpcn530dt96e.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })
    google.accounts?.id.renderButton(
      document.querySelector(".google"),
      {
        // 'scope': 'profile email',
        'width': 350,
        // 'longtitle': true,
        // 'theme': 'dark'
      })
  }, [])

  return (
    <div className="log-in">
      <h1>Log In</h1>
      <div className="subtitle">Don't have an account? <Link to='/register'>Sign Up</Link></div>
      <div className="form-wrapper">
        <div className="social">
          <div className="social-button google"></div>
        </div>
        <Divider horizontal className="horizontal-divider">Or use your email</Divider>
        <Divider vertical section className="vertical-divider">or</Divider>
        <Form>
          <Form.Input
            fluid
            label='Email address *'
            name='email'
            id='email'
            type='email'
            placeholder='you.email@example.com'
            onChange={(e) => handleChange(e)}
          />
          <Form.Input
            label='password *'
            name='password'
            id='password'
            type='password'
            placeholder='password'
            onChange={(e) => handleChange(e)}
          />
          <Button
            fluid
            color="blue"
            type="submit"
            disabled={disable}
            onClick={handleSubmit}>Log In
            </Button>
        </Form>
      </div>
    </div>
  );
}

// LogIn.propTypes = {
//   setToken: PropTypes.func.isRequired
// }

export default LogIn;