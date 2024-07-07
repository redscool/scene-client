import {createContext, useContext} from 'react';
export const UserContext = createContext();

export default function useUser() {
  return useContext(UserContext);
}
