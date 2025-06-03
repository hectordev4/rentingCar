import { createMenuItems, useViewConfig } from '@vaadin/hilla-file-router/runtime.js';
import { effect, signal } from '@vaadin/hilla-react-signals';
import { AppLayout, DrawerToggle, Icon, SideNav, SideNavItem } from '@vaadin/react-components';
import { Suspense, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';

import { DateContextProvider } from 'Frontend/contexts/DateContext';
import { LoginProvider } from 'Frontend/contexts/LoginContext';
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



  return (
    <LoginProvider>
      <DateContextProvider>
        <AppLayout primarySection="drawer">
          <div slot="drawer" className="flex flex-col justify-between h-full p-m">
            <header className="flex flex-col gap-m">
              <span>
                <img src="icons/Logo.png" alt="Logo SUPREME RENTING" style={{ width: '225px' }} />
              </span>
              <SideNav onNavigate={({ path }) => navigate(path!)} location={location}>
                {createMenuItems().map(({ to, title, icon }) => (
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
      </DateContextProvider>
    </LoginProvider>
  );
}
