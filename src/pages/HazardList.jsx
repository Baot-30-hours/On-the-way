import React, { useState, useEffect } from "react";
import {
  Form,
  Container,
  Button,
  Label,
  Item,
  Header,
  Icon,
  Grid,
} from "semantic-ui-react";
import "../css/HazardList.css";

const HazardList = () => {
  const [formInfo, setFormInfo] = useState({
    hazards: [],
  });

  useEffect(() => {
    fetch("/api/gethazards")
      .then((response) => response.json())
      .then((data) =>
        setFormInfo({
          ...formInfo,
          ["hazards"]: JSON.parse(data.hazards.replace(/\\/g, "")),
        })
      );
  }, []);

  return (
    <Form>
      <Header as="h3" content="Hazard List" textAlign="center" />
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Item.Group divided>
                {formInfo.hazards.map((el) => {
                  return (
                    <Item key={el._id}>
                      <Item.Image src="https://www.citypng.com/public/uploads/preview/hazard-symbol-safety-warning-yellow-triangle-icon-transparent-background-11640517956nyvgqtdld3.png"></Item.Image>
                      {/* <Item.Image src={el.file}></Item.Image> */}
                      <Item.Content>
                        <Item.Header as="a">{el.details}</Item.Header>
                        <Item.Meta>
                          <span>
                            <b>Type: </b>
                            {el.type}
                          </span>
                          <span>
                            ,<b> Sub Type: </b>
                            {el.subType}
                          </span>
                        </Item.Meta>
                        <Item.Description>
                          <b>When: </b>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          {el.dt}
                        </Item.Description>
                        <Item.Description>
                          <b>Published:</b> &nbsp;&nbsp;&nbsp;
                          {el.publishDT}
                        </Item.Description>
                        <Item.Extra>
                          <Button floated="right" primary>
                            More Details
                            <Icon name="chevron right" />
                          </Button>
                          {el.anonymousReport === true && (
                            <Label>Anomymous</Label>
                          )}
                          {el.anonymousReport !== true && (
                            <Label>{el.username}</Label>
                          )}
                        </Item.Extra>{" "}
                        <Item.Extra>
                          {" "}
                          <Icon name="map marker alternate" />
                          {el.location} - {el.locationText}
                        </Item.Extra>
                        {el.notifyMunicipality === true && (
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
                  );
                })}
              </Item.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Form>
  );
};

export default HazardList;
