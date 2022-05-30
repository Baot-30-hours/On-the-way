import React, { useState } from 'react';
import { Form, Divider, Button, Checkbox, Flag } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import '../css/CreateUser.css';

const FormCreateUser = () => {
  const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '', nickName: '', email: '', city: '', password: '', repeatPassword: '', terms: false });

  const handleChange = (e) => {
    if (e.target.checked) setUserInfo({ ...userInfo, [e.target.name]: e.target.checked });
    else setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log('userInfo', userInfo);
  };

  return (
    <Form className='wrapper'>
      <Divider horizontal>*</Divider>
      <Form.Group widths='equal'>
        {/* אותיות ומקף ואורך 20*/}
        <Form.Input
          fluid
          label='First name *'
          name='firstName'
          id='firstName'
          placeholder='First name'
          type='text'
          // value={userInfo.firstName}
          onChange={(e) => handleChange(e)}
        />
        {/* אותיות ומקף ואורך 30*/}
        <Form.Input
          fluid
          label='Last name *'
          name='lastName'
          if='lastName'
          type='text'
          placeholder='Last name'
          onChange={(e) => handleChange(e)}
        />
      </Form.Group>
      {/* אורך 20 */}
      <Form.Input
        fluid
        label='Nickname'
        name='nickName'
        id='nickName'
        type='text'
        placeholder='nickname'
        onChange={(e) => handleChange(e)}
      />
      <Form.Input
        fluid
        label='Email address *'
        name='email'
        id='email'
        type='text'
        placeholder='you.email@example.com'
        onChange={(e) => handleChange(e)}
      />
      {/* external api */}
      <Form.Input
        fluid
        label='City'
        name='city'
        id='city'
        type='text'
        placeholder='city'
        onChange={(e) => handleChange(e)}
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
      {/* זהה לסיסמא שמעל */}
      <Form.Input
        label='Reapet password *'
        name='repeatPassword'
        id='repeatPassword'
        type='password'
        placeholder='repeat password'
        onChange={(e) => handleChange(e)}
      />
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
