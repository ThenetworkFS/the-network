import React from 'react'
import { Header, Icon } from 'semantic-ui-react'

const ProjectCard = (props) => {
  const { isEditing, title, description, onEditClick, onDeleteClick } = props
  return (
    <div className="user-profile-project-container">
      <Header className="project-title" as="h4">{title}</Header>
      <Header className="project-description" as="h5">{description}</Header>
      {isEditing ? (
        <div className="user-profile-project-buttons-container">
          <div className="user-profile-project-buttons">
            <a
              className="project-button"
              onClick={onEditClick}
              color="blue"
            >
              <Icon name="edit" />
            </a>
            <a
              className="project-button"
              onClick={onDeleteClick}
              color="red"
            >
              <Icon name="trash" />
            </a>
          </div>
        </div>
      ) : (
        null
      )}
    </div>
  )
}

export default ProjectCard