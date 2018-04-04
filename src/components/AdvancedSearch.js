import React from 'react'
import { Button, Form, Select } from 'semantic-ui-react'


const AdvancedSearch = (props) => {
  const options = [
    { key: 'GH', text: 'GH', value: 'gh' },
    { key: 'FS', text: 'FS', value: 'fs' },
  ]
  return (
    <div className="advanced-search-container">
      <Form onSubmit={props.onSubmit}>
        <div className="cohort-search-container">
          <Form.Field
            onChange={props.onInputChange}
            control={Select}
            label='Cohort'
            options={options}
            placeholder='Cohort'
            className='cohort'
            name="cohort"
          />
          <Form.Input
            label='Number'
            placeholder='Number'
            onChange={props.onInputChange}
            className='cohort-id'
            name="cohortId"
          />
        </div>
        <select name="state" id="state"
          onChange={props.onInputChange}
          >
          <option value="" selected="selected">State</option>
          <option value="al">Alabama</option>
          <option value="ak">Alaska</option>
          <option value="az">Arizona</option>
          <option value="ar">Arkansas</option>
          <option value="ca">California</option>
          <option value="co">Colorado</option>
          <option value="ct">Connecticut</option>
          <option value="de">Delaware</option>
          <option value="dc">District Of Columbia</option>
          <option value="fl">Florida</option>
          <option value="ga">Georgia</option>
          <option value="hi">Hawaii</option>
          <option value="id">Idaho</option>
          <option value="il">Illinois</option>
          <option value="in">Indiana</option>
          <option value="ia">Iowa</option>
          <option value="ks">Kansas</option>
          <option value="ky">Kentucky</option>
          <option value="la">Louisiana</option>
          <option value="me">Maine</option>
          <option value="md">Maryland</option>
          <option value="ma">Massachusetts</option>
          <option value="mi">Michigan</option>
          <option value="mn">Minnesota</option>
          <option value="ms">Mississippi</option>
          <option value="mo">Missouri</option>
          <option value="mt">Montana</option>
          <option value="ne">Nebraska</option>
          <option value="nv">Nevada</option>
          <option value="nh">New Hampshire</option>
          <option value="nj">New Jersey</option>
          <option value="nm">New Mexico</option>
          <option value="ny">New York</option>
          <option value="nc">North Carolina</option>
          <option value="nd">North Dakota</option>
          <option value="oh">Ohio</option>
          <option value="ok">Oklahoma</option>
          <option value="or">Oregon</option>
          <option value="pa">Pennsylvania</option>
          <option value="ri">Rhode Island</option>
          <option value="sc">South Carolina</option>
          <option value="sd">South Dakota</option>
          <option value="tn">Tennessee</option>
          <option value="tx">Texas</option>
          <option value="ut">Utah</option>
          <option value="vt">Vermont</option>
          <option value="va">Virginia</option>
          <option value="wa">Washington</option>
          <option value="wv">West Virginia</option>
          <option value="wi">Wisconsin</option>
          <option value="wy">Wyoming</option>
        </select>
        <Form.Input
          label='Company'
          placeholder='Company'
          onChange={props.onInputChange}
          name="company"
        />
        <Button
          type='submit'
          floated='right'
          color='blue'
        >
          Search
        </Button>
      </Form>
    </div>
  )
}


export default AdvancedSearch
