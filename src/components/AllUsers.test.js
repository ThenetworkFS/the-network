import React from 'react';
import { expect } from 'chai';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
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
            allUsers: [],
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
      expect(allUsers.state()).to.eql({
        allUsers: [],
        searchVal: '',
        advancedSearchIsClicked: false,
        cohort: '',
        cohortId: '',
        city: '',
        company: '',
        industry: ''
      })
  })


});
