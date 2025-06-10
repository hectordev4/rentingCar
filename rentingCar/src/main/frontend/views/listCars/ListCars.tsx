import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from 'Frontend/contexts/AuthContext';
import { useDateContext } from 'Frontend/contexts/DateContext';
import { fetchAvailableCars, fetchAllCars, generateBookingHash } from 'Frontend/middleware/DelegationEndpoint';
import Car from 'Frontend/generated/dev/renting/delegations/Car';
import CarCard from 'Frontend/components/CarCard';

export const config: ViewConfig = {
  menu: { order: 6, icon: 'line-awesome/svg/car-side-solid.svg' },
  title: 'Book a car',
};

export default function ListCarsView() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin, userId } = useContext(AuthContext);
  const { startDate, endDate, selectedDates } = useDateContext();

  const delegationId = location.state?.delegationId ?? 'DELEG#001';

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
          if (selectedDates.length > 0) {
            result = await fetchAvailableCars(delegationId, selectedDates);
          } else {
            result = [];
          }
        }
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
  }, [isAdmin, delegationId, selectedDates]);

  const handleBook = (car: Car) => {
    (async () => {
      try {
        if (!userId) {
          alert('User not logged in');
          return;
        }
        const idHashBookingCar = await generateBookingHash({
          manufacturer: car.manufacturer ?? '',
          model: car.model ?? '',
          numberPlate: car.numberPlate ?? '',
          userId,
        });
        navigate(`/listCars/bookingCar/${idHashBookingCar}`, {
          state: {
            car,
            startDate,
            endDate,
            delegationId,
          },
        });
      } catch (error) {
        console.error('Error generating booking hash:', error);
        alert('Failed to start booking process');
      }
    })();
  };

  function isValidCar(
    car: Car
  ): car is Car & {
    delegationId: string;
    operation: string;
    manufacturer: string;
    model: string;
    numberPlate?: string;
    year: number;
    color: string;
    price: number;
  } {
    const hasBase =
      typeof car.manufacturer === 'string' &&
      typeof car.model === 'string' &&
      typeof car.delegationId === 'string' &&
      typeof car.year === 'number' &&
      typeof car.color === 'string' &&
      typeof car.price === 'number' &&
      typeof car.operation === 'string';

    if (isAdmin) {
      return hasBase && typeof car.numberPlate === 'string';
    }
    return hasBase;
  }

  if (loading) {
    return <div>Loading cars...</div>;
  }

  if (cars.length === 0) {
    return <div>No cars available.</div>;
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