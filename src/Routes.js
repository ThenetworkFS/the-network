import { Route, Switch } from 'react-router-dom'
import React from 'react'
import { Signup, Login, Home, UserProfile, AllUsers, EditProfile, MapContainer, Calendar, MentorForm} from './components'


const Routes = () => {
  return (
    <Switch>
      <Route exact path="/home/:category" component={Home} />
      <Route exact path="/" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/profile/:id" component={UserProfile} />
      <Route exact path="/profile/:id/edit" component={EditProfile} />
      <Route path="/users" component={AllUsers} />
      <Route exact path="/map" component={MapContainer} />
      <Route exact path="/calendar" component={Calendar} />
      <Route exact path="/mentor" component={MentorForm}/>
    </Switch>
  )
}


export default Routes
