import React from "react";
// https://www.pluralsight.com/guides/iterate-through-a-json-response-in-jsx-render-for-reactjs

const Info = ({ streetAddress, fromStreet, toStreet, jobDesctiprion }) => (
    <div>
      <div>
        <p>{streetAddress}</p>
        <p>{fromStreet}</p>
        <p>{toStreet}</p>
        <p>{jobDesctiprion}</p>
      </div>
    </div>
  );

export default class FetchData extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            streets_info: [],
        };
    
        this.GetStreetData = this.GetStreetData.bind(this);
      }

    async componentDidMount() {
        const streets_info = await this.GetStreetData();
        this.setState({ streets_info });
      }

    async GetStreetData() {
        const url = "https://api.tel-aviv.gov.il/gis/Layer?layerCode=680";
        const response = await fetch(url); //this function is async
        const data = await response.json();
        const data_features = data.features
        console.log(data_features)
        return data_features
    };

   

        render() {
            return (
              <div>
                {this.state.streets_info.map((info) => (
                  <Info
                  streetAddress={JSON.stringify(info.attributes.ktovet)}
                  fromStreet={JSON.stringify(info.attributes.me_rechov)}
                  toStreet={JSON.stringify(info.attributes.add_rechov)}
                  jobDesctiprion={JSON.stringify(info.attributes.pirtai_avoda)}
                  />
                ))}
              </div>
            );
          }
}
