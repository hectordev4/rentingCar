import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DateContextProvider } from 'Frontend/contexts/DateContext';
import { AuthProvider } from 'Frontend/contexts/AuthContext';
import HomeView from './views/@index';
import MainLayout from './views/@layout';
import LoginView from './views/login';
import BookingsView from './views/bookings';


const router = createBrowserRouter([
  { path: '/', element: <HomeView /> },
  { path: '/home', element: <HomeView /> },
  {
    element: <MainLayout />,
    children: [
      { path: '/login', element: <LoginView /> },
      { path: '/bookings', element: <BookingsView /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('outlet')!);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <DateContextProvider>
        <RouterProvider router={router} />
      </DateContextProvider>
    </AuthProvider>
  </React.StrictMode>
);