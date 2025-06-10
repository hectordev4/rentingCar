import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './vaadin-hmr-fix';
import 'Frontend/themes/carrenting/styles.css';
//Provider Imports
import { DateContextProvider } from 'Frontend/contexts/DateContext';
import { AuthProvider } from 'Frontend/contexts/AuthContext';
//Layout Imports
import MainLayout from './views/@layout';
//View Imports
import HomeView from './views/@index';
import LoginView from './views/login';
import ListCarsView from './views/listCars/ListCars';
import BookingsView from './views/bookings';
import CreateBookingView from './views/create/bookings';

//Helper function to wrap elements with providers
const withProviders = (element: React.ReactNode) => (
  <AuthProvider>
    <DateContextProvider>
      {element}
    </DateContextProvider>
  </AuthProvider>
);


const router = createBrowserRouter([
  { path: '/', element: withProviders(<HomeView />) },
  { path: '/home', element: withProviders(<HomeView />) },
  { path: '/login', element: withProviders(<LoginView />) },
  {
    element: withProviders(<MainLayout />),
    children: [
      { path: '/listCars', element: <ListCarsView />},
      { path: '/listCars/bookingCar/:idHashBookingCar', element: <CreateBookingView /> },
      { path: '/bookings', element: <BookingsView /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('outlet')!);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);