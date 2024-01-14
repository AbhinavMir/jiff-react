import React, { useState } from 'react';
import $ from 'jquery';
import mpc from 'jiff-mpc'; // Adjust path to mpc.js

const SumComponent = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const submit = () => {
    setError('');
    setResult(null);
    const inputValue = parseInt(input);
    if (isNaN(inputValue) || inputValue < 0 || inputValue > 100) {
      setError('Input a WHOLE number between 0 and 100!');
      return;
    }

    mpc.compute(inputValue).then(handleResult);
  };

  const handleResult = (result) => {
    setResult(result);
  };

  return (
    <div>
      <h1>Sum Numbers under MPC</h1>
      <label>
        Input Number (between 0 and 100)
        <input type="number" value={input} onChange={(e) => setInput(e.target.value)} />
      </label>
      <button onClick={submit}>Sum</button>
      <br />
      {error && <div className="error">{error}</div>}
      {result !== null && <div>Result is : {result}</div>}
    </div>
  );
};

export default SumComponent;

