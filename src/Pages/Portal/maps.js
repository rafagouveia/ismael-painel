import React, {Component} from 'react';
import ReactMapGL,{Marker} from 'react-map-gl';
import Logo from "../../assets/logo-color.png";
class Map extends Component {

    state = {
        viewport: {
            width: 400,
            height: 400,
            latitude: -7.12329,
            longitude: -34.86312,
            zoom: 18
        }
    };

    render() {
        return (
            <ReactMapGL
                {...this.state.viewport}
                onViewportChange={(viewport) => this.setState({viewport})}
                mapboxApiAccessToken="pk.eyJ1IjoicmFmYWdvbWVzIiwiYSI6ImNqdW5tZm04eTFid3MzeW54eW5leXdhZXIifQ.tPlZ-eFwqLKO4NO4T65BIw"


            >
                <Marker latitude={-7.12329} longitude={-34.86312} offsetLeft={-20} offsetTop={-10}>
                    <img src={Logo} width={100} height={100} />
                </Marker>
            </ReactMapGL>
        );
    }
}

export default Map;