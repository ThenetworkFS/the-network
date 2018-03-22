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
      users: [],
      isFinished: false
    };
  }



  componentDidMount(){
    let currentComponent = this;
    db.collection("users").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          currentComponent.setState({
            users: currentComponent.state.users.concat(doc.data())
          });
      });
      currentComponent.setState({isFinished: true})
  });
    }


  render() {
    const users = this.state.users;
    console.log('users', this.state)
    return (
      <div>
      { this.state.isFinished ?
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
          { users.map((user, index) => {
            return (
            user.workInfo ?
                  <Marker
                    name={"Job"}
                    key={index}
                    position= {user.workInfo.coordinates}
                  />
                  : null
            )
          })}
        </Map>
      </div>
        : null }
        </div>
    );
  }
}



export default GoogleApiWrapper({
  apiKey: "AIzaSyDbroKDMDh0wHknE4B2wZk41pvvHAd1CSc"
})(MapContainer);
