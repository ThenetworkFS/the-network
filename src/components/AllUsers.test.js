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

  // it ('initially has exmpty state ', () => {
  //     expect(allUsers.state().exists()).to.be(true);
  //   });


});
