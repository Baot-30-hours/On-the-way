import React, { useState, useEffect } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import "../css/HazardList.css";
import * as Consts from "./Consts.js";
import { useNavigate } from "react-router-dom";
import { Button, Image } from "semantic-ui-react";

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
    return arr.find((hazard) => hazard.value === subType).text;
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("/api/gethazards");
      const body = await result.json();
      let parsed = JSON.parse(body.hazards.replace(/\\/g, ""));
      let data = [];
      for (let i = 0; i < parsed.length; i++) {
        data.push({
          username:
            parsed[i].anonymousReport === "true"
              ? "Anomymous"
              : parsed[i].username,
          type: Consts.HazardTypes.find(
            (hazard) => hazard.value === parsed[i].type
          ).text,
          subType: getSubTypeDisplayName(parsed[i].type, parsed[i].subType),
          details: parsed[i].details,
          location: Consts.Locations.find(
            (hazard) => hazard.value === parsed[i].location
          )?.text,
          locationText: parsed[i].locationText,
          publishDT: parsed[i].publishDT,
          dt: parsed[i].dt,
          image: (
            <Image
              src={images_url + parsed[i].file1}
              alt="hazard"
              width="100"
              height="100"
              object-fit="cover"
            ></Image>
          ),
          moreDetails: parsed[i]._id,
        });
        setHazards(data);
      }
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
      Header: "User name",
      accessor: "username",
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
      Filter: ({ filter, onChange }) =>
        customFilter({ fieldName: "location", filter, onChange }),
    },
    {
      Header: "Location text",
      accessor: "locationText",
    },
    {
      Header: "publish date time",
      accessor: "publishDT",
    },
    {
      Header: "data time",
      accessor: "dt",
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
