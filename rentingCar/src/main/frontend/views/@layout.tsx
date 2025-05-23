import { createMenuItems, useViewConfig } from '@vaadin/hilla-file-router/runtime.js';
import { effect, signal } from '@vaadin/hilla-react-signals';
import { AppLayout, DrawerToggle, Icon, SideNav, SideNavItem } from '@vaadin/react-components';
import { Suspense, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useState } from 'react';


const documentTitleSignal = signal('');
effect(() => {
  document.title = documentTitleSignal.value;
});

// Publish for Vaadin to use
(window as any).Vaadin.documentTitleSignal = documentTitleSignal;

export default function MainLayout() {
  const currentTitle = useViewConfig()?.title;
  const navigate = useNavigate();
  const location = useLocation();


    const [darkMode, setDarkMode] = useState(() =>
        document.documentElement.getAttribute('theme') === 'dark'
      );

  useEffect(() => {
      if (darkMode) {
        document.documentElement.setAttribute('theme', 'dark');
      } else {
        document.documentElement.removeAttribute('theme');
      }
    }, [darkMode]);

    const [partyMode, setPartyMode] = useState(() =>
        document.documentElement.getAttribute('theme') === 'party'
      );

  useEffect(() => {
        if (partyMode) {
            document.documentElement.setAttribute('theme', 'party');
        } else {
            document.documentElement.removeAttribute('theme');
        }
        }, [partyMode]);

  useEffect(() => {
    if (currentTitle) {
      documentTitleSignal.value = currentTitle;
    }
  }, [currentTitle]);



  return (
    <AppLayout primarySection="drawer">
      <div slot="drawer" className="flex flex-col justify-between h-full p-m">
        <header className="flex flex-col gap-m">
          <span>
            <img src="icons/Logo.png" alt="Logo SUPREME RENTING" style={{ width: '225px' }} />
          </span>
          <SideNav onNavigate={({ path }) => navigate(path!)} location={location}>
            {createMenuItems().map(({ to, title, icon }) => (
              <SideNavItem path={to} key={to}>
                {icon ? <Icon src={icon} slot="prefix"></Icon> : <></>}
                {title}
              </SideNavItem>
            ))}
          </SideNav>
        </header>
      </div>

      <div className="topBar">
        <div className="topBarToggle">
          <DrawerToggle slot="navbar" aria-label="Menu toggle"></DrawerToggle>
          <h1 slot="navbar" className="text-l m-0">
            {documentTitleSignal}
          </h1>
        </div>
          <div className="topBarButtons">
            <button className="toggleDarkLight" onClick={() => setDarkMode((prev) => !prev)} />
            <button className="toggleParty" onClick={() => setPartyMode((prev) => !prev)} />
          </div>
      </div>

      <Suspense>
        <Outlet />
      </Suspense>
    </AppLayout>
  );
}

