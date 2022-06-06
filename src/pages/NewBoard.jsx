import React from "react";


export default class FetchData extends React.Component {
    // https://www.youtube.com/watch?v=T3Px88x_PsA
    state = {
        streets: []
    };

    async componentDidMount() {
        this.getData()
            .then((res) => this.setState({ response: res.data.features }))
            .catch((err) => console.log(err));
    };

    getData = async() => {
        const url = "https://api.tel-aviv.gov.il/gis/Layer?layerCode=680";
        const response = await fetch(url); //this function is async
        const data = await response.json();
        if (response.status !== 200) throw Error(data.message);
        // const d = data.features[0]
        // console.log(d.attributes.shem_rechov);
        this.setState({streets: data.features})
        return data.features
    };
    const Work = ({ street, from_street, to_street, type_of_work }) => (
        <div>
            <h3>{street}</h3>
            <h3>{from_street}</h3>
            <h3> {to_street} </h3>
            <h3>{type_of_work} </h3>

        </div>
    );
    // async getStreetsData() {
    //     const res = await fetch("https://api.tel-aviv.gov.il/gis/Layer?layerCode=680");
    //     const data = await res.json();
    //     return data.results;
    // }
    //
    // async componentDidMount() {
    //     const streets = await this.getStreetsData();
    //     this.setState({ streets });
    // }
    render() {
        return (
            <div>
                <h1>Road close - Live updates</h1>
                {this.state.streets.map((features) => (
                    <Work
                        street={JSON.stringify(features.attributes.shem_rechov)}
                        from_street={JSON.stringify(features.attributes.me_rechov)}
                        to_street={JSON.stringify(features.attributes.add_rechov)}
                        type_of_work={JSON.stringify(features.attributes.teur_meshulav)}
                    />
                ))}
        </div>)
    }
}
                // <h3>street = {JSON.stringify(this.state.streets[i].shem_rechov)}</h3>
                // <h3>from street = {JSON.stringify(this.state.streets[i].me_rechov)}</h3>
                // <h3> to street = {JSON.stringify(this.state.streets[i].add_rechov)}</h3>
                // <h3>type of work = {JSON.stringify(this.state.streets[i].teur_meshulav)}</h3>
