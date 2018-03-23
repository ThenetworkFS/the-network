import { fire, db } from '../fire'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import React from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
BigCalendar.momentLocalizer(moment);


class Calendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isClicked: false,
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


  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({ isClicked: false })
    const title = `${event.target.title.value} ${event.target.time.value}`
    const startArray = event.target.start.value.split('/')
    const endArray = event.target.end.value.split('/')
    const start = `${startArray[2]}-${startArray[0]}-${(+startArray[1] + 1)}`
    const end = `${endArray[2]}-${endArray[0]}-${(+endArray[1] + 1)}`
    const calendarEvent = {
      title,
      start,
      end
    }
    db.collection("events").add(calendarEvent).then((doc) => {
      db.collection("events").doc(doc.id).update({ id: doc.id })
    })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      })
  }


  addIsClicked = () => {
    this.setState({ isClicked: true })
  }


  render() {
    const myEventsList = this.state.events
    return (
      <div>
        <BigCalendar
          ref={ref => this.BigCalendar = ref}
          events={myEventsList}
          style={{ height: "600px", width: "1200px" }}
        />
        {this.state.isClicked ?
          <form onSubmit={this.handleSubmit}>
            <h6>Title</h6>
            <input
              name="title"
            />
            <h6>Time</h6>
            <input
              name="time"
            />
            <h6>State Date</h6>
            <input
              name="start"
              placeholder="ex. 04/22/2018"
            />
            <h6>End Date</h6>
            <input
              name="end"
              placeholder="ex. 04/23/2018"
            />
            <div>
              <button>Add</button>
            </div>
          </form>
          :
          <button type="submit" onClick={this.addIsClicked}>Add Event</button>
        }
      </div>
    )
  }
}


export default Calendar
