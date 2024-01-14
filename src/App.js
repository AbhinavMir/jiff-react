import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import MPCForm from './MPCForm'; // Ensure this path is correct

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <header className="App-header">
          <MPCForm />
        </header>
      </div>
    </ChakraProvider>
  );
}

export default App;
