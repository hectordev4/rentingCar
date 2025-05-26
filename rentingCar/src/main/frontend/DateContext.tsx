import {createContext, useContext} from 'react';
import { DatePicker } from '@vaadin/react-components';

const DateContext = createContext(DatePicker);

export const useDateContext = () => useContext(dateContext);

export const DateContextProvider = ({ children }) => {
  const datePicker = new DatePicker();
  return (
    <DateContext.Provider value={DatePicker}>
      {children}
    </DateContext.Provider>
  );
};