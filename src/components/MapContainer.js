import React from "react";
import { Map, InfoWindow, Marker } from "google-maps-react";
import { db } from "../fire";

const style = {
  width: "100vw",
  height: "100vh",
  position: "relative"
};

export default class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      isFinished: false,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      zoom: 11
    };
  }

  componentDidMount() {
    let currentComponent = this;
    db
      .collection("users")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          currentComponent.setState({
            users: currentComponent.state.users.concat(doc.data())
          });
        });
        currentComponent.setState({ isFinished: true });
      });
    this.timer = setTimeout(() => {
      this.setState({
        zoom: 14
      })
    }, 2500)
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }


  onMouseoverMarker = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }


  onMouseoutMarker = (e) => {
    this.setState({
      selectedPlace: {},
      activeMarker: {},
      showingInfoWindow: false
    });
  }

  render() {
    if (!window.google) {
      requestAnimationFrame(() => {
        this.setState({ attempt: (this.state.attempt || 0) + 1 })
      })
      return null
    }
    const users = this.state.users;
    return (
      <div>
        {this.state.isFinished ? (
          <div>
            <Map
              google={window.google}
              zoom={this.state.zoom}
              style={style}
              initialCenter={{
                lat: 40.7549,
                lng: -73.984
              }}
            >
              {users.map((user, index) => {
                return (
                  user.workInfo && user.workInfo.coordinates ?
                    <Marker
                      name={user.workInfo.address}
                      title={`${user.firstName} ${user.lastName}`}
                      key={index}
                      position={user.workInfo.coordinates}
                      onMouseover={this.onMouseoverMarker}
                      onMouseout={this.onMouseoutMarker}

                    />
                    : null
                )
              })}
              <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
              >
                <div>
                  <h4>{this.state.selectedPlace.title}</h4>
                  <h4>{this.state.selectedPlace.name}</h4>
                </div>
              </InfoWindow>
            </Map>
          </div>
        ) : null}
      </div>
    )
  }
}

// export default MapContainer;
