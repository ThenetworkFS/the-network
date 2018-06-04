import React from 'react';
import store from '../store';
import { expect } from 'chai';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon, { spy } from 'sinon';


import AdvancedSearch from './AdvancedSearch';
const adapter = new Adapter()
enzyme.configure({adapter})

describe('<AdvancedSearch />', () => {
  let advancedSearch;
  let changeSpy = spy();
  let submitSpy = spy();


  beforeEach(() => {
    advancedSearch = shallow(
        <AdvancedSearch
        store={store}
        onInputChange = {changeSpy}
        onSubmit = {submitSpy}
        />)
  });

  it('renders component', () =>{
    expect(advancedSearch.exists()).to.equal(true);
  });

  it('renders cohort input', () => {
    expect(advancedSearch.find(".cohort-search-container").find(".cohort").exists()).to.be.true;
  })

  it('calls onChange function on cohort change', () => {
    advancedSearch.find(".cohort").simulate('change');
    expect(changeSpy.called).to.be.true;
  });

  it('calls onChange with the correct arguments', () => {
    advancedSearch.find(".cohort-search-container").find(".cohort").simulate('change', {value: '1801'})
    expect(changeSpy.calledWith({value: '1801'})).to.be.true
  })

  it('calls onSubmit function on submit', () => {
    advancedSearch.find("Form").simulate('submit');
    expect(submitSpy.called).to.be.true;
  });

});
