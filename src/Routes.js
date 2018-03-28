import { Route, Switch } from "react-router-dom";
import React from "react";
import {
  HomepageLayout,
  Signup,
  Login,
  Home,
  UserProfile,
  AllUsers,
  AdvancedSearch,
  EditProfile,
  MapContainer,
  Calendar,
  MentorForm,
  PostSearch,
  EventForm,
} from "./components";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomepageLayout} />
      <Route exact path="/home/:category" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/profile/:id" component={UserProfile} />
      <Route exact path="/profile/:id/edit" component={EditProfile} />
      <Route exact path="/advancedSearch" component={AdvancedSearch} />
      <Route exact path="/map" component={MapContainer} />
      <Route exact path="/calendar" component={Calendar} />
      <Route exact path="/mentor" component={MentorForm}/>
      <Route path="/users" component={AllUsers} />
      <Route path="home/postSearch" component={PostSearch} />
    </Switch>
  );
};

export default Routes;
