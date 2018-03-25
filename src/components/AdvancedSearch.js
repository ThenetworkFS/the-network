import React from 'react'
import { Button, Form, Select } from 'semantic-ui-react'

const AdvancedSearch = (props) => {
  const options = [
    { key: 'GH', text: 'GH', value: 'GH' },
    { key: 'FS', text: 'FS', value: 'FS' },
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
        <Form.Input
          label='City'
          placeholder='City'
          onChange={props.onInputChange}
          name="city"
        />
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