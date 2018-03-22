import { Route, Switch } from 'react-router-dom'
import React from 'react'
import { Signup, Login, Home, UserProfile, AllUsers, SearchResults, AdvancedSearch, EditProfile } from './components'


const Routes = () => {
    return (
        <Switch>
            <Route exact path="/home/:category" component={Home} />
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile/:id" component={UserProfile} />
            <Route exact path="/profile/:id/edit" component={EditProfile} />
            <Route exact path="/allUsers" component={AllUsers} />
            <Route exact path="/search" component={SearchResults} />
            <Route exact path="/advancedSearch" component={AdvancedSearch} />
        </Switch>
    )
}


export default Routes
