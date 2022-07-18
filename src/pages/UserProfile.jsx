import ReactTable from "react-table-v6";
import Avatar from '@mui/material/Avatar';
import {React, useState, useNavigate} from 'react';
import "../css/UserProfille.css";
import { Form, Divider, Button } from "semantic-ui-react";
import {getActiveUser, setUserInSession} from "../GlobalFunctions"
import { columns } from "./hazardsColumnsList";


export const UserProfile = () => {
  const user = getActiveUser();
  const [userUpdatesInfo, UpdateUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    imageUrl: "/static/images/avatar/2.jpg",
  });

  const handleUpdate = (e, { name, value }) =>
      UpdateUserInfo({ ...userUpdatesInfo, [name]: value });

  // const changeProfileImage = (event) => {
  //   user.setState({ uploadedFile: event.target.files[0] });
  // };

  const changeProfileImage = (e) => {
    UpdateUserInfo.imageUrl = e;
  };
  const data = new FormData();
  data.append("ProfileImage", userUpdatesInfo.ProfileImage);
  data.append("originalEmail", user.email);
  data.append("firstName", userUpdatesInfo.firstName);
  data.append("lastName", userUpdatesInfo.lastName);
  data.append("email", userUpdatesInfo.email);

  const handleUpdateProfile = async (e) => {
    setUserInSession(userUpdatesInfo.firstName);
    const response = await fetch("/api/update", {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: data
    });
    const body = await response.text();
    console.log(body);
  };

    return (
      <div className="log-in">
        <Form >
        <Divider horizontal>*</Divider>
        <h1>User Profile</h1>
        <Avatar
            alt={user.firstName}
            src={userUpdatesInfo?.imageUrl} //user.imageUrl : "/static/images/avatar/2.jpg"}
            onChange={(e, {name, value}) => changeProfileImage(value)}
          />
        <Divider horizontal>*</Divider>
        <Form.Group widths="equal">
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
            fluid
            label='image url'
            name='imageUrl'
            id='imageUrl'
            type='text'
            placeholder="https://placekitten.com/200/300"
            onChange={(e, { name, value }) =>
            handleUpdate(e, { name, value })
          }
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