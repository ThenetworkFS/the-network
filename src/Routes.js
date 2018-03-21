import { withRouter, Route, Switch } from 'react-router-dom'
import React from 'react'
import { Signup, Login, Home, UserProfile, AllUsers, SearchResults} from './components'

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile" component={UserProfile} />
            <Route exact path="/allUsers" component={AllUsers} />
            <Route exact path="/search" component={SearchResults} />
        </Switch>
    )
}

export default Routes
