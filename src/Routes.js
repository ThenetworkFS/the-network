import { withRouter, Route, Switch } from 'react-router-dom'
import React from 'react'
import { Signup, Login, Home, UserProfile, AllUsers, EditProfile } from './components'


const Routes = () => {
    return (
        <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile/:id" component={UserProfile} />
            <Route exact path="/profile/edit" component={EditProfile} />
            <Route exact path="/allUsers" component={AllUsers} />
        </Switch>
    )
}


export default Routes
