import { UserEndpoint } from 'Frontend/generated/endpoints';
import Booking from 'Frontend/generated/dev/renting/users/Booking';

// Save a new booking for a user
export async function saveBooking(booking: Booking): Promise<void> {
  return UserEndpoint.saveBooking(booking);
}