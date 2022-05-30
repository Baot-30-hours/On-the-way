import React from "react";


export default class FetchData extends React.Component {
    // https://www.youtube.com/watch?v=T3Px88x_PsA
    state = {
        streets: []
    };

    async componentDidMount() {
        this.getData()
            .then((res) => this.setState({ response: res.data }))
            .catch((err) => console.log(err));
    };

    getData = async() => {
        const url = "https://api.tel-aviv.gov.il/gis/Layer?layerCode=680";
        const response = await fetch(url); //this function is async
        const data = await response.json();
        if (response.status !== 200) throw Error(data.message);
        this.setState({streets: data.features})
        console.log(data.features);
        return data
    }

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

    User = ({ name }) => (
        <div>
            <div>
                <p>{name}</p>
            </div>
        </div>
    );

    render() {
        return (
            <div>
                {JSON.stringify(this.state.streets[0])}
        </div>)
    }
}
