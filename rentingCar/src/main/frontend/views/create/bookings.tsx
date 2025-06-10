import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { Button } from '@vaadin/react-components/Button';
import Booking from 'Frontend/generated/dev/renting/users/Booking';
import { saveBooking } from 'Frontend/middleware/UserEndpoint';
import { markCarDatesUnavailable, fetchDelegationById } from 'Frontend/middleware/DelegationEndpoint';
import { AuthContext } from 'Frontend/contexts/AuthContext';
import { useDateContext } from 'Frontend/contexts/DateContext';
import { useDelegationContext } from 'Frontend/contexts/DelegationContext';

// Helper to generate date strings between two dates (inclusive)
const getBookedDates = (start: string, end: string): string[] => {
  const dates: string[] = [];
  let current = new Date(start);
  const last = new Date(end);
  while (current <= last) {
    dates.push(current.toISOString().split('T')[0]);
    current.setDate(current.getDate() + 1);
  }
  return dates;
};

export default function CreateBookingView() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, userId } = useContext(AuthContext);
  const { startDate, endDate } = useDateContext();
  const { selectedDelegation, setSelectedDelegation } = useDelegationContext();
  const delegationId = selectedDelegation?.delegationId ?? location.state?.delegationId;
  const car = location.state?.car;

  // Fetch and set delegation if missing in context but available in state
  useEffect(() => {
    if (!selectedDelegation && delegationId) {
      fetchDelegationById(delegationId).then(delegation => {
        if (delegation) setSelectedDelegation(delegation);
      });
    }
  }, [selectedDelegation, delegationId, setSelectedDelegation]);

  // Early returns for missing data
  if (!isLoggedIn) return <div>Please log in to create a booking.</div>;
  if (!car) return <div>No car selected for booking.</div>;
  if (!userId) return <div>Could not determine user ID.</div>;
  if (!delegationId) return <div>No delegation selected.</div>;
  if (!startDate || !endDate) return <div>Please select booking dates.</div>;

  const booking: Booking = {
    userId,
    operation: `booking#${location.pathname.split('/').pop() ?? ''}`,
    car,
    status: "ACTIVE",
    startDate,
    endDate,
    totalToPayment: car.price ?? 0,
    statusPayment: "PENDING",
    statusBooking: "CREATED",
    pickUpDelegation: selectedDelegation ?? undefined,
    deliverDelegation: car.deliverDelegation ?? null,
  };

  const handleConfirmBooking = async () => {
    try {
      await saveBooking(booking);
      const bookedDates = getBookedDates(startDate, endDate);
      await markCarDatesUnavailable(
        delegationId!,
        car.year,
        car.numberPlate,
        bookedDates
      );
      alert('Booking created!');
      navigate('/listCars');
    } catch {
      alert('Failed to create booking');
    }
  };

  return (
    <div className="flex flex-col h-full items-center justify-center p-l text-center box-border">
      <h2>Confirm Your Booking</h2>
      <div className="card p-m">
        <pre className="text-left">
          {JSON.stringify(booking, null, 2)}
        </pre>
        <Button onClick={handleConfirmBooking}>
          Confirm Booking
        </Button>
      </div>
    </div>
  );
}