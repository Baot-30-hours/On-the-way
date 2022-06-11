import React, { useState } from "react";
import { Form, Divider, Message } from "semantic-ui-react";
import { DateTimeInput } from "semantic-ui-calendar-react";
import * as Consts from "./Consts.js";
import "../css/CreateHazard.css";

const CreateHazard = () => {
  const [timeInfo, setTimeInfo] = useState({
    hazardDateTimeType: "dt_now",
    publishDateTimeType: "dt_now",
    currentTime: new Date().toLocaleString(),
  });

  const handleTimeInfoChange = (e, { name, value }) =>
    setTimeInfo({ ...timeInfo, [name]: value });

  const [formInfo, setFormInfo] = useState({
    username: "logged_user", // need to take from logged-in user info
    hazardType: "",
    hazardSubType: "",
    hazardDetails: "",
    hazardLocation: "",
    hazardLocationText: "",
    hazardFile: "",
    hazardDT: timeInfo.currentTime,
    hazardPublishDT: timeInfo.currentTime,
    hazardRemoveDT: "",
    notifyMunicipality: false,
    anonymousReport: false,
    //hazardId: "",
  });
  const handleFormInfoChange = (e, { name, value }) =>
    setFormInfo({ ...formInfo, [name]: value });

  const handleCheckedChange = (e, { name, value }) => {
    setFormInfo({ ...formInfo, [name]: !value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/createhazard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formInfo.username,
        type: formInfo.hazardType,
        subType: formInfo.hazardSubType,
        details: formInfo.hazardDetails,
        location: formInfo.hazardLocation,
        locationText: formInfo.hazardLocationText,
        file: formInfo.hazardFile,
        dt: formInfo.hazardDT,
        publishDT: formInfo.hazardPublishDT,
        removeDT: formInfo.hazardRemoveDT,
        notifyMunicipality: formInfo.notifyMunicipality,
        anonymousReport: formInfo.anonymousReport,
      }),
    });
    const body = await response.text();
    if (body) {
      //setFormInfo({ ...formInfo, ["hazardID"]: body });
    }

    //console.log(`Created new hazard with Id: ${formInfo.hazardID}`);
  };

  return (
    <Form className="create-hazard-form" onSubmit={handleSubmit}>
      <Divider horizontal>*</Divider>
      <Form.Group widths="equal">
        <Form.Select
          fluid
          label="Hazard type"
          name="hazardType"
          options={Consts.HazardTypes}
          placeholder="Hazard type"
          onChange={(e, { name, value }) =>
            handleFormInfoChange(e, { name, value })
          }
        />
        {formInfo.hazardType === "roadblock" && (
          <Form.Select
            fluid
            label="Road block:"
            name="hazardSubType"
            options={Consts.RoadblockTypes}
            placeholder="select"
            onChange={(e, { name, value }) =>
              handleFormInfoChange(e, { name, value })
            }
          />
        )}
        {formInfo.hazardType === "roadside" && (
          <Form.Select
            fluid
            label="Road side:"
            name="hazardSubType"
            options={Consts.RoadsideTypes}
            placeholder="select"
            onChange={(e, { name, value }) =>
              handleFormInfoChange(e, { name, value })
            }
          />
        )}
        {formInfo.hazardType === "lostandfounds" && (
          <Form.Select
            fluid
            label="Lost And Founds:"
            name="hazardSubType"
            options={Consts.LostAndFoundsTypes}
            placeholder="select"
            onChange={(e, { name, value }) =>
              handleFormInfoChange(e, { name, value })
            }
          />
        )}
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Select
          fluid
          search
          selection
          label="Location"
          options={Consts.Locations}
          placeholder="Enter hazard location"
          name="hazardLocation"
          onChange={(e, { name, value }) =>
            handleFormInfoChange(e, { name, value })
          }
        />
        <Form.Input
          label="OR enter manually"
          fluid
          placeholder="type address"
          name="hazardLocationText"
          onChange={(e, { name, value }) =>
            handleFormInfoChange(e, { name, value })
          }
        />
      </Form.Group>
      <Form.TextArea
        label="Details"
        placeholder="Tell us more about the hazard..."
        name="hazardDetails"
        onChange={(e, { name, value }) =>
          handleFormInfoChange(e, { name, value })
        }
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
          name="hazardDateTimeType"
          value="dt_now"
          checked={timeInfo.hazardDateTimeType === "dt_now"}
          onChange={(e, { name, value }) =>
            handleTimeInfoChange(e, { name, value })
          }
        />
        <Form.Radio
          label="Set time"
          name="hazardDateTimeType"
          value="dt_set"
          checked={timeInfo.hazardDateTimeType === "dt_set"}
          onChange={(e, { name, value }) =>
            handleTimeInfoChange(e, { name, value })
          }
        />
        {timeInfo.hazardDateTimeType === "dt_set" && (
          <DateTimeInput
            name="hazardDT"
            placeholder="Select hazard date and time"
            iconPosition="left"
            value={formInfo.hazardDT}
            onChange={(e, { name, value }) =>
              handleFormInfoChange(e, { name, value })
            }
          />
        )}
      </Form.Group>
      <Form.Group inline>
        <label>Publish time</label>
        <Form.Radio
          label="Now"
          name="publishDateTimeType"
          value="dt_now"
          checked={timeInfo.publishDateTimeType === "dt_now"}
          onChange={(e, { name, value }) =>
            handleTimeInfoChange(e, { name, value })
          }
        />
        <Form.Radio
          label="Set time"
          name="publishDateTimeType"
          value="dt_set"
          checked={formInfo.publishDateTimeType === "dt_set"}
          onChange={(e, { name, value }) =>
            handleTimeInfoChange(e, { name, value })
          }
        />
        {timeInfo.publishDateTimeType === "dt_set" && (
          <DateTimeInput
            name="hazardPublishDT"
            placeholder="Select publish date and time"
            iconPosition="left"
            value={formInfo.hazardPublishDT}
            onChange={(e, { name, value }) =>
              handleFormInfoChange(e, { name, value })
            }
          />
        )}
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
      <Form.Checkbox
        toggle
        label="Send Alert to local municipality"
        name="notifyMunicipality"
        value={formInfo.notifyMunicipality}
        onClick={(e, { name, value }) =>
          handleCheckedChange(e, { name, value })
        }
      />
      <Form.Checkbox
        toggle
        label="Anonymous report"
        name="anonymousReport"
        value={formInfo.anonymousReport}
        onClick={(e, { name, value }) =>
          handleCheckedChange(e, { name, value })
        }
      />
      <Message
        hidden
        success
        header="Hazard Created Successfully"
        //header="Hazard Created Successfully, New ID:"
        //content={formInfo.hazardId}
      />{" "}
      <Divider horizontal>*</Divider>
      <Form.Button type="submit" color="blue">
        Create
      </Form.Button>
    </Form>
  );
};

export default CreateHazard;
