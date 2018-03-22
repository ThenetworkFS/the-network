import React from 'react'
import { db } from '../fire'
import { connect } from 'react-redux'
import { storage } from '../fire'
import Dropzone from 'react-dropzone'


class ImagePicker extends React.Component {
  onDrop = (acceptedFiles, rejectedFiles) => {
    const user = this.props.loggedInUser;
    const storageRef = storage.ref();
    const imagesRef = storageRef.child(`userImages/${user.email}/${acceptedFiles[0].name}`);
    imagesRef.put(acceptedFiles[0])
    .then(() => {
      return storage.ref()
      .child(`userImages/${user.email}/${acceptedFiles[0].name}`)
      .getDownloadURL()
      .then(url => {
        return db.collection('users')
        .doc(user.email)
        .update({ image: url })
      })
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
