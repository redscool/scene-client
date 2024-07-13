import React from 'react';

import AppNavigator from './AppNavigator';
import {AppConfigProvider} from '../context/AppConfigContext';
import {AuthProvider} from '../context/AuthContext';
import {ChatProvider} from '../context/ChatContext';

function ContextProvidersWrapper() {
  return (
    <AppConfigProvider>
      <AuthProvider>
        <ChatProvider>
          <AppNavigator />
        </ChatProvider>
      </AuthProvider>
    </AppConfigProvider>
  );
}

export default ContextProvidersWrapper;
