import React from 'react'
import { Form, Input, Button } from 'semantic-ui-react'

const EventForm = (props) => {
  const { title, time, start, end, onSubmit, onDelete, isEditing } = props
  return (
    <Form onSubmit={onSubmit}>
      <div className="event-form">
        <Form.Field>
          <label className="label">Title</label>
          <Input
            type="text"
            name="title"
            defaultValue={title ? title : ""}
          />
          <label className="label">Time</label>
          <Input
            type="time"
            name="time"
            defaultValue={time ? time : ""}
          />
          <label className="label">Start Date (inclusive)</label>
          <Input
            type="date"
            name="start"
            defaultValue={start ? start : ""}
          />
          <label className="label">End Date (exclusive)</label>
          <Input
            type="date"
            name="end"
            defaultValue={end ? end : ""}
          />
          <div className={isEditing ? "event-buttons-inline" : ""}>
            <Button
              className="event-button"
              color="blue"
            >
              {isEditing ? "Save Changes" : "Add Event"}
            </Button>
            {isEditing ? (
              <Button
                className="event-button"
                color="red"
                onClick={onDelete}
              >
                Delete Event
              </Button>
            ) : (
              null
            )}
          </div>
        </Form.Field>
      </div>
    </Form>
  )
}

export default EventForm