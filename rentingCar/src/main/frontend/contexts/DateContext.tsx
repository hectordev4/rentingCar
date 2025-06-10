import React, { createContext, useContext, useState, useMemo } from 'react';

interface DateContextValue {
  startDate: string | null;
  endDate: string | null;
  setStartDate: (date: string | null) => void;
  setEndDate: (date: string | null) => void;
  selectedDates: string[];
}

interface DateContextProviderProps {
  children: React.ReactNode;
}

const DateContext = createContext<DateContextValue | undefined>(undefined);

export const DateContextProvider: React.FC<DateContextProviderProps> = ({ children }) => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  // Use yyyy-MM-dd format for selectedDates
  const selectedDates = useMemo(() => {
    if (!startDate || !endDate) return [];
    const dates: string[] = [];
    let current = new Date(startDate);
    const last = new Date(endDate);
    while (current <= last) {
      const yyyy = String(current.getFullYear());
      const mm = String(current.getMonth() + 1).padStart(2, '0');
      const dd = String(current.getDate()).padStart(2, '0');
      dates.push(`${yyyy}-${mm}-${dd}`);
      current.setDate(current.getDate() + 1);
    }
    return dates;
  }, [startDate, endDate]);

  return (
    <DateContext.Provider value={{ startDate, endDate, setStartDate, setEndDate, selectedDates }}>
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