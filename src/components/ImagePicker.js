import React from 'react'
import { fire, db } from '../fire'
import { connect } from 'react-redux'
import firebase from 'firebase'
import Dropzone from 'react-dropzone'


class ImagePicker extends React.Component {
  constructor(props) {
    super(props)
    this.onDrop = this.onDrop.bind(this)
  }


  onDrop(acceptedFiles, rejectedFiles) {
    const user = this.props.loggedInUser;
    const storageRef = firebase.storage().ref();
    const imagesRef = storageRef.child(`userImages/${user.email}/${acceptedFiles[0].name}`);
    imagesRef.put(acceptedFiles[0])
      .then(() => {
        db.collection('users').doc(user.email).update({ image: `userImages/${user.email}/${acceptedFiles[0].name}` })
      });
  }


  render() {
    let dropzoneRef;
    return (
      <div>
        <Dropzone ref={(node) => { dropzoneRef = node; }} onDrop={this.onDrop}>
          <p>Drop files here.</p>
        </Dropzone>
        <button type="button" onClick={() => { dropzoneRef.open() }}>Open File Dialog</button>
      </div>
    )
  }
}


const mapStateToProps = ({ user: { loggedInUser }}) => ({ loggedInUser })

export default connect(mapStateToProps)(ImagePicker)
