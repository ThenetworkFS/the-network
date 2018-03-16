import React from 'react'
import { Link } from 'react-router-dom'
import { fire, db } from '../fire'



const UserProfile = () => {

  db.collection("users").add({
    first: "John",
    last: "Dude",
    born: 1500
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});

  return (
    <div>
      <h1>User Profile</h1>
      <nav>

      </nav>
    </div>
  )
}


export default UserProfile
