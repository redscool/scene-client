import React from 'react';

import AppNavigator from './AppNavigator';
import {AppConfigProvider} from '../../context/AppConfig';
import {AuthProvider} from '../../context/AuthContext';

function ContextProvidersWrapper() {
  return (
    <AppConfigProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </AppConfigProvider>
  );
}

export default ContextProvidersWrapper;
