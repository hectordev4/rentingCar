import { createMenuItems, useViewConfig } from '@vaadin/hilla-file-router/runtime.js';
import { effect, signal } from '@vaadin/hilla-react-signals';
import { AppLayout, DrawerToggle, Icon, SideNav, SideNavItem } from '@vaadin/react-components';
import { Suspense, useEffect, useState, useContext } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { AuthContext } from 'Frontend/contexts/AuthContext';
import ThemeToggleButtons from 'Frontend/components/ThemeToggleButtons';
import AuthControls from 'Frontend/components/AuthControls';

const documentTitleSignal = signal('');
effect(() => {
  document.title = documentTitleSignal.value;
});
(window as any).Vaadin.documentTitleSignal = documentTitleSignal;

export default function MainLayout() {
  const currentTitle = useViewConfig()?.title;
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin } = useContext(AuthContext);

  // Define menu items for admin
  const adminMenu = [
    { to: '/home', title: 'Home', icon: 'line-awesome/svg/home-solid.svg' },
    { to: '/listCars', title: 'Manage Cars', icon: 'line-awesome/svg/car-side-solid.svg' },
    { to: '/bookings', title: 'All Bookings', icon: 'line-awesome/svg/calendar-solid.svg' },

  ];
   // Define menu items for user
  const userMenu = [
    { to: '/home', title: 'Home', icon: 'line-awesome/svg/home-solid.svg' },
    { to: '/listCars', title: 'Book a Car', icon: 'line-awesome/svg/car-side-solid.svg' },
    { to: '/bookings', title: 'My Bookings', icon: 'line-awesome/svg/calendar-solid.svg' },

  ];

  const menuItems = isAdmin ? adminMenu : userMenu;

  return (
    <AppLayout primarySection="drawer">
      <div slot="drawer" className="flex flex-col justify-between h-full p-m">
        <header className="flex flex-col gap-m">
          <span>
            <img src="icons/Logo.png" alt="Logo SUPREME RENTING" style={{ width: '225px' }} />
          </span>
          <SideNav onNavigate={({ path }) => navigate(path!)} location={location}>
            {menuItems.map(({ to, title, icon }) => (
              <SideNavItem path={to} key={to}>
                {icon ? <Icon src={icon} slot="prefix" /> : null}
                {title}
              </SideNavItem>
            ))}
          </SideNav>
        </header>
      </div>

      <div className="topBar">
        <div className="topBarToggle">
          <DrawerToggle slot="navbar" aria-label="Menu toggle" />
          <h1 slot="navbar" className="text-l m-0">
            {documentTitleSignal}
          </h1>
        </div>
        <div className="topBarButtons">
          <ThemeToggleButtons />
          <AuthControls />
        </div>
      </div>

      <Suspense>
        <Outlet />
      </Suspense>
    </AppLayout>
  );
}