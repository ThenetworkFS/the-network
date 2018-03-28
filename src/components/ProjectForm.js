import React from 'react'
import { Form, Input, Button } from 'semantic-ui-react'

const ProjectForm = (props) => {
  const { isEditing, title, description, onSubmit } = props
  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <label className="label">Project Name</label>
          <Input
            type='text'
            name="title"
            defaultValue={title ? title : ""}
          />
          <label className="label">Description</label>
          <Input
            type="text"
            name="description"
            defaultValue={description ? description : ""}
          />
          {/* <label className="label">Link</label>
          <Input
            type="text"
            name="link"
            defaultValue={link ? link : ""}
          /> */}
          <Button
            className="user-profile-save-button"
            color="blue"
          >
            {isEditing ? "Save" : "Add Project"}
          </Button>
        </Form.Field>
      </Form>
    </div>
  )
}

export default ProjectForm