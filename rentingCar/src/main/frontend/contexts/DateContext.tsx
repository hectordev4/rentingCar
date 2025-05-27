import React, { createContext, useContext, useState } from 'react';

interface DateContextValue {
  startDate: string | null;
  endDate: string | null;
  setStartDate: (date: string | null) => void;
  setEndDate: (date: string | null) => void;
}


interface DateContextProviderProps {
  children: React.ReactNode;
}

const DateContext = createContext<DateContextValue | undefined>(undefined);


export const DateContextProvider: React.FC<DateContextProviderProps> = ({ children }) => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  return (
    <DateContext.Provider value={{ startDate, endDate, setStartDate, setEndDate }}>
      {children}
    </DateContext.Provider>
  );
};

export const useDateContext = (): DateContextValue => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error('useDateContext must be used within a DateContextProvider');
  }
  return context;
};
