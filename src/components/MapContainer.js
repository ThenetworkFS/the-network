import React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { db } from "../fire";
import firebase from "firebase";

const style = {
  width: "100%",
  height: "100%"
};

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
  }

  componentDidMount() {
    let currentComponent = this;
    db.collection("users").onSnapshot(function(querySnapshot) {
      querySnapshot.docChanges.forEach(change => {
        if (change.type === "added") {
          currentComponent.setState({
            users: currentComponent.state.users.concat(change.doc.data())
          });
        }
      });
    });
  }

  render() {
    const users = this.state.users;

    return (
      <div>
        <Map
          google={this.props.google}
          zoom={14}
          style={style}
          initialCenter={{
            lat: 40.7128,
            lng: -74.006
          }}
          mapcenter={{
            lat: 40.7128,
            lng: -74.006
          }}
        >
          {users.map(user => {
            return (
            user.workInfo ?
                  <Marker
                    name={"Job"}
                    key={user.id}
                    position={user.workInfo.coordinates}
                  />
                  : null
            )
          })}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDbroKDMDh0wHknE4B2wZk41pvvHAd1CSc"
})(MapContainer);
