import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import { Divider } from "semantic-ui-react";
import "../css/CreateHazard.css";

class BackendTest extends Component {
  state = {
    response: "",
    post: "",
    responseToPost: "",
  };

  componentDidMount() {
    this.callApi()
      .then((res) => this.setState({ response: res.users }))
      .catch((err) => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/api/getusers");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/finduser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    var retText = "username not found";
    if (body) {
      retText = body;
    }

    this.setState({ responseToPost: retText });
  };

  render() {
    return (
      <Form className="wrapper" onSubmit={this.handleSubmit}>
        <Form.Group widths="equal">
          <p>
            <strong>Users list:</strong>
          </p>
        </Form.Group>
        <Form.Group widths="equal">
          <p>{this.state.response}</p>
        </Form.Group>
        <Divider horizontal>*</Divider>
        <Form.Group widths="equal">
          <Form.Input
            type="text"
            label="Search username:"
            placeholder="type username"
            value={this.state.post}
            onChange={(e) => this.setState({ post: e.target.value })}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Button type="submit">Search...</Form.Button>
        </Form.Group>{" "}
        <Form.Group widths="equal">
          <p>{this.state.responseToPost}</p>
        </Form.Group>
      </Form>
    );
  }
}

export default BackendTest;
