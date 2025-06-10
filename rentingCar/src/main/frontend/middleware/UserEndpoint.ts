import { UserEndpoint } from 'Frontend/generated/endpoints';
import Booking from 'Frontend/generated/dev/renting/users/Booking';
import User from 'Frontend/generated/dev/renting/users/User';

// Save a new booking for a user
export async function saveBooking(booking: Booking): Promise<void> {
  return UserEndpoint.saveBooking(booking);
}

//Get bookings for a specific user
export async function getBookingsByUser(userId: string): Promise<Booking[]> {
  const result = await UserEndpoint.getBookingsByUser(userId);
  return (result ?? []).filter((b): b is Booking => !!b);
}

// Get the current user's ID
export async function getUserById(userId: string): Promise<User | null> {
  try {
    const user = await UserEndpoint.getUserById(userId);
    return user ?? null;
  } catch (error) {
    console.error('Failed to fetch user by ID:', error);
    return null;
  }
}
