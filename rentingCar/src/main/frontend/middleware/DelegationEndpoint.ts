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

// Fetch all cars for admin view
export async function fetchAllCars(): Promise<Car[]> {
  return await DelegationEndpoint.getAllCars();
}

// Fetch available cars for user view
export async function fetchAvailableCars(
  delegationId: string,
  startDate: string,
  endDate: string
): Promise<Car[]> {
  return await DelegationEndpoint.getAvailableCars(delegationId, startDate, endDate);
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