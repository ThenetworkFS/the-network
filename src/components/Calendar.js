import { db } from '../fire'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Button } from 'semantic-ui-react'
import { EventForm } from './'

const uuidv1 = require('uuid/v1')
BigCalendar.momentLocalizer(moment);


class Calendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addIsClicked: false,
      editIsClicked: false,
      events: []
    }
  }

  listen() {
    if (this.unsub) this.unsub()

    this.unsub = db.collection("events")
      .onSnapshot((querySnapshot) => {
        this.setState({
          events: querySnapshot.docs.map(doc => doc.data())
        })
      })
  }

  componentDidMount() {
    this.listen()
  }

  componentWillUnmount() {
    if (this.unsub) this.unsub()
  }

  // React Big Calendar end date is exclusive
  makeDateInclusive = (date) => {
    let tempDate = new Date(date)
    return tempDate.setDate(tempDate.getDate() + 1)
  }

  makeDateExclusive = (date) => {
    let tempDate = new Date(date)
    tempDate.setDate(tempDate.getDate() - 1)
    return new Date(tempDate).toISOString().split('T')[0]
  }

  convertTime = (time) => {
    time = time.split(':');
    var hours = Number(time[0]);
    var minutes = Number(time[1]);
    let timeValue;

    if (hours > 0 && hours <= 12){
      timeValue= "" + hours
    } else if (hours > 12) {
      timeValue= "" + (hours - 12)
    } else if (hours === 0){
      timeValue= "12";
    }
    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;
    timeValue += (hours >= 12) ? " PM" : " AM";
    return timeValue
  }

  onAddEventSubmit = (event) => {
    event.preventDefault()
    this.setState({ addIsClicked: false })
    const convertedTime = this.convertTime(event.target.time.value)
    const title = `${event.target.title.value} | ${convertedTime}`
    const start = event.target.start.value
    const end = event.target.end.value
    
    const userId = this.props.loggedInUser.id
    const id = uuidv1()
    const calendarEvent = {
      title,
      start: this.makeDateInclusive(start),
      end: this.makeDateInclusive(end),
      userId,
      id
    }
    db.collection("events").doc(id).set(calendarEvent)
      .catch(function (error) {
        console.error("Error adding document: ", error);
      })
  }


  onEditEventSubmit = (event, id) => {
    event.preventDefault()
    this.setState({ editIsClicked: false })
    const convertedTime = this.convertTime(event.target.time.value)
    const title = `${event.target.title.value} | ${convertedTime}`
    const start = event.target.start.value
    const end = event.target.end.value
    const userId = this.props.loggedInUser.id
    const calendarEvent = {
      title,
      start: this.makeDateInclusive(start),
      end: this.makeDateInclusive(end),
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

  renderAddEventButton = () => {
    if (!this.state.addIsClicked && !this.state.editIsClicked) {
      return (
        <Button
          onClick={this.addIsClicked}
          floated="left"
          color="blue"
        >
          Add Your Event
        </Button>
      )
    }
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
        <div className="calendar-buttons">
          {this.state.addIsClicked ? (
            <EventForm
              isEditing={false}
              onSubmit={this.onAddEventSubmit}
            />
          ) : (
            <div>
              {this.renderAddEventButton()}
            </div>
          )}
          <div className="edit-event-form-container">
          {this.state.editIsClicked ?
            myEventsList.filter(event => event.userId === user.id).map(calendarEvent => {
              const title = calendarEvent.title.split('|')[0]
              const time = calendarEvent.title.split('|')[1]
              const { start, end, id } = calendarEvent
              const formattedStart = this.makeDateExclusive(start)
              const formattedEnd = this.makeDateExclusive(end)
              return (
                <div className="edit-event-form-inner-container" key={id}>
                  <EventForm
                    isEditing={true}
                    title={title}
                    time={time}
                    start={formattedStart}
                    end={formattedEnd}
                    onSubmit={(evt) => this.onEditEventSubmit(evt, id)}
                    onDelete={(evt) => this.deleteEvent(evt, id)}
                  />
                </div>
              )
            }
          ) : (
            myEventsList.filter(event => event.userId === user.id).length > 0 && !this.state.addIsClicked ? (
              <Button
                onClick={this.editIsClicked}
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
        </div>
      </div>
    )
  }
}


const mapStateToProps = ({ user: { loggedInUser } }) => ({ loggedInUser })

export default connect(mapStateToProps)(Calendar)
