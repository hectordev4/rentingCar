import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@vaadin/react-components/Button';
import Booking from 'Frontend/generated/dev/renting/users/Booking';
import { saveBooking } from 'Frontend/middleware/UserEndpoint';

export default function BookingsView() {
  const location = useLocation();
  const navigate = useNavigate();
  const car = location.state?.car;
  const userId = "USER#001"; // Replace with actual user context if available

  if (!car) {
    return <div>No car selected for booking.</div>;
  }

  // Prepare booking object (add more fields as needed)
  const booking: Booking = {
    userId,
    operation: location.pathname.split('/').pop() ?? '', // idHashBookingCar
    car,
    status: "ACTIVE",
    startDate: location.state?.startDate ?? '',
    endDate: location.state?.endDate ?? '',
    totalToPayment: car.price ?? 0,
    statusPayment: "PENDING",
    statusBooking: "CREATED",
    pickUpDelegation: car.pickUpDelegation ?? null,
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