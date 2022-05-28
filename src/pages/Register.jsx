import React, { Component } from 'react';
import { Form, Divider, Button, Checkbox } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import '../css/CreateUser.css';

class FormCreateUser extends Component {
  state = {firstName:'', lastName:'', nickName:'', email:'', city:'', password:'', repeatPassword:'', terms:''};

  handleChange = (e, { value }) => this.setState({ value });

  render() {
    return (
      <Form className='wrapper'>
        <Divider horizontal>*</Divider>
        <Form.Group widths='equal'>
          <Form.Input
            fluid
            label='First name:'
            name='firstName'
            id='firstName'
            placeholder='First name'
            type='text'
            onChange={this.handleOnChange}
          />
          <Form.Input
            fluid
            label='Last name'
            name='lastName'
            if='lastName'
            type='text'
            placeholder='Last name'
            onChange={this.handleOnChange}
          />
        </Form.Group>
        <Form.Input
          fluid
          label='Nickname'
          name='nickName'
          id='nickName'
          type='text'
          placeholder='nickname'
          onChange={this.handleOnChange}
        />
        <Form.Input
          fluid
          label='Email address'
          name='email'
          id='email'
          type='text'
          placeholder='you.email@example.com'
          onChange={this.handleOnChange}
        />
        <Form.Input
          fluid
          label='City'
          name='city'
          id='city'
          type='text'
          placeholder='city'
          onChange={this.handleOnChange}
        />
        <Form.Input
          label='Password'
          name='password'
          id='password'
          type='password'
          placeholder='password'
          onChange={this.handleOnChange}
        />
        <Form.Input
          label='Reapet password'
          name='repeatPassword'
          id='repeatPassword'
          type='password'
          placeholder='repeat password'
          onChange={this.handleOnChange}
        />
        <Checkbox
         label='Clicking the button I confirm the use of the Terms and Conditions'
         name='terms'
         id='terms'
         />
      
      <Divider horizontal>*</Divider>
      <Button
        fluid
        color="blue"
        type="submit"
        disabled= { !this.state.firstName 
          || !this.state.lastName
          || !this.state.nickName
          || !this.state.email
          || !this.state.city
          || !this.state.password
          || !this.state.repeatPassword
          || !this.state.terms}>Submit</Button>
      
      <Link to='/TBD'>Already have an account? Click here to sign in</Link>
      </Form>
    );
  }
}

export default FormCreateUser;
