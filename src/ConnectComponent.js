import React, { useState } from 'react';
import $ from 'jquery';
import mpc from 'jiff-mpc'; // Adjust path to mpc.js

const ConnectComponent = () => {
  const [computationId, setComputationId] = useState('test');
  const [partyCount, setPartyCount] = useState(2);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState('');

  const connect = () => {
    setError('');
    setIsConnected(false);
    const party_count = parseInt(partyCount);
    if (isNaN(party_count)) {
      setError('Party count must be a valid number!');
      return;
    }

    const options = {
      party_count: party_count,
      onError: (_, error) => setError(error),
      onConnect: () => setIsConnected(true)
    };

    let hostname = window.location.hostname.trim();
    let port = window.location.port || '80';
    hostname = `http://${hostname}:${port}`;
    mpc.connect(hostname, computationId, options);
  };

  return (
    <div>
      <h1>Connect JIFF</h1>
      <label>
        Computation ID
        <input value={computationId} onChange={(e) => setComputationId(e.target.value)} />
      </label>
      <br /><br />
      <label>
        Party Count
        <input type="number" value={partyCount} onChange={(e) => setPartyCount(e.target.value)} />
      </label>
      <button onClick={connect} disabled={isConnected}>Connect</button>
      <br /><br />
      {error && <div className="error">{error}</div>}
      {isConnected && <div>All parties Connected!</div>}
    </div>
  );
};

export default ConnectComponent;
