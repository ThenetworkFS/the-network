import React from 'react';
import store from '../store';
import { expect } from 'chai';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BigCalendar from 'react-big-calendar'

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
           editIsClicked: true,
           events: [{name: 'fun party', id: 1}, {name: 'study session', id: 2}]
          }}
        />
    )
  });

  it('renders component', () =>{
    expect(calendar.exists()).to.equal(true);
  });

  it('renders a calendar', () =>{
    expect(calendar.find('BigCalendar').exists()).to.equal(true);
  });

})
