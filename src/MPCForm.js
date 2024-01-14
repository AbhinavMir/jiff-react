import React, { useState, useEffect } from 'react';
import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { mpcCompute, connectToServer } from './mpcCompute';

function MPCForm() {
    const [input, setInput] = useState('');
    const [partyCount, setPartyCount] = useState('');
    const [computationId, setComputationId] = useState('');
    const [output, setOutput] = useState('');
    
    useEffect(() => {
        // Establish connection to the server when the component mounts
        connectToServer('http://localhost:8080', computationId);
    }, [computationId]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Initialize MPC connection and computation here
        try {
            const mpcResult = await mpcCompute(input, partyCount, computationId);
            setOutput(`Sum: ${mpcResult}`);
        } catch (error) {
            console.error('MPC computation error:', error);
            setOutput('Error in MPC computation');
        }
    };

    return (
        <Box p={4}>
            <form onSubmit={handleSubmit}>
                <FormControl isRequired mt={4}>
                    <FormLabel>Party Count</FormLabel>
                    <Input value={partyCount} onChange={e => setPartyCount(e.target.value)} placeholder="Enter party count" />
                </FormControl>

                <FormControl isRequired mt={4}>
                    <FormLabel>Computation ID</FormLabel>
                    <Input value={computationId} onChange={e => setComputationId(e.target.value)} placeholder="Enter computation ID" />
                </FormControl>

                <Button mt={4} colorScheme="blue" type="submit" marginBottom={4}>Connect</Button>

                <hr />

                <FormControl isRequired>
                    <FormLabel>Input Number</FormLabel>
                    <Input value={input} onChange={e => setInput(e.target.value)} placeholder="Enter a number" />
                </FormControl>


                <Button mt={4} colorScheme="blue" type="submit">Submit</Button>
            </form>
        </Box>
    );
}

export default MPCForm;
