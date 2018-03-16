import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { fire, db } from '../fire'

export default class AllUsers extends Component {

  render() {

    const data = db.collection("users").get();
    console.log('DATA ', data)

    db.collection("users").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        console.log(doc.data())
      });
    })

    return (
      <div>
        <h1>All Users </h1>
      </div>
    )
  }
}
