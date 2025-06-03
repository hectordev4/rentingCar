import React, { useEffect, useState } from 'react';

export default function ThemeToggleButtons() {
  const [darkMode, setDarkMode] = useState(() =>
    document.documentElement.getAttribute('theme') === 'dark'
  );
  const [partyMode, setPartyMode] = useState(() =>
    document.documentElement.getAttribute('theme') === 'party'
  );

  useEffect(() => {
    if (partyMode) {
      document.documentElement.setAttribute('theme', 'party');
    } else if (darkMode) {
      document.documentElement.setAttribute('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('theme');
    }
  }, [darkMode, partyMode]);

  return (
    <>
      <button className="toggleDarkLight" onClick={() => setDarkMode((prev) => !prev)} />
      <button className="toggleParty" onClick={() => setPartyMode((prev) => !prev)} />
    </>
  );
}