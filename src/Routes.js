import { withRouter, Route, Switch } from 'react-router-dom'
import React from 'react'
import { Signup } from './components'

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Signup} />
        </Switch>
    )
}

export default Routes