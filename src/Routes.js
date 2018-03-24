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
      <Route path="/users" component={AllUsers} />
      {/* <Route path="/search" component={AllUsers} /> */}
    </Switch>
  )
}


export default Routes
