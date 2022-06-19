import React, { useState, useEffect } from 'react';
import { Form, Divider, Button, Checkbox } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import '../css/CreateUser.css';

const FormCreateUser = () => {
  const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '', nickName: '', email: '', city: '', password: '', repeatPassword: '', terms: false });
  const [formErrors, setFormErrors] = useState({});
  const [cities, setCities] = useState([]);

  const handleFormInfoChange = (e, { name, value }) =>
  setUserInfo({ ...userInfo, [name]: value });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let currentFormErrors = formErrors;
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value || value.length < 3 || value.length > 20 ||
          !value.match(/^[a-zA-Z-]+$/)){
          currentFormErrors[name] = `${e.target.placeholder} should have number of characters between 3-20 and include only letters and dash (-) sign`;
        }
        else delete currentFormErrors[name];
        break;
      case 'nickName':
        if (value.length > 20){
          currentFormErrors[name] = `${e.target.placeholder} should have maximum length of 20 characters`;
        }
        else delete currentFormErrors[name];
        break;
      case 'email':
        const regex = RegExp(/^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        if (!regex.test(value)){
          currentFormErrors[name] = `email should have the pattern of your@domain.com`;
        }
        else delete currentFormErrors[name];
        break;
      case 'password':
        if (!value || value.length < 5 || value.length > 20 ||
          !value.match(/^[a-zA-Z0-9!@#$%^&*()]+$/)){
          currentFormErrors[name] = `${e.target.placeholder} should have number of characters between 5-20 and include only letters, numbers and special carachters above the numbers.`;
        }
        else delete currentFormErrors[name];
        break;
      case 'repeatPassword':
        if(!value || value !== userInfo.password) {
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

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("https://data.gov.il/api/3/action/datastore_search?resource_id=d4901968-dad3-4845-a9b0-a57d027f11ab&limit=100000");
      const body = await result.json();
      const cities = body.result.records;
      const newCities = [];
      for(let i in cities){
        newCities.push({ key: i, text: cities[i].שם_ישוב, value: cities[i].שם_ישוב });
      }
      setCities(newCities);
    };

    fetchData();
  }, []);

  return (
    <Form className='wrapper'>
      <Divider horizontal>*</Divider>
      <Form.Group widths='equal'>
        {/* אותיות ומקף ואורך 20*/}
        <Form.Input
          fluid
          className={formErrors && formErrors.lastName ? 'form-control error' : 'form-control'}
          label='First name *'
          name='firstName'
          id='firstName'
          placeholder='First name'
          type='text'
          // value={userInfo.firstName}
          onChange={(e) => handleChange(e)}
        />
        {formErrors && formErrors.firstName && <span className='error'>{formErrors.firstName}</span>}
        <br />
        {/* אותיות ומקף ואורך 30*/}
        <Form.Input
          fluid
          className={formErrors && formErrors.lastName ? 'form-control error' : 'form-control'}
          label='Last name *'
          name='lastName'
          if='lastName'
          type='text'
          placeholder='Last name'
          onChange={(e) => handleChange(e)}
        />
        {formErrors && formErrors.lastName && <span className='error'>{formErrors.lastName}</span>}
        <br />
      </Form.Group>
      {/* אורך 20 */}
      <Form.Input
        fluid
        className={formErrors && formErrors.nickName ? 'form-control error' : 'form-control'}
        label='Nickname'
        name='nickName'
        id='nickName'
        type='text'
        placeholder='nickname'
        onChange={(e) => handleChange(e)}
      />
      {formErrors && formErrors.nickName && <span className='error'>{formErrors.nickName}</span>}
      <br />
      <Form.Input
        fluid
        label='Email address *'
        name='email'
        id='email'
        type='email'
        placeholder='you.email@example.com'
        onChange={(e) => handleChange(e)}
      />
      {formErrors && formErrors.email && <span className='error'>{formErrors.email}</span>}
        <br />
      {/* external api */}
      <Form.Select
        fluid
        label='City'
        name='city'
        id='city'
        options={cities}
        placeholder='city'
        onChange={(e, { name, value }) =>
            handleFormInfoChange(e, { name, value })
          }
      />
      {/* אותיות מספרים ותווים מיוחדים (מעל המספרים) מינימום 5 מקסימום 20 */}
      <Form.Input
        label='Password *'
        name='password'
        id='password'
        type='password'
        placeholder='password'
        onChange={(e) => handleChange(e)}
      />
      {formErrors && formErrors.password && <span className='error'>{formErrors.password}</span>}
        <br />
      {/* זהה לסיסמא שמעל */}
      <Form.Input
        label='Reapet password *'
        name='repeatPassword'
        id='repeatPassword'
        type='password'
        placeholder='repeat password'
        onChange={(e) => handleChange(e)}
      />
      {formErrors && formErrors.repeatPassword && <span className='error'>{formErrors.repeatPassword}</span>}
        <br />
      <Checkbox
        label='Clicking the button I confirm the use of the Terms and Conditions'
        name='terms'
        onChange={(e) => handleChange(e)}
        id='terms' />

      <Divider horizontal>*</Divider>
      <Button
        fluid
        color="blue"
        type="submit"
        disabled={!userInfo.firstName
          || !userInfo.lastName
          || !userInfo.nickName
          || !userInfo.email
          || !userInfo.city
          || !userInfo.password
          || !userInfo.repeatPassword
          || !userInfo.terms}
        onClick={handleSubmit}>Submit</Button>

      <Link to='/TBD'>Already have an account? Click here to sign in</Link>
    </Form>
  );
}

export default FormCreateUser;
