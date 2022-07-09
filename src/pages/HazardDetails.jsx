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
  columns.push({ accessor: "file5" });

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
          ></Image>
        )
      ) : (
        ""
      ),
    },
  ];

  return (
    <div>
      <Grid style={{ padding: 30, overflow: "auto" }}>
        <Grid.Row>
          <Grid.Column>
            <Item.Group divided>
              <Item key={formInfo.hazard._id}>
                <Item.Content>
                  <Item.Header style={{ color: "blue" }}>
                    {formInfo.hazard.details}
                  </Item.Header>
                  <Item.Meta>
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
                  <Item.Description>
                    <b>When: </b>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {Moment(formInfo.hazard.dt).format("DD/MM/YY HH:mm")}
                  </Item.Description>
                  <Item.Description>
                    <b>Published:</b> &nbsp;&nbsp;&nbsp;
                    {Moment(formInfo.hazard.publishDT).format("DD/MM/YY HH:mm")}
                  </Item.Description>
                  <Item.Description>
                    <b>Published By:</b> &nbsp;&nbsp;&nbsp;
                    {formInfo.hazard.anonymousReport === "true" && (
                      <span>Anomymous</span>
                    )}
                    {formInfo.hazard.anonymousReport !== "true" && (
                      <span>{formInfo.hazard.username}</span>
                    )}
                  </Item.Description>
                  {formInfo.hazard.anonymousReport !== "true" && (
                    <Item.Description>
                      <b>Contact Details:</b> &nbsp;&nbsp;&nbsp;
                      <span>
                        <i>---TO BE COMPLETED---</i>
                      </span>
                    </Item.Description>
                  )}

                  <Item.Extra>
                    <Icon name="map marker alternate" />
                    {GlobalFunctions.getLocationDisplayName(
                      formInfo.hazard.location
                    )}{" "}
                    {/* - {formInfo.hazard.locationText} */}
                    <Map detailsLocation={formInfo.hazard.locationText} detailsPage={true} />
                  </Item.Extra>
                  {formInfo.hazard.notifyMunicipality === "true" && (
                    <Item.Meta>
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
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <div style={{ width: 750, overflow: "auto" }}>
              <ReactTable
                showPagination={false}
                defaultPageSize={1}
                columns={columns}
                data={files}
                style={{ width: 1050 }}
              ></ReactTable>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Button
              content="Back To List"
              color="blue"
              icon="left arrow"
              onClick={() => navigate("/hazardlist")}
            ></Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default HazardDetails;
