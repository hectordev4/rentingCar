import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Button } from '@vaadin/react-components/Button';
import Booking from 'Frontend/generated/dev/renting/users/Booking';
import { saveBooking } from 'Frontend/middleware/UserEndpoint';
import { AuthContext } from 'Frontend/contexts/AuthContext';
import { useDateContext } from 'Frontend/contexts/DateContext';
import { useDelegationContext } from 'Frontend/contexts/DelegationContext';

export default function CreateBookingView() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, userId } = useContext(AuthContext);
  const { startDate, endDate } = useDateContext();
  const { selectedDelegation } = useDelegationContext();
  const car = location.state?.car;

  const bookingStartDate = startDate ?? location.state?.startDate ?? '';
  const bookingEndDate = endDate ?? location.state?.endDate ?? '';

  if (!isLoggedIn) {
    return <div>Please log in to create a booking.</div>;
  }

  if (!car) {
    return <div>No car selected for booking.</div>;
  }

  if (!userId) {
    return <div>Could not determine user ID.</div>;
  }

  const booking: Booking = {
    userId,
    operation: `booking#${location.pathname.split('/').pop() ?? ''}`,
    car,
    status: "ACTIVE",
    startDate: bookingStartDate,
    endDate: bookingEndDate,
    totalToPayment: car.price ?? 0,
    statusPayment: "PENDING",
    statusBooking: "CREATED",
    pickUpDelegation: selectedDelegation ?? undefined,
    deliverDelegation: car.deliverDelegation ?? null,
  };

  const handleConfirmBooking = async () => {
    try {
      await saveBooking(booking);
      alert('Booking created!');
      navigate('/listCars');
    } catch (error) {
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