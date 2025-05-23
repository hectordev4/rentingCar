import {createContext, useContext} from 'react';
import { DatePicker } from '@vaadin/react-components';

const dateContext = createContext(DatePicker);

export const useDateContext = () => useContext(dateContext);

export const DateContextProvider = ({ children }) => {
  const datePicker = new DatePicker();
  return (
    <dateContext.Provider value={DatePicker}>
      {children}
    </dateContext.Provider>
  );
};