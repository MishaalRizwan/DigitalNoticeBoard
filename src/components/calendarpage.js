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

  // Load events from local storage and remove old events
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('myEvents')) || [];

    // Filter out events from previous years
    const currentYear = new Date().getFullYear();
    const filteredEvents = storedEvents.filter(event => {
      const eventYear = new Date(event.start).getFullYear();
      return eventYear >= currentYear;
    });

    setMyEvents(filteredEvents);
    localStorage.setItem('myEvents', JSON.stringify(filteredEvents));
  }, []);

  // Save events to local storage when myEvents state changes
  useEffect(() => {
    localStorage.setItem('myEvents', JSON.stringify(myEvents));
  }, [myEvents]);

  // Convert uploaded image to Base64 and store it in state
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setEventImage(reader.result); // Store Base64 in state
      };
    }
  };

  // Add or update an event
  const handleAddEvent = () => {
    if (!isEditing) {
      const newEvent = {
        id: Date.now(),  // Unique ID based on timestamp
        title: eventTitle,
        description: eventDescription,
        start: new Date(eventStart),
        end: new Date(eventEnd),
        image: eventImage, // Now storing Base64
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
    resetForm();
  };

  // Handle event click for editing
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

  // Delete an event
  const handleDeleteEvent = () => {
    const updatedEvents = myEvents.filter((event) => event.id !== selectedEvent.id);
    setMyEvents(updatedEvents);
    setShowModal(false);
  };

  // Reset form fields
  const resetForm = () => {
    setEventTitle('');
    setEventDescription('');
    setEventStart(new Date());
    setEventEnd(new Date());
    setEventImage(null);
  };

  // Custom event display in agenda
  const CustomAgendaEvent = ({ event }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ flex: 2 }}>
        <strong>{event.title}</strong> <br />
        {event.description && <p>{event.description}</p>}
      </div>
      <div style={{ flex: 1 }}>
        {event.image && <img src={event.image} alt="Event" style={{ maxWidth: '100px', height: 'auto' }} />}
      </div>
    </div>
  );

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Button
        onClick={() => {
          setShowModal(true);
          setIsEditing(false);
        }}
        style={{
          background: 'linear-gradient(90deg, #4A90E2, #357ABD)',
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
      >
        <FontAwesomeIcon icon={faPlus} /> Create
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
              <Form.Control type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Event Description</Form.Label>
              <Form.Control as="textarea" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Start Date & Time</Form.Label>
              <Form.Control type="datetime-local" value={moment(eventStart).format('YYYY-MM-DDTHH:mm')} onChange={(e) => setEventStart(new Date(e.target.value))} />
            </Form.Group>

            <Form.Group>
              <Form.Label>End Date & Time</Form.Label>
              <Form.Control type="datetime-local" value={moment(eventEnd).format('YYYY-MM-DDTHH:mm')} onChange={(e) => setEventEnd(new Date(e.target.value))} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type="file" onChange={handleImageUpload} />
              {eventImage && <img src={eventImage} alt="Event" style={{ maxWidth: '100%', marginTop: '10px' }} />}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {isEditing && <Button variant="danger" onClick={handleDeleteEvent}>Delete Event</Button>}
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleAddEvent}>{isEditing ? 'Update Event' : 'Create Event'}</Button>
        </Modal.Footer>
      </Modal>

      <Calendar
        localizer={localizer}
        events={myEvents.map(event => ({ ...event, start: new Date(event.start), end: new Date(event.end) }))}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100% - 100px)', width: '100%' }}
        onSelectEvent={handleEventClick}
        components={{ agenda: { event: CustomAgendaEvent } }}
      />
    </div>
  );
}

export default CalendarPage;
