import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import MPCForm from './MPCForm'; // Ensure this path is correct
import ConnectComponent from './connectComponent';

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <header className="App-header">
          <ConnectComponent />
          <MPCForm />
        </header>
      </div>
    </ChakraProvider>
  );
}

export default App;
