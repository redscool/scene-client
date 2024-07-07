import {createContext, useContext, useState} from 'react';

import useService from './ServiceContext';

export const ChatContext = createContext();

export default function useChat() {
  return useContext(ChatContext);
}

export const ChatProvider = ({children}) => {
  const {requestWithAccessToken} = useService();

  const [supportMessages, setSupportMessages] = useState([]);

  const getSupportMessages = async () => {
    try {
      const res = await requestWithAccessToken(
        'get',
        '/api/app/help/getMessages',
      );
      setSupportMessages(res.messages);
    } catch (e) {
      // TODO: error handling
      showToast('Something went wrong.');
    }
  };

  const addSupportMessage = async message => {
    // TODO: useLogger
    setSupportMessages(prevArray => {
      const newArray = [...prevArray, message];
      return newArray;
    });
  };

  return (
    <ChatContext.Provider
      value={{
        getSupportMessages,
        supportMessages,
        addSupportMessage,
      }}>
      {children}
    </ChatContext.Provider>
  );
};
