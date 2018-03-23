import React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { db } from "../fire";


const style = {
  width: "30%",
  height: "70%",
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
    this.onMouseoutMarker= this.onMouseoutMarker.bind(this)
  }


  componentDidMount(){
    let currentComponent = this;
    db.collection("users").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
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


    onMouseoutMarker(e){
      this.setState({
        selectedPlace: {},
        activeMarker: {},
        showingInfoWindow: false
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
          user.workInfo && user.firstName !== 'Beth' ?
                <Marker
                  name={user.workInfo.address}
                  title={`${user.firstName} ${user.lastName}`}
                  key={index}
                  position= {user.workInfo.coordinates}
                  onMouseover={this.onMouseoverMarker}
                  onMouseout={this.onMouseoutMarker}
                />
                : null
          )
        })}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h4>{this.state.selectedPlace.title}</h4>
              <h4>{this.state.selectedPlace.name}</h4>
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
