import React from 'react';

import {ServiceContextProvider} from '../context/ServiceContext';
import ContextProvidersWrapper from './ContextProvidersWrapper';

function ServiceContextProviderWrapper() {
  return (
    <ServiceContextProvider>
      <ContextProvidersWrapper />
    </ServiceContextProvider>
  );
}

export default ServiceContextProviderWrapper;
