import React from 'react';
import './App.css';
import SkinCareApp from './components/SkinCareApp';
import { SkinCareProvider } from './contexts/SkinCareContext';

function App() {
  return (
    <SkinCareProvider>
      <SkinCareApp />
    </SkinCareProvider>
  );
}

export default App;
