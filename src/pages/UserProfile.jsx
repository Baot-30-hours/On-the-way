import ReactTable from "react-table-v6";
import Avatar from '@mui/material/Avatar';
import {React, useState, useNavigate} from 'react';
import "../css/UserProfille.css";
import { Form, Divider, Button } from "semantic-ui-react";
import {getActiveUser} from "../GlobalFunctions"
import { columns } from "./hazardsColumnsList";


export const UserProfile = () => {
  const user = getActiveUser();
  const [userUpdatesInfo, UpdateUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleUpdate = (e, { name, value }) =>
      UpdateUserInfo({ ...userUpdatesInfo, [name]: value });

  const changeProfileImage = (event) => {
    user.setState({ uploadedFile: event.target.files[0] });
  };

  const handleUpdateProfile = async (e) => {
    const response = await fetch("/api/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        originalEmail: user.email,
        firstName: userUpdatesInfo.firstName,
        lastName: userUpdatesInfo.lastName,
        email: userUpdatesInfo.email,
      }),
    });
    const body = await response.text();
    console.log(body);
  };

    return (
      <div className="log-in">
        "User Profile": {user && user.firstName },
        <Form >
        <Divider horizontal>*</Divider>
        <h1>User Profile</h1>
        <Divider horizontal>*</Divider>
        <Form.Group widths="equal">
        <Avatar
            alt={user.firstName}
            src="/static/images/avatar/2.jpg"
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            label="First Name"
            fluid
            placeholder={user.firstName} 
            name="firstName"
            onChange={(e, { name, value }) =>
            handleUpdate(e, { name, value })
          }
          />
          <Form.Input
            label="Last Name"
            fluid
            placeholder={user.lastName} 
            name="lastName"
            onChange={(e, { name, value }) =>
            handleUpdate(e, { name, value })
          }
          />
        </Form.Group>
        <Form.Input
            fluid
            label='Email address *'
            name='email'
            id='email'
            type='email'
            placeholder={user.email}
            onChange={(e, { name, value }) =>
            handleUpdate(e, { name, value })
          }
          />
        <Divider horizontal>*</Divider>
        <Form.Input
          type="file"
          label="Upload your profile picture"
          name="hazardFiles"
          accept=".jpg"
          onChange={(e) => changeProfileImage(e)}
        />
        <Divider horizontal>*</Divider>
        <Button 
        fluid
        type="submit" 
        color="blue"
        onClick={handleUpdateProfile}>
          Update profile
        </Button>
      </Form> 
    </div>
    );
  }

export default UserProfile;


// <ReactTable
//         data={this.getUserHazards()}
//         columns={columns}
//         filterable={true}
//         showPagination={false}
//         defaultPageSize={10}
//         style={{ padding: 40 }}
//       />