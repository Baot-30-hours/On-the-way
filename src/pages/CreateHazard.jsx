import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import { Divider } from "semantic-ui-react";
import { DateTimeInput } from "semantic-ui-calendar-react";
import * as Consts from "./Consts.js";
import '../css/CreateHazard.css';

class FormCreateHazard extends Component {
  state = {};

  handleChange = (e, { value }) => this.setState({ value });

  render() {
    const { value } = this.state;
    return (
      <Form className='wrapper'>
        <Divider horizontal>*</Divider>
        <Form.Group widths="equal">
          <Form.Select
            fluid
            label="Hazard type"
            options={Consts.HazardTypes}
            placeholder="Hazard type"
          />
          <Form.Select
            fluid
            label="select:"
            options={Consts.RoadblockTypes}
            placeholder="select"
          />
          <Form.Select
            fluid
            label="select:"
            options={Consts.RoadsideTypes}
            placeholder="tyselectpe"
          />
          <Form.Select
            fluid
            label="select:"
            options={Consts.LostAndFoundsTypes}
            placeholder="select"
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
          />
          <Form.Input
            label="OR enter manually"
            fluid
            placeholder="type address"
          />
        </Form.Group>
        <Form.TextArea
          label="Details"
          placeholder="Tell us more about the hazard..."
        />
        <Divider horizontal>*</Divider>
        <Form.Button
          content="Upload Image or Video"
          labelPosition="left"
          icon="file"
          onClick={() => this.fileInputRef.current.click()}
        />
        <input
          ref={this.fileInputRef}
          type="file"
          hidden
          onChange={this.fileChange}
        />
        <Divider horizontal>*</Divider>
        <Form.Group inline>
          <label>Hazard time</label>
          <Form.Radio
            label="Now"
            name="hazard_time"
            value="hazard_now"
            checked={value === "hazard_now"}
            defaultChecked
            onChange={this.handleChange}
          />
          <Form.Radio
            label="Select hazard date and time"
            value="hazard_future"
            name="hazard_time"
            checked={value === "hazard_future"}
            onChange={this.handleChange}
          />
          <DateTimeInput
            name="hazard_dt"
            placeholder="Select hazard date and time"
            value={this.state.dateTime}
            iconPosition="left"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group inline>
          <label>Publish time</label>
          <Form.Radio
            label="Now"
            value="publish_now"
            name="publish_time"
            checked={value === "publish_now"}
            onChange={this.handleChange}
          />
          <Form.Radio
            label="Select publish date and time"
            value="publish_future"
            name="publish_time"
            checked={value === "publish_future"}
            onChange={this.handleChange}
          />
          <DateTimeInput
            name="publish_dt"
            placeholder="Select publish date and time"
            value={this.state.dateTime}
            iconPosition="left"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group inline>
          <label>Remove time</label>
          <Form.Radio
            label="System Default"
            value="remove_default"
            name="remove_time"
            checked={value === "remove_default"}
            onChange={this.handleChange}
          />
          <Form.Radio
            label="Select date and time to remove"
            value="remove_future"
            name="remove_time"
            checked={value === "remove_future"}
            onChange={this.handleChange}
          />
          <DateTimeInput
            name="remove_dt"
            placeholder="Select date and time to remove"
            value={this.state.dateTime}
            iconPosition="left"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Divider horizontal>*</Divider>
        <Form.Checkbox label="Send Alert to local municipality" />
        <Form.Checkbox label="Anonymous report" />
        <Divider horizontal>*</Divider>
        <Form.Button>Submit</Form.Button>
      </Form>
    );
  }
}

export default FormCreateHazard;
