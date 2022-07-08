import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Divider, Message, Button } from "semantic-ui-react";
import { DateTimeInput } from "semantic-ui-calendar-react";
import * as Consts from "./Consts.js";
import LoadingSpinner from "./LoadingSpinner";
import "../css/LogIn.css";
import "../css/LoadingSpinner.css"
import Map from "./GoogleMap";

const CreateHazard = () => {
  const currentDateAndTime = new Date();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formErrors, setFormErrors] = useState({
    hazardRemoveDT: "",
    hazardPublishDT: "",
  });

  const [timeInfo, setTimeInfo] = useState({
    hazardDateTimeType: "dt_now",
    publishDateTimeType: "dt_now",
    removeDateTimeType: "dt_tomorrow",
    now: currentDateAndTime,
    tomorrow: new Date(
      currentDateAndTime.getTime() + 60 * 60 * 24 * 1000),
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
    hazardFiles: null,
    hazardDT: timeInfo.now,
    hazardPublishDT: timeInfo.now,
    hazardRemoveDT: timeInfo.tomorrow,
    notifyMunicipality: false,
    anonymousReport: false,
    //hazardId: "",
  });
  const handleTimeFormInfoChange = (e, { name, value }) =>{
    console.log(formErrors)
    let currentFormErrors = formErrors;
    switch (name) {
      case "hazardRemoveDT":
      case "hazardPublishDT":
        var valueTime;
        if ((name==="hazardPublishDT" && timeInfo.publishDateTimeType=== "dt_set") ||
            (name==="hazardRemoveDT" && timeInfo.removeDateTimeType=== "dt_set")){
          const splitDateTime=value.split("-")
          const yaerAndTime = splitDateTime[2].split(" ")
          valueTime = new Date(yaerAndTime[0]+"-"+splitDateTime[1]+"-"+ splitDateTime[0]+"T"+ yaerAndTime[1])
        }
        else{
          valueTime = new Date(value)
        }
        if (valueTime.getTime() < currentDateAndTime.getTime()) {
          currentFormErrors[name] = 'error';
        }
        else {
          currentFormErrors[name]="";
        }
        break;
      case "hazdardDT":
        valueTime = new Date(value)
        break;
      default:
        break;
    }
    setFormErrors(currentFormErrors);
    setFormInfo({ ...formInfo, [name]: valueTime });  
  }
  const handleFormInfoChange = (e, { name, value }) =>{
     setFormInfo({ ...formInfo, [name]: value });  
  }

  const handleCheckedChange = (e, { name, value }) => {

    setFormInfo({ ...formInfo, [name]: !value });
  };

  const handleFileChange = (e) => {
    setFormInfo({ ...formInfo, ["hazardFiles"]: e.target.files });
  };

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );
  
  const handleSubmit = async (e) => {
    setIsLoading(true);
   
    await delay(500);
    e.preventDefault();

    const data = new FormData();

    data.append("username", formInfo.username);
    data.append("type", formInfo.hazardType);
    data.append("subType", formInfo.hazardSubType);
    data.append("details", formInfo.hazardDetails);
    data.append("location", formInfo.hazardLocation);
    data.append("locationText", formInfo.hazardLocationText);
    data.append("dt", formInfo.hazardDT);
    data.append("publishDT", formInfo.hazardPublishDT);
    data.append("removeDT", formInfo.hazardRemoveDT);
    data.append("notifyMunicipality", formInfo.notifyMunicipality);
    data.append("anonymousReport", formInfo.anonymousReport);

    if (formInfo.hazardFiles != null) {
      for (var i = 0; i < formInfo.hazardFiles.length; i++) {
        data.append("file", formInfo.hazardFiles[i]);
      }
    }

    await fetch("/api/createhazard", {
      method: "POST",
      headers: {
        // "Content-Type": "multipart/form-data;",
        //Accept: "application/json",
      },
      body: data,
    });

    // 👇️ redirect to /hazardlist
    navigate("/hazardlist");
  };

  return (
    <div className="log-in">
           
      <Form>
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
        <Form.Input
          type="file"
          label="Upload up to 5 images/videos:"
          name="hazardFiles"
          accept="image/*,.mp4"
          multiple
          onChange={(e) => handleFileChange(e)}
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
                handleTimeFormInfoChange(e, { name, value })
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
            checked={timeInfo.publishDateTimeType === "dt_set"}
            onChange={(e, { name, value }) =>
              handleTimeInfoChange(e, { name, value })
            }
          />
          {timeInfo.publishDateTimeType === "dt_set" && (
            <DateTimeInput
              name="hazardPublishDT"
              className={formErrors && formErrors.hazardPublishDT ? 'form-control error' : 'form-control'}
              placeholder="Select publish date and time"
              iconPosition="left"
              value={formInfo.hazardPublishDT}
              onChange={(e, { name, value }) =>
                handleTimeFormInfoChange(e, { name, value })
              }
            />
          )}
        </Form.Group>
        <Form.Group inline>
          <label>Remove time</label>
          <Form.Radio
            label="Default (24 hours)"
            value="dt_tomorrow"
            name="removeDateTimeType"
            checked={timeInfo.removeDateTimeType === "dt_tomorrow"}
            onChange={(e, { name, value }) =>
              handleTimeInfoChange(e, { name, value })
            }
          />
          <Form.Radio
            label="Set time"
            name="removeDateTimeType"
            value="dt_set"
            checked={timeInfo.removeDateTimeType === "dt_set"}
            onChange={(e, { name, value }) =>
              handleTimeInfoChange(e, { name, value })
            }
          />
          {timeInfo.removeDateTimeType === "dt_set" && (
            <DateTimeInput
              className={formErrors && formErrors.hazardRemoveDT ? 'form-control error' : 'form-control'}
              name="hazardRemoveDT"
              placeholder="Select date and time to remove"
              iconPosition="left"
              value={formInfo.hazardRemoveDT}
              onChange={(e, { name, value }) =>
                handleTimeFormInfoChange(e, { name, value })
              }
            />
          )}
        </Form.Group>
        {formErrors.hazardRemoveDT !== "" && timeInfo.removeDateTimeType === "dt_set" && (
          <Message
            icon= "exclamation"
            header = "Error"
            content = "Remove time should be in the future."
          />
          )}
        {formErrors.hazardPublishDT !== "" && timeInfo.publishDateTimeType === "dt_set"&& (
          <Message
            icon= "exclamation"
            header = "Error"
            content = "Publish time should now or be in the future."
          />
          )}

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
        <Divider horizontal>*</Divider>
        {isLoading ? <LoadingSpinner /> :
        <Button
          fluid
          type="submit"
          color="blue"
          disabled={
            isLoading||
            !formInfo.hazardType ||
            formErrors.hazardRemoveDT || 
            formErrors.hazardPublishDT ||
            (formInfo.hazardType !== "other" && !formInfo.hazardSubType) ||
            (formInfo.hazardFiles !== null && formInfo.hazardFiles.length > 5)
          }
          onClick={handleSubmit}
        >
          Create
        </Button>
        }
      </Form>
    </div>
  );
};

export default CreateHazard;
