import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'; // Import the CSS file

const formatCoverageTime = (startTime, endTime) => {
  const start = moment(startTime, 'hh:mm A');
  const end = moment(endTime, 'hh:mm A');

  // Add 12 hours to end time if it is in AM and start time is in PM
  if (end.isBefore(start)) {
    end.add(24, 'hours');
  }

  const duration = moment.duration(end.diff(start));
  const hours = Math.floor(duration.asHours());
  const minutes = Math.round(duration.asMinutes() % 60);

  // Format start and end times
  const formattedStartTime = start.format('h:mm A');
  const formattedEndTime = end.format('h:mm A');

  // Format duration in hours and minutes
  let formattedDuration = '';
  if (hours > 0) {
    formattedDuration += `${hours} hrs`;
  }
  if (minutes > 0) {
    if (formattedDuration) {
      formattedDuration += ' ';
    }
    formattedDuration += `${minutes} mins`;
  }

  return `${formattedStartTime} to ${formattedEndTime} ET (${formattedDuration})`;
};



function App() {

  // State for form input values
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventCoverageStartTime, setEventCoverageStartTime] = useState('');
  const [eventCoverageEndTime, setEventCoverageEndTime] = useState('');
  const [eventVenue, setEventVenue] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [perHourExtra, setPerHourExtra] = useState(0);

  // State for deliverable details
  const [deliverables, setDeliverables] = useState([
    {
      description: '',
      quantity: '',
      mode: '',
      deliveryDate: '',
    },
  ]);

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

  const handleSuccess = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleError = (error) => {
    toast.error(error, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const updateDeliverable = (index, field, value) => {
    const updatedDeliverables = [...deliverables];
    updatedDeliverables[index][field] = value;
    setDeliverables(updatedDeliverables);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const requestData = {
      clientDetails: {
        clientName: clientName,
        clientEmail: clientEmail,
      },
      eventDetails: {
        eventName: eventName,
        eventDate: eventDate,
        eventCoverageTime: formatCoverageTime(eventCoverageStartTime,eventCoverageEndTime),
        eventVenue: eventVenue,
      },
      paymentDetails: {
        totalAmount: parseInt(totalAmount,10),
        perHourExtra: parseInt(perHourExtra,10),
      },
      deliverableDetails: deliverables,
    };

    try {
      console.log(JSON.stringify(requestData));
      const response = await axios.post('https://reddot-studios-contracts-backend.onrender.com/newcontract', requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      handleSuccess(response.data.message);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code outside the range of 2xx
        handleError(error.response.data.error);
      } else {
        // Something happened in setting up the request that triggered an error
        handleError(error.message);
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <div className="App">
      <h1>Create a client contract</h1>
      <form onSubmit={handleSubmit}>
      <h2>Client Details</h2>
      <div>
        <label>
          Client Name: 
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Client Email:
          <input
            type="email"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
          />
        </label>
        </div>
        <br />
        <h2>Event Details</h2>
        <div>
        <label>
          Event Name:
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Event Date:
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
        </label>
        <br />
        <label>
          Event Coverage Start Time:
          <input
            type="time"
            value={eventCoverageStartTime}
            onChange={(e) => setEventCoverageStartTime(e.target.value)}
          />
        </label>
        <br />
        <label>
          Event Coverage End Time:
          <input
            type="time"
            value={eventCoverageEndTime}
            onChange={(e) => setEventCoverageEndTime(e.target.value)}
          />
        </label>
        <br />
        <label>
          Event Venue:
          <input
            type="text"
            value={eventVenue}
            onChange={(e) => setEventVenue(e.target.value)}
          />
        </label>
        </div>
        <br />
        <h2>Payment Details</h2>
        <div>
        <label>
          Total Amount:
          <input
            type="number"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
          />
        </label>
        <br />
        <label>
          Per Hour Extra:
          <input
            type="number"
            value={perHourExtra}
            onChange={(e) => setPerHourExtra(e.target.value)}
          />
        </label>
        </div>
        <br />
        <h2>Deliverable Details</h2>
        {deliverables.map((deliverable, index) => (
          <div key={index}>
            <h3>Deliverable {index + 1}</h3>
            <label>
              Description:
              <input
                type="text"
                value={deliverable.description}
                onChange={(e) =>
                  updateDeliverable(index, 'description', e.target.value)
                }
              />
            </label>
            <br />
            <label>
              Quantity:
              <input
                type="text"
                value={deliverable.quantity}
                onChange={(e) =>
                  updateDeliverable(index, 'quantity', e.target.value)
                }
              />
            </label>
            <br />
            <br />
            <label>
              Mode:
              <select
                value={deliverable.mode}
                onChange={(e) =>
                  updateDeliverable(index, 'mode', e.target.value)
                }
              >
                <option value="">--Select mode--</option>
                <option value="Web Link">Web Link</option>
                <option value="Hard disk (To be provided by Client)">
                  Hard disk (To be provided by Client)
                </option>
                <option value="Hard disk (To be bought by RDS for Client)">
                  Hard disk (To be bought by RDS for Client)
                </option>
              </select>
            </label>
            <br />
            <label>
              Delivery Date:
              <input
                type="date"
                value={deliverable.deliveryDate}
                onChange={(e) =>
                  updateDeliverable(index, 'deliveryDate', e.target.value)
                }
              />
            </label>
            <br />
          </div>
        ))}
        <button type="button" onClick={addDeliverable}>
          Add More Deliverables
        </button>
        <br />
        <button type="submit">Send POST Request</button>
      </form>
    </div>
  );
}

export default App;

