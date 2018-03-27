import { db } from '../fire'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Button, Form, Input } from 'semantic-ui-react'

const uuidv1 = require('uuid/v1')
BigCalendar.momentLocalizer(moment);


class Calendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addIsClicked: false,
      editIsClicked: false,
      isFinished: false,
      events: []
    }
  }


  componentDidMount() {
    let currentComponent = this
    db.collection("events")
      .onSnapshot(function (querySnapshot) {
        querySnapshot.docChanges.forEach((change) => {
          if (change.type === "added") {
            currentComponent.setState({
              events: currentComponent.state.events.concat(change.doc.data())
            });
          }
        });
      })
  }


  handleAddSubmit = (event) => {
    console.log('submitting')
    console.log('TITLE', event.target.title.value);
    console.log("START", event.target.start.value);
    console.log("END", event.target.end.value);
    event.preventDefault()
    this.setState({ addIsClicked: false })
    const title = `${event.target.title.value} | ${event.target.time.value}`
    const startArray = event.target.start.value.split('-')
    const endArray = event.target.end.value.split('-')
    // const start = `${startArray[2]}-${startArray[0]}-${(+startArray[1] + 1)}`
    // const end = `${endArray[2]}-${endArray[0]}-${(+endArray[1] + 1)}`
    const start = event.target.start.value
    const end = event.target.end.value

    const userId = this.props.loggedInUser.id
    const id = uuidv1()
    const calendarEvent = {
      title,
      start,
      end,
      userId,
      id
    }
    console.log('EVENT', calendarEvent)
    db.collection("events").doc(id).set(calendarEvent)
      .catch(function (error) {
        console.error("Error adding document: ", error);
      })
  }


  handleEditSumbit = (event, id) => {
    event.preventDefault()
    this.setState({ editIsClicked: false })
    const title = `${event.target.title.value} | ${event.target.time.value}`
    const startArray = event.target.start.value.split('/')
    const endArray = event.target.end.value.split('/')
    const start = `${startArray[2]}-${startArray[0]}-${(+startArray[1] + 1)}`
    const end = `${endArray[2]}-${endArray[0]}-${(+endArray[1] + 1)}`
    const userId = this.props.loggedInUser.id
    const calendarEvent = {
      title,
      start,
      end
    }
    db.collection("events").doc(id).update(calendarEvent)
      .catch(function (error) {
        console.error("Error updating document: ", error);
      })
    const filtered = this.state.events.filter(e => e.id !== id)
    this.setState({ events: filtered.concat({ title, start, end, id, userId }) })
  }


  deleteEvent = (event, id) => {
    event.preventDefault()
    db
      .collection('events')
      .doc(id)
      .delete()
      .then(() => {
        this.setState({ editIsClicked: false })
      })
      .catch(err => console.error(err))
    const newArray = this.state.events.filter(e => e.id !== id)
    this.setState({ events: newArray })
  }


  addIsClicked = () => {
    this.setState({ addIsClicked: true })
  }


  editIsClicked = () => {
    this.setState({ editIsClicked: true })
  }


  render() {
    const myEventsList = this.state.events
    const user = this.props.loggedInUser
    return (
      <div>
        {(this.state.addIsClicked || this.state.editIsClicked) ? (
          null
        ) : (
          <BigCalendar
            className="calendar"
            ref={ref => this.BigCalendar = ref}
            events={myEventsList}
            style={{ height: "600px", width: "90vw" }}
            defaultDate={new Date()}
          />
        )}
        {this.state.addIsClicked ? (
          <Form onSubmit={this.handleAddSubmit}>
            <div className="event-form">
              <Form.Field>
                <label className="label">Title</label>
                <Input
                  type='text'
                  name="title"
                />
                <label className="label">Time</label>
                <Input
                  type='time'
                  name="time"
                />
                <label className="label">Start Date</label>
                <Input
                  type='date'
                  name="start"
                  placeholder="ex. 04/22/2018"
                />
                <label className="label">End Date</label>
                <Input
                  type='date'
                  name="end"
                  placeholder="ex. 04/23/2018"
                />
                <Button
                  className="feed-newpost-submit-button"
                  color="blue"
                >
                  Add Event
                </Button>
              </Form.Field>
            </div>
          </Form>
          // <form onSubmit={this.handleAddSubmit}>
          //   <h6>Title</h6>
          //   <input
          //     name="title"
          //   />
          //   <h6>Time</h6>
          //   <input
          //     name="time"
          //   />
          //   <h6>State Date</h6>
          //   <input
          //     name="start"
          //     placeholder="ex. 04/22/2018"
          //   />
          //   <h6>End Date</h6>
          //   <input
          //     name="end"
          //     placeholder="ex. 04/23/2018"
          //   />
          //   <div>
          //     <button>Add</button>
          //   </div>
          // </form>
        ) : (
          <Button
            onClick={this.addIsClicked}
            className="feed-newpost-submit-button"
            floated="left"
            color="blue"
          >
            Add Your Events
          </Button>
        )}
        {this.state.editIsClicked ?
          myEventsList.filter(event => event.userId === user.id).map(calendarEvent => {
            const startArray = calendarEvent.start.split('-')
            const endArray = calendarEvent.end.split('-')
            const start = `${startArray[1]}/${(+startArray[2] - 1)}/${startArray[0]}`
            const end = `${endArray[1]}/${(+endArray[2] - 1)}/${endArray[0]}`
            return (
              <div key={calendarEvent.id}>
                <form onSubmit={(event) => this.handleEditSumbit(event, calendarEvent.id)}>
                  <input name="title" defaultValue={calendarEvent.title.split('|')[0]} />
                  <input name="time" defaultValue={calendarEvent.title.split('|')[1]} />
                  <input name="start" defaultValue={start} />
                  <input name="end" defaultValue={end} />
                  <button type="submit">Save</button>
                </form>
                <button onClick={(event) => this.deleteEvent(event, calendarEvent.id)}>Delete</button>
              </div>
            )
          }) : (
            myEventsList.filter(event => event.userId === user.id).length > 0 ? (
              <Button
                onClick={this.editIsClicked}
                className="feed-newpost-submit-button"
                floated="right"
                color="blue"
              >
                Edit Your Events
              </Button>
            ) : (
              null
            )
          )}
      </div>
    )
  }
}


const mapStateToProps = ({ user: { loggedInUser } }) => ({ loggedInUser })


export default connect(mapStateToProps)(Calendar)
