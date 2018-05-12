import React from 'react';
import store from '../store';
import { expect } from 'chai';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

import {UserProfile} from './UserProfile';
const adapter = new Adapter()
enzyme.configure({adapter})


describe('<UserProfile />', () => {
  let userProfile;

  beforeEach(() => {
    userProfile = shallow(
        <UserProfile
        store={store}
        selectedUser={{
          city: "NY",
          cohort :"FS",
          cohortId:"1801",
          company:"Lyft",
          country:"USA",
          id: "12345",
          image: "https://firebasestorage.googleapis.com/v0/b/thenetwork-8d967.appspot.com/o/userImages%2Fkwood%40yahoo.com%2Fconnor.jpeg?alt=media&token=e802b67c-fea2-445c-9e42-d49f9c6e04ff",
          email:"bethcbarnes@outlook.com",
          firstName:"Beth",
          lastName:"Barnes",
          interests:"Cats, Coffee, Coding, JavaScript",
          state:"NY"}}

        loggedInUser={{
          firstName: 'Beth',
          lastName: 'Barnes',
          email: 'bethcbarnes@outlook.com',
          id: "12345"}} />
    )
  });

  it('renders component', () =>{
      expect(userProfile.exists()).to.equal(true);
    });

  // it('renders the users image if exists', () =>{
  //   expect(userProfile.find(".user-profile-image").exists()).to.equal(true);

  //   expect(userProfile.containsMatchingElement(<img
  //     alt="user"
  //     src="https://firebasestorage.googleapis.com/v0/b/thenetwork-8d967.appspot.com/o/userImages%2Fkwood%40yahoo.com%2Fconnor.jpeg?alt=media&token=e802b67c-fea2-445c-9e42-d49f9c6e04ff"
  //     className="user-profile-image"
  //   />)).to.equal(true);
  // });

  // it('renders the users first and last name', () =>{
  //   expect(userProfile.containsAllMatchingElements([
  //     <Header>Beth Barnes</Header>,
  //   ])).to.equal(true)
  // });

  // it('renders the users email if exists', () =>{
  //   expect(userProfile.find(".user-profile-header")
  //   .containsAllMatchingElements([
  //     <a>bethcbarnes@outlook.com</a>,
  //   ])).to.equal(true);
  // });

  // it('renders link to edit profile if logged in user is on their own page', () =>{

  //   expect(userProfile.find(".user-profile-edit-link")
  //   .exists()).to.equal(true);

  //   expect(userProfile.containsMatchingElement(<Link
  //     className="user-profile-edit-link"
  //     to="/profile/12345/edit"
  //     >edit profile
  //   </Link>)).to.equal(true);

  // });

});
