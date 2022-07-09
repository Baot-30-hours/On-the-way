import React, { useState } from 'react';
import { Form, Divider, Button, Checkbox } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import '../css/LogIn.css';
import { useEffect } from 'react';

const LogIn = () => {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({});

  const handleFormInfoChange = (e, { name, value }) =>
    setUserInfo({ ...userInfo, [name]: value });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let currentFormErrors = formErrors;
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value || value.length < 3 || value.length > 20 ||
          !value.match(/^[a-zA-Z-]+$/)) {
          currentFormErrors[name] = `${e.target.placeholder} should have number of characters between 3-20 and include only letters and dash (-) Log`;
        }
        else delete currentFormErrors[name];
        break;
      case 'nickName':
        if (value.length > 20) {
          currentFormErrors[name] = `${e.target.placeholder} should have maximum length of 20 characters`;
        }
        else delete currentFormErrors[name];
        break;
      case 'email':
        const regex = RegExp(/^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        if (!regex.test(value)) {
          currentFormErrors[name] = `email should have the pattern of your@domain.com`;
        }
        else delete currentFormErrors[name];
        break;
      case 'password':
        if (!value || value.length < 5 || value.length > 20 ||
          !value.match(/^[a-zA-Z0-9!@#$%^&*()]+$/)) {
          currentFormErrors[name] = `${e.target.placeholder} should have number of characters between 5-20 and include only letters, numbers and special carachters above the numbers.`;
        }
        else delete currentFormErrors[name];
        break;
      case 'repeatPassword':
        if (!value || value !== userInfo.password) {
          currentFormErrors[name] = `This password should be equal to the password from the previous field`;
        }
        else delete currentFormErrors[name];
        break;
      default:
        break;
    }
    setFormErrors(currentFormErrors);
    if (e.target.checked) setUserInfo({ ...userInfo, [e.target.name]: e.target.checked });
    else setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('userInfo', userInfo);
    const response = await fetch("/api/adduser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        nickName: userInfo.nickName,
        email: userInfo.email,
        city: userInfo.city,
        password: userInfo.password,
        repeatPassword: userInfo.repeatPassword
      }),
    });
    const body = await response.text();
    if (body) {
      console.log(`user ${userInfo.firstName} was inserted to the DB with id ${body}`);
    }
  };

  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    const userObject = jwtDecode(response.credential)
    console.log(userObject);
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "316960033546-4pnd0l53bbrj3u8qq3q9hpcn530dt96e.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })
    google.accounts.id.renderButton(
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
            disabled={
              !userInfo.email
              || !userInfo.password}
            onClick={handleSubmit}>Log In</Button>
        </Form>
      </div>
    </div>
  );
}

export default LogIn;