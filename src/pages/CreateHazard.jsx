import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import { Divider } from "semantic-ui-react";
import { DateTimeInput } from "semantic-ui-calendar-react";
import { Message } from "semantic-ui-react";
import * as Consts from "./Consts.js";
import "../css/CreateHazard.css";

class CreateHazard extends Component {
  state = {
    username: "",
    hazardType: "",
    hazardSubType: "",
    hazardDetails: "",
    hazardLocation: "",
    hazardLocationText: "",
    hazardFile: "",
    hazardDT: "",
    hazardPublishDT: "",
    hazardRemoveDT: "",
    notifyMunicipality: "",
    anonymousReport: "",
    hazardId: "",
  };

  handleTypeChange = async (e, { value }) =>
    this.setState({ hazardType: value });

  handleSubTypeChange = async (e, { value }) =>
    this.setState({ hazardSubType: value });

  handleLocationChange = async (e, { value }) =>
    this.setState({ hazardLocation: value });

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
        subType: this.state.hazardSubType,
        details: this.state.hazardDetails,
        location: this.state.hazardLocation,
        locationText: this.state.hazardLocationText,
        file: this.state.hazardFile,
        dt: this.state.hazardDT,
        publishDT: this.state.hazardPublishDT,
        removeDT: this.state.hazardRemoveDT,
        notifyMunicipality: this.state.notifyMunicipality,
        anonymousReport: this.state.anonymousReport,
      }),
    });
    const body = await response.text();
    var retText = "hazard not created";
    if (body) {
      retText = body;
    }

    this.setState({ hazardId: retText });
  };

  render() {
    return (
      <Form className="create-hazard-form" onSubmit={this.handleSubmit}>
        <Divider horizontal>*</Divider>
        <Form.Group widths="equal">
          <Form.Select
            fluid
            label="Hazard type"
            options={Consts.HazardTypes}
            placeholder="Hazard type"
            value={this.state.hazardType}
            onChange={this.handleTypeChange}
            //onChange={(e) =>
            //this.setState({ hazardType: e.target.textContent })
            //}
          />
          <Form.Select
            fluid
            label="Road block:"
            options={Consts.RoadblockTypes}
            placeholder="select"
            value={this.state.hazardSubType}
            onChange={this.handleSubTypeChange}
          />
          <Form.Select
            fluid
            label="Road side:"
            options={Consts.RoadsideTypes}
            placeholder="select"
            value={this.state.hazardSubType}
            onChange={this.handleSubTypeChange}
          />
          <Form.Select
            fluid
            label="Lost And Founds:"
            options={Consts.LostAndFoundsTypes}
            placeholder="select"
            value={this.state.hazardSubType}
            onChange={this.handleSubTypeChange}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Select
            fluid
            search
            selection
            label="Location"
            options={Consts.Locations}
            placeholder="Enter hazard location"
            value={this.state.hazardLocation}
            onChange={this.handleLocationChange}
          />
          <Form.Input
            label="OR enter manually"
            fluid
            placeholder="type address"
            value={this.state.hazardLocationText}
            onChange={(e) =>
              this.setState({ hazardLocationText: e.target.value })
            }
          />
        </Form.Group>
        <Form.TextArea
          label="Details"
          placeholder="Tell us more about the hazard..."
          value={this.state.hazardDetails}
          onChange={(e) => this.setState({ hazardDetails: e.target.value })}
        />
        <Divider horizontal>*</Divider>
        <Form.Button
          content="Upload Image or Video"
          labelPosition="left"
          icon="file"
          // onClick={() => this.fileInputRef.current.click()}
        />
        <input
          type="file"
          // ref={this.fileInputRef}
          hidden
        />
        <Divider horizontal>*</Divider>
        <Form.Group inline>
          <label>Hazard time</label>
          <Form.Radio
            label="Now"
            name="hazard_time"
            value="hazard_now"
            // checked={value === "hazard_now"}
            defaultChecked
          />
          <DateTimeInput
            name="hazard_dt"
            placeholder="Select hazard date and time"
            iconPosition="left"
            value={this.state.hazardDT}
            onChange={(e) => this.setState({ hazardDT: e.target.value })}
          />
        </Form.Group>
        <Form.Group inline>
          <label>Publish time</label>
          <Form.Radio
            label="Now"
            value="publish_now"
            name="publish_time"
            // checked={value === "publish_now"}
          />
          <DateTimeInput
            name="publish_dt"
            placeholder="Select publish date and time"
            iconPosition="left"
          />
        </Form.Group>
        <Form.Group inline>
          <label>Remove time</label>
          <Form.Radio
            label="System Default (24 hours)"
            value="remove_default"
            name="remove_time"
            // checked={value === "remove_default"}
          />
          <DateTimeInput
            name="remove_dt"
            placeholder="Select date and time to remove"
            iconPosition="left"
          />
        </Form.Group>
        <Divider horizontal>*</Divider>
        <Form.Checkbox label="Send Alert to local municipality" />
        <Form.Checkbox label="Anonymous report" />
        <Message
          visible
          success
          header="Hazard Created Successfully, New ID:"
          content={this.state.hazardId}
        />{" "}
        <Divider horizontal>*</Divider>
        <Form.Button>Submit</Form.Button>
      </Form>
    );
  }
}

export default CreateHazard;
