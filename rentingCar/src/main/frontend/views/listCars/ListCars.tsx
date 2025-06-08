import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from 'Frontend/contexts/AuthContext';
import { fetchAvailableCars, fetchAllCars, generateBookingHash } from 'Frontend/middleware/DelegationEndpoint';
import Car from 'Frontend/generated/dev/renting/delegations/Car';
import CarCard from 'Frontend/components/CarCard';

export const config: ViewConfig = {
  menu: { order: 6, icon: 'line-awesome/svg/car-side-solid.svg' },
  title: 'Book a car',
};

export default function ListCars() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin } = useContext(AuthContext);

  // For user: get delegationId, startDate, endDate from location.state or defaults
  const delegationId = location.state?.delegationId ?? 'DELEG#001';
  const startDate = location.state?.startDate ?? new Date().toISOString().split('T')[0];
  const endDate = location.state?.endDate ?? new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  async function loadCars() {
    setLoading(true);
    try {
      let result: Car[] = [];
      if (isAdmin) {
        result = await fetchAllCars();
      } else {
        const getDatesArray = (start: string, end: string) => {
          const dates: string[] = [];
          let current = new Date(start);
          const last = new Date(end);
          while (current <= last) {
            const mm = String(current.getMonth() + 1).padStart(2, '0');
            const dd = String(current.getDate()).padStart(2, '0');
            dates.push(`${mm}-${dd}`);
            current.setDate(current.getDate() + 1);
          }
          return dates;
        };
        const selectedDates = getDatesArray(startDate, endDate);
        result = await fetchAvailableCars(delegationId, selectedDates);
      } // <-- This closing brace was missing
      setCars(
        (result ?? []).filter(
          (car): car is Car => !!car
        )
      );
    } catch (error) {
      console.error('Failed to fetch cars:', error);
      setCars([]);
    } finally {
      setLoading(false);
    }
  }
  loadCars();
}, [isAdmin, delegationId, startDate, endDate]);

  const handleBook = (car: Car) => {
    (async () => {
      const userId = "USER#001";
      try {
        const idHashBookingCar = await generateBookingHash({
          manufacturer: car.manufacturer ?? '',
          model: car.model ?? '',
          numberPlate: car.numberPlate ?? '',
          userId,
        });
        navigate(`/listCars/bookingCar/${idHashBookingCar}`, { state: { car } });
      } catch (error) {
        console.error('Error generating booking hash:', error);
        alert('Failed to start booking process');
      }
    })();
  };

  function isCarWithManufacturerAndModel(car: Car): car is Car & { manufacturer: string; model: string } {
    return typeof car.manufacturer === 'string' && typeof car.model === 'string';
  }

  if (loading) {
    return <div>Loading cars...</div>;
  }

  if (cars.length === 0) {
    return <div>No cars available.</div>;
  }
  function isValidCar(car: Car): car is Car & { manufacturer: string; model: string; delegationId: string; year: number } {
    return (
      typeof car.manufacturer === 'string' &&
      typeof car.model === 'string' &&
      typeof car.delegationId === 'string' &&
      typeof car.year === 'number'
    );
  }


  return (
    <div style={{ padding: '2rem' }}>
      {isAdmin && <h2>Admin Car Management</h2>}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          justifyContent: 'center',
        }}
      >
        {cars
            .filter(isValidCar)
            .map(car => (
              <CarCard
                key={`${car.delegationId}-${car.operation ?? ''}`}
                car={car}
                isAdmin={isAdmin}
                onBook={handleBook}
                onEdit={(car) => alert(`Edit ${car.manufacturer} ${car.model}`)}
                onDelete={(car) => alert(`Delete ${car.manufacturer} ${car.model}`)}
              />
            ))}
      </div>
    </div>
  );
}