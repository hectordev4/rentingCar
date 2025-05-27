import React, { useState } from 'react';
import { useDelegations } from 'Frontend/hooks/useDelegations';
import { DelegationEndpoint } from 'Frontend/generated/endpoints';
import DateRangePicker from 'Frontend/components/DateRangePicker';
import { useDateContext } from 'Frontend/contexts/DateContext';

export default function HomeView() {
  const { delegations, loading } = useDelegations();
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDelegation, setSelectedDelegation] = useState<{ delegationId: string; operation: string } | null>(null);

  const { startDate, endDate } = useDateContext();

  const handleSelect = (delegationId: string, operation: string) => {
    setSelectedDelegation({ delegationId, operation });
    setShowDropdown(false);
  };

  const handleBookNow = async () => {
    console.log('selectedDelegation:', selectedDelegation);
    console.log('startDate:', startDate);
    console.log('endDate:', endDate);

    if (!selectedDelegation || !startDate || !endDate) {
      alert('Please select a delegation and both dates.');
      return;
    }

    try {
      const cars = await DelegationEndpoint.getAvailableCars(
        selectedDelegation.delegationId,
        selectedDelegation.operation,
        startDate,
        endDate
      );
      console.log('Available cars:', cars);
      // TODO: handle/display available cars as needed
    } catch (error) {
      console.error('Failed to load available cars:', error);
      alert('Failed to load available cars. Please try again.');
    }
  };

  return (
    <>
      <img className="background" style={{ width: '100vw' }} src="images/trailRoad.svg" alt="Background" />
      <div className="homeDivTop">
        <img className="homeDivTop" style={{ width: '800px' }} src="icons/Logo.svg" alt="Logo" />
      </div>
      <div className="homeDivBottom">
        <div className="homeDivSubBottom">
          <div style={{ position: 'relative' }}>
            <button className="homeDelegation" onClick={() => setShowDropdown(!showDropdown)}>
              <span>
                {selectedDelegation
                  ? `${selectedDelegation.delegationId} - ${selectedDelegation.operation}`
                  : 'Delegation'}
              </span>
              <img style={{ width: '50px' }} src="icons/arrowDown.svg" alt="Toggle Dropdown" />
            </button>

            {showDropdown && !loading && (
              <ul className="delegation-dropdown">
                {delegations.map((d) => (
                  <li
                    key={d.delegationId + d.operation}
                    onClick={() => handleSelect(d.delegationId, d.operation)}
                  >
                    {d.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <DateRangePicker />

          <button className="homeBook" onClick={handleBookNow}>
            Book Now!
          </button>
        </div>
      </div>
    </>
  );
}
