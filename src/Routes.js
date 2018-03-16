import { withRouter, Route, Switch } from 'react-router-dom'
import React from 'react'
import { Signup, Login, Home } from './components'

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={Signup} />
        </Switch>
    )
}

export default Routes