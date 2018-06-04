import React from 'react';
import store from '../store';
import { expect } from 'chai';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Input } from 'semantic-ui-react';
import { SearchCard } from './'

import { AllUsers } from './AllUsers';
const adapter = new Adapter()
enzyme.configure({adapter})


describe('<AllUsers />', () => {
  let allUsers;

  beforeEach(() => {
    allUsers = shallow(
        <AllUsers
          loggedInUser = {{firstName: "Jim", id: "3"}}
          state = {{
            allUsers: [{firstName: "Jane", id: "1"}, {firstName: "John", id: "2"}],
            searchVal: '',
            advancedSearchIsClicked: false,
            cohort: '',
            cohortId: '',
            city: '',
            company: '',
            industry: ''
          }}
        />
    )
  });

  it('renders component', () =>{
    expect(allUsers.exists()).to.equal(true);
  });

  it ('initially renders all users', () => {
    expect(allUsers.containsMatchingElement(<SearchCard key = {1} user = {{firstName: "Jane", id: 1}}/>)).to.equal(true);
  });

  it ('initially has empty state ', () => {
    console.log(allUsers.state().allUsers)
      expect(allUsers.state()).to.equal({
        allUsers: [{firstName: "Jane", id: "1"}, {firstName: "John", id: "2"}],
        searchVal: '',
        advancedSearchIsClicked: false,
        cohort: '',
        cohortId: '',
        city: '',
        company: '',
        industry: ''
      });
    });

    // put this in all users
    //can I import the handle change?
    it('updates the state onChange', () => {
      console.log('allUsers', allUsers)
      allUsers.onInputChange.simulate('change', {value: '1801'})
      // expect(allUsers.state().cohort).to.equal('1801')
    })


});
