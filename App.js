import React from 'react';
import AppNav from './navigation/AppNav';

// Context
import GeneralContext from './store/context';

export default function App() {
  return (
    <GeneralContext>
      <AppNav />
    </GeneralContext>
  );
}
