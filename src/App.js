import React, { useState } from 'react';

function App() {
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    const requestData = {
      clientDetails: {
        ClientName: 'Jennifer Aniston',
        ClientEmail: 'jenny@gmail.com',
      },
      eventDetails: {
        EventName: 'Wedding Ceremony',
        EventDate: '01/01/2024',
        EventCoverageTime: '6am - 12pm EST(6Hrs)',
        EventVenue: 'Ashland Temple',
      },
      paymentDetails: {
        TotalAmount: 4000,
        PerHourExtra: 300,
      },
      deliverableDetails: [
        {
          Description: 'Edited JPEGs',
          Quantity: '180',
          Mode: 'Web Link',
          DeliveryDate: '06/06/2024',
        },
        {
          Description: 'Highlights Video',
          Quantity: '10 mins',
          Mode: 'Hard disk (To be provided by Client)',
          DeliveryDate: '06/10/2024',
        },
        {
          Description: 'RAW Video',
          Quantity: 'Full length of the event',
          Mode: 'Hard disk (To be bought by RDS for Client)',
          DeliveryDate: '02/01/2024',
        },
      ],
    };

    try {
      const response = await fetch('http://localhost:8080/newcontract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App"> 
      <h1>React POST Request Example</h1>
      <button onClick={handleSubmit}>Send POST Request</button>
      {response && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
