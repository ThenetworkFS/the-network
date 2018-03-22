import React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { db } from "../fire";
import firebase from "firebase";

const style = {
  width: "100%",
  height: "100%",
  position: "relative"
};


export class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      isFinished: false,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
    this.onMouseoverMarker= this.onMouseoverMarker.bind(this)
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
  
     
    onMouseoverMarker(props, marker, e){
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
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
            lat: 40.7549,
            lng: -73.9840
          }}
        >
        { users.map((user, index) => {
          return (
          user.workInfo ?
                <Marker
                  name={user.workInfo.address}
                  key={index}
                  position= {user.workInfo.coordinates}
                  onMouseover={this.onMouseoverMarker}
                />
                : null
          )
        })}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
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
