import React from 'react';
import store from '../store';
import { expect } from 'chai';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Calendar } from './Calendar';
const adapter = new Adapter()
enzyme.configure({adapter})

describe('<Calendar />', () => {
  let calendar;

  beforeEach(() => {
    calendar = shallow(
        <Calendar
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
    expect(calendar.exists()).to.equal(true);
  });

})
