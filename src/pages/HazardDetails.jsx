import React, { useState, useEffect } from "react";
import { Item, Button, Icon, Grid, Image, Embed } from "semantic-ui-react";
import "../css/LogIn.css";
import { useNavigate, useLocation } from "react-router-dom";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import * as GlobalFunctions from "../GlobalFunctions.js";
import Moment from "moment";
import Map from "./GoogleMap";

const images_url = "http://localhost:5000/public/uploaded/";

const HazardDetails = () => {
  const navigate = useNavigate();
  const params = useLocation();
  const hazardId = params.state.id;

  const [formInfo, setFormInfo] = useState({
    hazard: {},
  });

  useEffect(() => {
    fetch("/api/gethazards?hazardId=" + hazardId)
      .then((response) => response.json())
      .then((data) =>
        setFormInfo({
          ...formInfo,
          ["hazard"]: JSON.parse(data.hazards.replace(/\\/g, "")),
        })
      );
  }, []);

  const isVideo = (fileName) => {
    var retVal = false;
    var extPos = fileName.lastIndexOf(".");
    var ext = fileName.substr(extPos + 1);
    if (ext.toUpperCase() === "mp4".toUpperCase()) {
      retVal = true;
    }
    return retVal;
  };

  const columns = [];
  columns.push({ accessor: "file1" });
  columns.push({ accessor: "file2" });
  columns.push({ accessor: "file3" });
  columns.push({ accessor: "file4" });
  //columns.push({ accessor: "file5" });

  const files = [
    {
      file1: formInfo.hazard.file1 ? (
        isVideo(formInfo.hazard.file1) ? (
          <Embed
            autoplay={true}
            //icon="right circle arrow"
            //placeholder="https://react.semantic-ui.com/images/image-21by9.png"
            url={images_url + formInfo.hazard.file1}
            iframe={{
              allowFullScreen: true,
              style: {
                padding: 10,
              },
            }}
            //aspectRatio="21:9"
            //size="large"
            style={{ height: 200 }}
          />
        ) : (
          <Image
            src={images_url + formInfo.hazard.file1}
            height="200"
            object-fit="cover"
            rounded
            centered
          ></Image>
        )
      ) : (
        ""
      ),
      file2: formInfo.hazard.file2 ? (
        isVideo(formInfo.hazard.file2) ? (
          <Embed
            autoplay={true}
            //icon="right circle arrow"
            //placeholder="https://react.semantic-ui.com/images/image-21by9.png"
            url={images_url + formInfo.hazard.file2}
            iframe={{
              allowFullScreen: true,
              style: {
                padding: 10,
              },
            }}
            aspectRatio="21:9"
            size="large"
            style={{ height: 200 }}
          />
        ) : (
          <Image
            src={images_url + formInfo.hazard.file2}
            height="200"
            object-fit="cover"
            rounded
            centered
          ></Image>
        )
      ) : (
        ""
      ),
      file3: formInfo.hazard.file3 ? (
        isVideo(formInfo.hazard.file3) ? (
          <Embed
            autoplay={true}
            //icon="right circle arrow"
            //placeholder="https://react.semantic-ui.com/images/image-21by9.png"
            url={images_url + formInfo.hazard.file3}
            iframe={{
              allowFullScreen: true,
              style: {
                padding: 10,
              },
            }}
            aspectRatio="21:9"
            size="large"
            style={{ height: 200 }}
          />
        ) : (
          <Image
            src={images_url + formInfo.hazard.file3}
            height="200"
            object-fit="cover"
            rounded
            centered
          ></Image>
        )
      ) : (
        ""
      ),
      file4: formInfo.hazard.file4 ? (
        isVideo(formInfo.hazard.file4) ? (
          <Embed
            autoplay={true}
            //icon="right circle arrow"
            //placeholder="https://react.semantic-ui.com/images/image-21by9.png"
            url={images_url + formInfo.hazard.file4}
            iframe={{
              allowFullScreen: true,
              style: {
                padding: 10,
              },
            }}
            aspectRatio="21:9"
            size="large"
            style={{ height: 200 }}
          />
        ) : (
          <Image
            src={images_url + formInfo.hazard.file4}
            height="200"
            object-fit="cover"
            rounded
            centered
          ></Image>
        )
      ) : (
        ""
      ),

      file5: formInfo.hazard.file5 ? (
        isVideo(formInfo.hazard.file5) ? (
          <Embed
            autoplay={true}
            //icon="right circle arrow"
            //placeholder="https://react.semantic-ui.com/images/image-21by9.png"
            url={images_url + formInfo.hazard.file5}
            iframe={{
              allowFullScreen: true,
              style: {
                padding: 10,
              },
            }}
            aspectRatio="21:9"
            size="large"
            style={{ height: 200 }}
          />
        ) : (
          <Image
            src={images_url + formInfo.hazard.file5}
            height="200"
            object-fit="cover"
            rounded
            centered
          ></Image>
        )
      ) : (
        ""
      ),
    },
  ];

  return (
    <div>
      <Grid style={{ paddingLeft: 30, width: 1470 }}>
        <Grid.Row>
          <Grid.Column style={{ width: 600 }}>
            <Item.Group divided>
              <Item key={formInfo.hazard._id}>
                <Item.Content>
                  <Item.Header
                    style={{ color: "green", paddingBottom: 20, fontSize: 25 }}
                  >
                    {formInfo.hazard.details}
                  </Item.Header>
                  <Item.Meta style={{ paddingBottom: 20, fontSize: 20 }}>
                    <span>
                      {
                        /* Consts.HazardTypes.find(
                          (hazard) => hazard.value === formInfo.hazard.type
                        ).text */
                        GlobalFunctions.getTypeDisplayName(formInfo.hazard.type)
                      }
                    </span>
                    {formInfo.hazard.type !== "other" && (
                      <span>
                        <span>/</span>
                        <span>
                          {GlobalFunctions.getSubTypeDisplayName(
                            formInfo.hazard.type,
                            formInfo.hazard.subType
                          )}
                        </span>
                      </span>
                    )}
                  </Item.Meta>
                  <Item.Description style={{ paddingBottom: 5, fontSize: 15 }}>
                    <b>When: </b>
                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {Moment(formInfo.hazard.dt).format("DD/MM/YY HH:mm")}
                  </Item.Description>
                  <Item.Description style={{ paddingBottom: 5, fontSize: 15 }}>
                    <b>Published:</b>
                    &emsp;&emsp;&emsp;&emsp;&emsp;
                    {Moment(formInfo.hazard.publishDT).format("DD/MM/YY HH:mm")}
                  </Item.Description>
                  <Item.Description style={{ paddingBottom: 5, fontSize: 15 }}>
                    <b>Published By:</b>
                    &emsp;&emsp;&emsp;&nbsp;&nbsp;
                    {formInfo.hazard.anonymousReport === "true" && (
                      <span>Anonymous</span>
                    )}
                    {formInfo.hazard.anonymousReport !== "true" && (
                      <span>
                        {formInfo.hazard.firstName}&nbsp;
                        {formInfo.hazard.lastName}
                      </span>
                    )}
                  </Item.Description>
                  {formInfo.hazard.anonymousReport !== "true" && (
                    <Item.Description style={{ fontSize: 15 }}>
                      <table>
                        <tr>
                          <td valign="top" width="157px;">
                            <b>Contact Details:</b>
                          </td>
                          <td>
                            <div>{formInfo.hazard.phone}</div>
                            <div>{formInfo.hazard.userEmail}</div>
                          </td>
                        </tr>
                      </table>
                    </Item.Description>
                  )}
                  {formInfo.hazard.notifyMunicipality === "true" && (
                    <Item.Meta style={{ paddingTop: 20, fontSize: 15 }}>
                      <span>
                        <b>
                          <i>* Notified local municipality </i>
                        </b>
                      </span>
                    </Item.Meta>
                  )}
                </Item.Content>
              </Item>
            </Item.Group>
          </Grid.Column>
          <Grid.Column>
            <Item.Extra style={{ fontSize: 15, width: 800 }}>
              <Icon name="map marker alternate" />
              {formInfo.hazard.location}
            </Item.Extra>
            <Map
              detailsLocation={formInfo.hazard.location}
              detailsPage={true}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row
          style={{
            align: "left",
            borderWidth: 2,
            borderStyle: "solid",
            borderColor: "green",
          }}
        >
          <Grid.Column style={{ width: 1600 }}>
            <Item.Extra>
              <div style={{ width: 1400, overflow: "none" }}>
                <ReactTable
                  showPagination={false}
                  defaultPageSize={1}
                  columns={columns}
                  data={files}
                  style={{ width: 1410 }}
                ></ReactTable>
              </div>
            </Item.Extra>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column style={{ textAlign: "left" }}>
            <Button
              content="Back To List"
              color="green"
              icon="left arrow"
              onClick={() => navigate("/hazardlist")}
              style={{ fontSize: 15 }}
            ></Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default HazardDetails;
