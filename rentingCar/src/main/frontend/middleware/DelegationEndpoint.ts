import { DelegationEndpoint } from 'Frontend/generated/endpoints';
import Car from 'Frontend/generated/dev/renting/delegations/Car';
import Delegation from 'Frontend/generated/dev/renting/delegations/Delegation';


// Save a new car
export async function saveCar(car: Car): Promise<void> {
  return DelegationEndpoint.saveCar(car);
}

// Save a new delegation
export async function saveDelegation(delegation: Delegation): Promise<void> {
  return DelegationEndpoint.saveDelegation(delegation);
}

// Get a delegation by ID
export async function fetchDelegationById(delegationId: string) {
  return DelegationEndpoint.getDelegation(delegationId, "profile");
}

// Fetch all cars for admin view
export async function fetchAllCars(): Promise<Car[]> {
  const result = await DelegationEndpoint.getAllCars();
  return (result ?? []).filter((car): car is Car => !!car);
}

// Fetch available cars for user view
export async function fetchAvailableCars(
  delegationId: string,
  dates: string[]
): Promise<Car[]> {
  const result = await DelegationEndpoint.getAvailableCars(delegationId, dates);
  return (result ?? []).filter((car): car is Car => !!car);
}

// Hash generation for booking
export async function generateBookingHash(data: {
  manufacturer: string;
  model: string;
  numberPlate: string;
  userId: string;
}): Promise<string> {
  const encoder = new TextEncoder();
  const dateString = new Date().toISOString().split('T')[0];
  const stringToHash = `${data.manufacturer}-${data.model}-${data.numberPlate}-${dateString}-${data.userId}`;
  const hashBuffer = await crypto.subtle.digest(
    'SHA-256',
    encoder.encode(stringToHash)
  );
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Mark car dates as unavailable in the calendar when a booking is made
export async function markCarDatesUnavailable(
  delegationId: string,
  year: number,
  numberPlate: string,
  bookedDates: string[]
): Promise<void> {
  return DelegationEndpoint.markCarDatesUnavailable(
    delegationId,
    year,
    numberPlate,
    bookedDates
  );
}