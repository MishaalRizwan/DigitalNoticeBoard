import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const localizer = momentLocalizer(moment);

function CalendarPage() {
  const [myEvents, setMyEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventStart, setEventStart] = useState(new Date());
  const [eventEnd, setEventEnd] = useState(new Date());
  const [eventImage, setEventImage] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('myEvents')) || [];
    setMyEvents(storedEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem('myEvents', JSON.stringify(myEvents));
  }, [myEvents]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEventImage(URL.createObjectURL(file));
    }
  };

  const handleAddEvent = () => {
    if (!isEditing) {
      const newEvent = {
        id: myEvents.length + 1,
        title: eventTitle,
        description: eventDescription,
        start: new Date(eventStart),
        end: new Date(eventEnd),
        image: eventImage,
      };
      setMyEvents([...myEvents, newEvent]);
    } else {
      const updatedEvents = myEvents.map((event) =>
        event.id === selectedEvent.id
          ? { ...event, title: eventTitle, description: eventDescription, start: new Date(eventStart), end: new Date(eventEnd), image: eventImage }
          : event
      );
      setMyEvents(updatedEvents);
      setIsEditing(false);
    }

    setShowModal(false);
    setEventTitle('');
    setEventDescription('');
    setEventStart(new Date());
    setEventEnd(new Date());
    setEventImage(null);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setEventTitle(event.title);
    setEventDescription(event.description);
    setEventStart(new Date(event.start));
    setEventEnd(new Date(event.end));
    setEventImage(event.image);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDeleteEvent = () => {
    const updatedEvents = myEvents.filter((event) => event.id !== selectedEvent.id);
    setMyEvents(updatedEvents);
    setShowModal(false);
  };

  const CustomAgendaEvent = ({ event }) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: 2 }}>
          <strong>{event.title}</strong> <br />
          {event.description && <p>{event.description}</p>}
        </div>
        <div style={{ flex: 1 }}>
          {event.image && (
            <img
              src={event.image}
              alt="Event"
              style={{ maxWidth: '100px', height: 'auto' }}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
   <Button
  onClick={() => {
    setShowModal(true);
    setIsEditing(false);
  }}
  style={{
    background: 'linear-gradient(90deg, #4A90E2, #357ABD)', // shades of blue
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    cursor: 'pointer',
    borderRadius: '30px',
    marginBottom: '20px',
    float: 'right',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  }}
  onMouseEnter={(e) => {
    e.target.style.transform = 'scale(1.05)';
    e.target.style.boxShadow = '0px 6px 15px rgba(0, 0, 0, 0.3)';
  }}
  onMouseLeave={(e) => {
    e.target.style.transform = 'scale(1)';
    e.target.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.2)';
  }}
>
  <FontAwesomeIcon icon={faPlus} />
  Create
</Button>

      {/* Modal for adding/updating an event */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Event' : 'Add New Event'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Event Title</Form.Label>
              <Form.Control
                type="text"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                placeholder="Enter event title"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Event Description</Form.Label>
              <Form.Control
                as="textarea"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                placeholder="Enter event description"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Start Date & Time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={moment(eventStart).format('YYYY-MM-DDTHH:mm')}
                onChange={(e) => setEventStart(new Date(e.target.value))}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>End Date & Time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={moment(eventEnd).format('YYYY-MM-DDTHH:mm')}
                onChange={(e) => setEventEnd(new Date(e.target.value))}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type="file" onChange={handleImageUpload} />
              {eventImage && (
                <div style={{ marginTop: '10px' }}>
                  <img
                    src={eventImage}
                    alt="Event"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </div>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {isEditing && (
            <Button variant="danger" onClick={handleDeleteEvent}>
              Delete Event
            </Button>
          )}
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddEvent}>
            {isEditing ? 'Update Event' : 'Create Event'}
          </Button>
        </Modal.Footer>
      </Modal>

      <Calendar
        localizer={localizer}
        events={myEvents.map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }))}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100% - 100px)', width: '100%' }}
        onSelectEvent={handleEventClick}
        components={{
          agenda: {
            event: CustomAgendaEvent,
          },
        }}
        eventPropGetter={() => ({
          style: {
            backgroundColor: 'lightblue',
            color: 'black',
            borderRadius: '4px',
            border: 'none',
            padding: '5px',
          },
        })}
      />
    </div>
  );
}

export default CalendarPage;
