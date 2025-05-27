import React from 'react';
import { DateContextProvider } from 'Frontend/contexts/DateContext';
import { LoginProvider } from 'Frontend/contexts/LoginContext';


import HomeView from './home';

export const config = {
  menu: { order: 0, icon: 'line-awesome/svg/home-solid.svg' },
  title: 'Home',
};

export default function Index() {
  return (
    <LoginProvider>
      <DateContextProvider>
        {/* Add other providers here */}
        <HomeView />
      </DateContextProvider>
    </LoginProvider>
  );
}
