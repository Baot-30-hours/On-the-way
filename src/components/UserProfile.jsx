import Avatar from '@mui/material/Avatar';
import * as React from 'react';
import "./css/UserProfille.css";
import { Form, Divider, Button } from "semantic-ui-react";



class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      username: this.props.username,
      email: this.props.email,
      profilePic: this.props.profileImage,
      alerts: this.props.alerts,
      uploadedFile: null,
    };
  }

  fetchUserDetails(userId) {
    console.log("get user details from db");
    return;
  }

  changeProfileImage = (event) => {
    this.setState({ uploadedFile: event.target.files[0] });
  };

  UpdateProfileHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log('Update profile')
    formData.append("profileImage", this.state.uploadedFile);
    formData.append("user_id", this.state.user_id);
  }

  componentDidMount() {
    this.fetchUserDetails(this.state.userId);
  }

  render() {
    return (
      <div className="log-in">
        <Form >
        <Divider horizontal>*</Divider>
        <h1>User Profile</h1>
        <Divider horizontal>*</Divider>
        <Form.Group widths="equal">
        <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/2.jpg"
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            label="Full Name"
            fluid
            placeholder="Insert name"
            name="userfullname"
            onChange={(e) => this.state.name}
          />
        </Form.Group>
        <Form.Input
            fluid
            label='Email address *'
            name='email'
            id='email'
            type='email'
            placeholder='you.email@example.com'
            onChange={(e) => this.state.email}
          />
        <Divider horizontal>*</Divider>
        <Form.Input
          type="file"
          label="Upload your profile picture"
          name="hazardFiles"
          accept=".jpg"
          onChange={(e) => this.changeProfileImage(e)}
        />
        <Divider horizontal>*</Divider>
        <Button 
        fluid
        type="submit" 
        color="blue"
        onClick={this.onClick}>
          Update profile
        </Button>
      </Form>
      </div>
    );
  }
}
export default UserProfile;


