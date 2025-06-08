import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDelegations } from 'Frontend/hooks/useDelegations';
import { DelegationEndpoint } from 'Frontend/generated/endpoints';
import DateRangePicker from 'Frontend/components/DateRangePicker';
import { useDateContext } from 'Frontend/contexts/DateContext';
import Delegation from 'Frontend/generated/dev/renting/delegations/Delegation';
import DelegationSelector from 'Frontend/components/DelegationSelector';
import { fetchAvailableCars } from 'Frontend/middleware/DelegationEndpoint';


export const config = {
  menu: { order: 0, icon: 'line-awesome/svg/home-solid.svg' },
  title: 'Home',
};

export default function HomeView() {
  const { delegations, loading } = useDelegations();
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDelegation, setSelectedDelegation] = useState<{
    delegationId: string;
    operation: string;
  } | null>(null);

  const navigate = useNavigate();

  const { selectedDates } = useDateContext();


    // Handle delegation selection
  const handleSelect = (delegation: { delegationId: string; operation: string }) => {
    setSelectedDelegation(delegation);
    setShowDropdown(false);
  };

    // Handle booking action
  const handleBookNow = async () => {
    if (!selectedDelegation || !selectedDates || selectedDates.length === 0) {
      alert('Please select a delegation and at least one date.');
      return;
    }

    try {
      const cars = await fetchAvailableCars(
        selectedDelegation.delegationId,
        selectedDates
      );
      console.log('Available cars:', cars);
      navigate('/listCars');
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
            <DelegationSelector
              delegations={delegations}
              loading={loading}
              showDropdown={showDropdown}
              setShowDropdown={setShowDropdown}
              selectedDelegation={selectedDelegation}
              onSelect={handleSelect}
            />
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
