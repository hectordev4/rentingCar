import React, { createContext, useContext, useState } from 'react';
import Delegation from 'Frontend/generated/dev/renting/delegations/Delegation';

interface DelegationContextValue {
  selectedDelegation: Delegation | null;
  setSelectedDelegation: (delegation: Delegation | null) => void;
}

const DelegationContext = createContext<DelegationContextValue | undefined>(undefined);

export const DelegationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedDelegation, setSelectedDelegation] = useState<Delegation | null>(null);
  return (
    <DelegationContext.Provider value={{ selectedDelegation, setSelectedDelegation }}>
      {children}
    </DelegationContext.Provider>
  );
};

export const useDelegationContext = () => {
  const ctx = useContext(DelegationContext);
  if (!ctx) throw new Error('useDelegationContext must be used within DelegationProvider');
  return ctx;
};