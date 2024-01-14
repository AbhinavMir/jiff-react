import React, { useState } from 'react';
import $ from 'jquery';
import JIFFClient from 'jiff-mpc'; // Adjust the path to where you put jiff-client.js

function ConnectComponent() {
  const [computationId, setComputationId] = useState('test');
  const [partyCount, setPartyCount] = useState(2);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState('');

  const connectToServer = () => {
    if (isNaN(partyCount)) {
      setError('Party count must be a valid number!');
      return;
    }

    const options = {
      party_count: partyCount,
      onError: (id, error) => setError(error),
      onConnect: () => setIsConnected(true)
    };

    let hostname = window.location.hostname.trim();
    let port = window.location.port || '80';
    hostname = hostname.startsWith('http://') || hostname.startsWith('https://') ? hostname : 'http://' + hostname;
    hostname = hostname.endsWith('/') ? hostname.slice(0, -1) : hostname;
    hostname = hostname + ':' + port;

    new JIFFClient(hostname, computationId, options); // This will initialize and connect the JIFF client
  };

  return (
    <div>
      <h1>Connect JIFF</h1>
      <label>
        Computation ID:
        <input value={computationId} onChange={(e) => setComputationId(e.target.value)} />
      </label>
      <br /><br />
      <label>
        Party Count:
        <input value={partyCount} onChange={(e) => setPartyCount(parseInt(e.target.value))} />
      </label>
      <button onClick={connectToServer} disabled={isConnected}>Connect</button>
      <br /><br />
      {error && <p className="error">{error}</p>}
      {isConnected && <p>All parties Connected!</p>}
    </div>
  );
}

export default ConnectComponent;
