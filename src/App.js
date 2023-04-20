import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    eventName: '',
    eventDate: '',
    eventVenue: '',
    eventStartTime: '',
    eventEndTime: '',
    deliverableDescription: '',
    deliverableQuantity: '',
    deliverableMode: '',
    deliverableDeliveryDate: '',
  });

  const [showDeliverable, setShowDeliverable] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.clientEmail)) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      const response = await axios.post('https://your-api-endpoint', formData);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app">
      <h1>Event Form</h1>
      <form onSubmit={handleSubmit} className="form">
      <input
          type="text"
          name="clientName"
          placeholder="Client Name"
          value={formData.clientName}
          onChange={handleChange}
          className="input"
          required
        />
        <br />
        <input
          type="email"
          name="clientEmail"
          placeholder="Client Email"
          value={formData.clientEmail}
          onChange={handleChange}
          className="input"
          required
        />
        <br />
        <input
          type="text"
          name="eventName"
          placeholder="Event Name"
          value={formData.eventName}
          onChange={handleChange}
          className="input"
          required
        />
        <br />
        <input
          type="date"
          name="eventDate"
          value={formData.eventDate}
          onChange={handleChange}
          className="input"
          required
        />
        <br />
        <input
          type="text"
          name="eventVenue"
          placeholder="Event Venue"
          value={formData.eventVenue}
          onChange={handleChange}
          className="input"
          required
        />
        <br />
        <label>
          Event Coverage Time (24-hour format):
          <br />
          <input
            type="time"
            name="eventStartTime"
            value={formData.eventStartTime}
            onChange={handleChange}
            className="input"
            required
          />
          <input
            type="time"
            name="eventEndTime"
            value={formData.eventEndTime}
            onChange={handleChange}
            className="input"
            required
          />
        </label>
        <br />
        <h3>Deliverables</h3>
        <br />
        <input
              type="text"
              name="deliverableDescription"
              placeholder="Description"
              value={formData.deliverableDescription}
              onChange={handleChange}
              className="input"
            />
            <br />
            <input
              type="text"
              name="deliverableQuantity"
              placeholder="Quantity"
              value={formData.deliverableQuantity}
              onChange={handleChange}
              className="input"
            />
            <br />
            <select
              name="deliverableMode"
              value={formData.deliverableMode}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Mode</option>
              <option value="Web Link">Web Link</option>
              <option value="Hard disk (To be provided by Client)">
                Hard disk (To be provided by Client)
              </option>
              <option value="Hard disk (To be bought by RDS for Client)">
                Hard disk (To be bought by RDS for Client)
              </option>
            </select>
            <br />
            <input
              type="date"
              name="deliverableDeliveryDate"
              value={formData.deliverableDeliveryDate}
              onChange={handleChange}
              className="input"
            />
            <br />
        {!showDeliverable && (
          <button
            type="button"
            className="add-deliverable-button"
            onClick={() => setShowDeliverable(true)}
          >
            Add More Deliverables
          </button>
        )}
        {showDeliverable && (
          <>
            <input
              type="text"
              name="deliverableDescription"
              placeholder="Description"
              value={formData.deliverableDescription}
              onChange={handleChange}
              className="input"
            />
            <br />
            <input
              type="text"
              name="deliverableQuantity"
              placeholder="Quantity"
              value={formData.deliverableQuantity}
              onChange={handleChange}
              className="input"
            />
            <br />
            <select
              name="deliverableMode"
              value={formData.deliverableMode}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Mode</option>
              <option value="Web Link">Web Link</option>
              <option value="Hard disk (To be provided by Client)">
                Hard disk (To be provided by Client)
              </option>
              <option value="Hard disk (To be bought by RDS for Client)">
                Hard disk (To be bought by RDS for Client)
              </option>
            </select>
            <br />
            <input
              type="date"
              name="deliverableDeliveryDate"
              value={formData.deliverableDeliveryDate}
              onChange={handleChange}
              className="input"
            />
            <br />
          </>
        )}
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default App;
