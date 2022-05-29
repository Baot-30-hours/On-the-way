import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { Divider } from "semantic-ui-react";
import { DateTimeInput } from "semantic-ui-calendar-react";
import * as Consts from "./Consts.js";
import '../css/CreateHazard.css';

const FormCreateHazard = () => {
  const [formInfo, setFormInfo] = useState({
    hazardType: '',
    location: ''
  })

  const handleChange = (e) => setFormInfo(...formInfo, e.target.value);
  const handleSubmit = () => console.log(formInfo);;

  return (
    <Form className='create-hazard-form'>
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
          label="Road block:"
          options={Consts.RoadblockTypes}
          placeholder="select"
        />
        <Form.Select
          fluid
          label="Road side:"
          options={Consts.RoadsideTypes}
          placeholder="tyselectpe"
        />
        <Form.Select
          fluid
          label="Lost And Founds:"
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
      // onClick={() => this.fileInputRef.current.click()}
      />
      <input
        type="file"
        // ref={this.fileInputRef}
        hidden
        onChange={event => handleChange(event)}
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
          onChange={event => handleChange('eventTime', event)}
        />
        <DateTimeInput
          name="hazard_dt"
          placeholder="Select hazard date and time"
          value={formInfo.dateTime ? formInfo.dateTime : ''}
          iconPosition="left"
          onChange={event => handleChange('eventTime', event)}
        />
      </Form.Group>
      <Form.Group inline>
        <label>Publish time</label>
        <Form.Radio
          label="Now"
          value="publish_now"
          name="publish_time"
          // checked={value === "publish_now"}
          onChange={event => handleChange('publishTime', event)}
        />
        <DateTimeInput
          name="publish_dt"
          placeholder="Select publish date and time"
          value={formInfo.dateTime ? formInfo.dateTime : ''}
          iconPosition="left"
          onChange={event => handleChange('publishTime', event)}
        />
      </Form.Group>
      <Form.Group inline>
        <label>Remove time</label>
        <Form.Radio
          label="System Default (24 hours)"
          value="remove_default"
          name="remove_time"
          // checked={value === "remove_default"}
          onChange={event => handleChange('removeTime', event)}
        />
        <DateTimeInput
          name="remove_dt"
          placeholder="Select date and time to remove"
          value={formInfo.dateTime ? formInfo.dateTime : ''}
          iconPosition="left"
          onChange={event => handleChange('removeTime', event)}
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

export default FormCreateHazard;
