// mpcCompute.js
import axios from 'axios';

const mpcConnect = async (partyId, partyCount, computationId) => {
    // Validate inputs
    if (!partyId || isNaN(partyId) || !partyCount || isNaN(partyCount) || !computationId) {
        throw new Error('Invalid party ID, party count, or computation ID');
    }

    try {
        // Send a request to the server to connect to the computation
        const response = await axios.post('http://localhost:8080/connect', {
            partyId: parseInt(partyId, 10),
            partyCount: parseInt(partyCount, 10),
            computationId
        });

        // Extract the JIFF instance from the response
        const jiffInstance = response.data.jiffInstance;
        return jiffInstance;
    } catch (error) {
        console.error('Error in MPC connection:', error);
        throw error;
    }
}

const mpcCompute = async (input, partyCount, computationId) => {
    // Validate inputs
    if (!input || isNaN(input) || !partyCount || isNaN(partyCount) || !computationId) {
        throw new Error('Invalid input, party count, or computation ID');
    }

    try {
        // Send a request to the server for MPC computation
        const response = await axios.post('http://localhost:8080/compute', {
            inputs: [parseInt(input, 10)], // Array of inputs (modify as per your requirement)
            partyCount: parseInt(partyCount, 10),
            computationId
        });

        // Extract the result from the response
        const result = response.data.result;
        return result;
    } catch (error) {
        console.error('Error in MPC computation:', error);
        throw error;
    }
};

export { mpcCompute };
