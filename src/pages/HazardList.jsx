import React, { useState, useEffect } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import "../css/HazardList.css";
import * as Consts from "./Consts.js";
import { useNavigate } from "react-router-dom";
import { Button, Image } from "semantic-ui-react";
import Moment from "moment";

const images_url = "http://localhost:5000/public/uploaded/";

const HazardList = () => {
  //const [formInfo, setFormInfo] = useState({ hazards: [] });
  const [hazards, setHazards] = useState([]);
  const navigate = useNavigate();

  const getSubTypeDisplayName = (type, subType) => {
    let arr = [];
    switch (type) {
      case "roadblock":
        arr = Consts.RoadblockTypes;
        break;
      case "roadside":
        arr = Consts.RoadsideTypes;
        break;
      case "lostandfounds":
        arr = Consts.LostAndFoundsTypes;
        break;
      default:
        return subType;
    }
    return arr.find((hazard) => hazard.value === subType)?.text;
  };

  useEffect(() => {
    const fetchData = async () => {
      const currentDateAndTime = new Date();
      const result = await fetch("/api/gethazards");
      const body = await result.json();
      let parsed = JSON.parse(body.hazards.replace(/\\/g, ""));
      let data = [];
      for (let i = 0; i < parsed.length; i++) {
        const removeTime = new Date(parsed[i].removeDT).getTime();
        const publishTime = new Date(parsed[i].publishDT).getTime();
        const currentTime = currentDateAndTime.getTime();
        if (removeTime > currentTime && publishTime <= currentTime) {
          data.push({
            userEmail:
              parsed[i].anonymousReport === "true"
                ? "Anomymous"
                : parsed[i].userEmail,
            type: Consts.HazardTypes.find(
              (hazard) => hazard.value === parsed[i].type
            ).text,
            subType: getSubTypeDisplayName(parsed[i].type, parsed[i].subType),
            details: parsed[i].details,
            location: parsed[i].location,
            //locationText: parsed[i].locationText,
            publishDT: Moment(parsed[i].publishDT).format("DD/MM/YY HH:mm"),
            dt: Moment(parsed[i].dt).format("DD/MM/YY HH:mm"),
            image: parsed[i].file1 ? (
              <Image
                src={images_url + parsed[i].file1}
                height="100"
                object-fit="cover"
              ></Image>
            ) : (
              "<<no image>>"
            ),
            moreDetails: parsed[i]._id,
          });
          setHazards(data);
        }
      }
      setHazards(data);
    };
    fetchData();
  }, []);

  function _navigateToDetails(hazardId) {
    const id = hazardId;
    navigate("/hazarddetails", {
      state: {
        id,
      },
    });
  }

  const columns = [
    {
      Header: "User Email",
      accessor: "userEmail",
    },
    {
      Header: "Type",
      accessor: "type",
      Cell: (props) => <span className="number">{props.value}</span>,
      Filter: ({ filter, onChange }) =>
        customFilter({ fieldName: "type", filter, onChange }),
    },
    {
      Header: "Sub type",
      accessor: "subType",
      Filter: ({ filter, onChange }) =>
        customFilter({ fieldName: "subType", filter, onChange }),
    },
    {
      Header: "Details",
      accessor: "details",
    },
    {
      Header: "Location",
      accessor: "location",
      /* Filter: ({ filter, onChange }) =>
        customFilter({ fieldName: "location", filter, onChange }), */
    },
    // {
    //   Header: "Location text",
    //   accessor: "locationText",
    // },
    {
      Header: "Hazard Date",
      accessor: "dt",
    },
    {
      Header: "Publish Date",
      accessor: "publishDT",
    },
    {
      Header: "Image",
      accessor: "image",
    },
    {
      accessor: "moreDetails",
      Cell: (props) => (
        <span>
          {
            /* <a href="/hazarddetails">{props.value}</a> */
            <Button
              basic
              color="blue"
              className="link"
              content="More Details..."
              onClick={() => _navigateToDetails(props.value)}
            ></Button>
          }
        </span>
      ), // Custom cell components!
    },
  ];

  const customFilter = ({ fieldName, filter, onChange }) => {
    return (
      <select
        onChange={(event) =>
          onChange(event.target.value === "all" ? "" : event.target.value)
        }
        style={{ width: "100%" }}
        value={filter ? filter.value : "all"}
      >
        <option value="all">Show All</option>
        {hazards
          .map((item) => item[fieldName])
          .filter((item, i, s) => s.lastIndexOf(item) === i)
          .map(function (value) {
            return (
              <option key={value} value={value}>
                {value}
              </option>
            );
          })}
      </select>
    );
  };

  return (
    <div>
      <ReactTable
        data={hazards}
        columns={columns}
        filterable={true}
        showPagination={false}
        defaultPageSize={10}
        style={{ padding: 40 }}
        defaultFilterMethod={(filter, row, column) => {
          const id = filter.pivotId || filter.id;
          return row[id] !== undefined
            ? String(row[id]).includes(filter.value)
            : true;
        }}
      />
    </div>
  );
};

export default HazardList;
