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
  });

  const [deliverables, setDeliverables] = useState([
    {
      description: '',
      quantity: '',
      mode: '',
      deliveryDate: '',
    },
  ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDeliverableChange = (index, key, value) => {
    const newDeliverables = [...deliverables];
    newDeliverables[index][key] = value;
    setDeliverables(newDeliverables);
  };

  const addDeliverable = () => {
    setDeliverables([
      ...deliverables,
      {
        description: '',
        quantity: '',
        mode: '',
        deliveryDate: '',
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.clientEmail)) {
      alert('Please enter a valid email address.');
      return;
    }

    const data = {
      ...formData,
      deliverables,
    };

    try {
      const response = await axios.post('https://your-api-endpoint', data);
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
        {deliverables.map((deliverable, index) => (
          <div key={index}>
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={deliverable.description}
              onChange={(e) =>
                handleDeliverableChange(index, 'description', e.target.value)
              }
              className="input"
              required
            />
            <br />
            <input
              type="text"
              name="quantity"
              placeholder="Quantity"
              value={deliverable.quantity}
              onChange={(e) =>
                handleDeliverableChange(index, 'quantity', e.target.value)
              }
              className="input"
              required
            />
            <br />
            <select
              name="mode"
              value={deliverable.mode}
              onChange={(e) =>
                handleDeliverableChange(index, 'mode', e.target.value)
              }
              className="input"
              required
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
              name="deliveryDate"
              value={deliverable.deliveryDate}
              onChange={(e) =>
                handleDeliverableChange(index, 'deliveryDate', e.target.value)
              }
              className="input"
              required
            />
            <br />
          </div>
        ))}
        <button
          type="button"
          className="add-deliverable-button"
          onClick={addDeliverable}
        >
          Add Deliverable
        </button>
        <br />
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;

