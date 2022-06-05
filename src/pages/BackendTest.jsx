import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import { Divider } from "semantic-ui-react";
import "../css/CreateHazard.css";

class BackendTest extends Component {
  state = {
    hazardsList: "",
    username: "",
    hazardType: "",
    hazardDescription: "",
    hazardDetails: "",
  };

  componentDidMount() {
    this.callApi()
      .then((res) => this.setState({ hazardsList: res.hazards }))
      .catch((err) => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/api/gethazards");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/createhazard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        type: this.state.hazardType,
        description: this.state.hazardDescription,
      }),
    });
    const body = await response.text();
    var retText = "hazard not created";
    if (body) {
      retText = body;
    }

    this.setState({ hazardDetails: retText });
  };

  render() {
    return (
      <Form className="create-hazard-form" onSubmit={this.handleSubmit}>
        <Form.Group widths="equal">
          <p>
            <strong>Hazards list:</strong>
          </p>
        </Form.Group>
        <Form.Group widths="equal">
          <p>{this.state.hazardsList}</p>
        </Form.Group>
        <Divider horizontal>*</Divider>
        <Form.Group widths="equal">
          <Form.Input
            type="text"
            label="username:"
            placeholder="type username"
            value={this.state.username}
            onChange={(e) => this.setState({ username: e.target.value })}
          />
          <Form.Input
            type="text"
            label="hazard type:"
            placeholder="type"
            value={this.state.hazardType}
            onChange={(e) => this.setState({ hazardType: e.target.value })}
          />
          <Form.Input
            type="text"
            label="hazard description:"
            placeholder="description"
            value={this.state.hazardDescription}
            onChange={(e) =>
              this.setState({ hazardDescription: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Button type="submit">Create</Form.Button>
        </Form.Group>{" "}
        <Form.Group widths="equal">
          <p>{this.state.hazardDetails}</p>
        </Form.Group>
      </Form>
    );
  }
}

export default BackendTest;
