import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { useEffect, useState } from 'react';
import { DelegationEndpoint } from 'Frontend/generated/endpoints';
import Car from 'Frontend/generated/dev/renting/delegations/Car';
import { Button } from '@vaadin/react-components/Button';
import { useNavigate, useLocation } from 'react-router-dom';

export const config: ViewConfig = {
  menu: { order: 6, icon: 'line-awesome/svg/car-side-solid.svg' },
  title: 'Book a car',
};

type UserRole = 'admin' | 'user';  // Define roles here

export default function ListCars() {
  const navigate = useNavigate();
  const location = useLocation();

  // You can get this from your auth system or context
  // For demo, hardcoded here:
  const userRole: UserRole = 'user'; // Change this to 'admin' to test admin view

  // Cars passed via navigation state, if any
  const stateCars = location.state?.cars as Car[] | undefined;

  const [cars, setCars] = useState<Car[]>(stateCars ?? []);
  const [loading, setLoading] = useState(!stateCars);

  useEffect(() => {
    if (!stateCars) {
      DelegationEndpoint.getAllCars()
        .then((result) => {
          const safeCars = (result ?? []).filter(
            (car): car is Car =>
              !!car &&
              typeof car.delegationId === 'string' &&
              typeof car.operation === 'string'
          );
          setCars(safeCars);
        })
        .catch((error) => {
          console.error('Failed to fetch cars:', error);
          setCars([]);
        })
        .finally(() => setLoading(false));
    }
  }, [stateCars]);

  const handleBook = async (car: Car) => {
    const userId = "USER#001";
    try {
      const idHashBookingCar = await generateBookingHash({
        make: car.make ?? '',
        model: car.model ?? '',
        userId
      });
      navigate(`/listCars/bookingCar/${idHashBookingCar}`, { state: { car } });
    } catch (error) {
      console.error('Error generating booking hash:', error);
      alert('Failed to start booking process');
    }
  };

  async function generateBookingHash(data: {
    make: string;
    model: string;
    userId: string;
  }): Promise<string> {
    const encoder = new TextEncoder();
    const dateString = new Date().toISOString().split('T')[0];
    const stringToHash = `${data.make}-${data.model}-${dateString}-${data.userId}`;
    const hashBuffer = await crypto.subtle.digest(
      'SHA-256',
      encoder.encode(stringToHash)
    );
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  function isCarWithMakeAndModel(car: Car): car is Car & { make: string; model: string } {
    return typeof car.make === 'string' && typeof car.model === 'string';
  }

  if (loading) {
    return <div>Loading cars...</div>;
  }

  if (cars.length === 0) {
    return <div>No cars available.</div>;
  }

  // Admin view: show all cars + Edit/Delete buttons (example)
  if (userRole === 'admin') {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>Admin Car Management</h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2rem',
            justifyContent: 'center',
          }}
        >
          {cars.filter(isCarWithMakeAndModel).map(car => (
            <div
              key={`${car.delegationId}-${car.operation}`}
              style={{
                border: '1px solid #ddd',
                borderRadius: '12px',
                width: '320px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '1.5rem',
                background: '#fff'
              }}
            >
              <img
                src={`https://cdn.imagin.studio/getimage?customer=img&make=${encodeURIComponent(car.make)}&modelFamily=${encodeURIComponent(car.model.split(' ')[0])}&zoomType=fullscreen`}
                alt={`${car.make} ${car.model}`}
                style={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '1rem'
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/300x180?text=Car+Not+Found';
                }}
              />
              <h3>{car.make} {car.model}</h3>
              <div style={{ marginBottom: '0.5rem', color: '#555' }}>
                Year: <strong>{car.year}</strong>
              </div>
              <div style={{ marginBottom: '0.5rem', color: '#555' }}>
                Color: <strong>{car.color}</strong>
              </div>
              <div style={{ marginBottom: '0.5rem', color: '#555' }}>
                Price: <strong>{car.price} €</strong>
              </div>
              <div style={{ marginBottom: '1rem', color: car.rented ? '#d33' : '#090' }}>
                {car.rented ? 'Rented' : 'Available'}
              </div>
              {/* Example Admin Buttons */}
              <Button theme="secondary" style={{ marginBottom: '0.5rem', width: '100%' }} onClick={() => alert(`Edit ${car.make} ${car.model}`)}>
                Edit
              </Button>
              <Button theme="error" style={{ width: '100%' }} onClick={() => alert(`Delete ${car.make} ${car.model}`)}>
                Delete
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // User view: normal booking cards
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2rem',
        justifyContent: 'center',
        padding: '2rem'
      }}
    >
      {cars
        .filter(isCarWithMakeAndModel)
        .map(car => (
          <div
            key={`${car.delegationId}-${car.operation}`}
            style={{
              border: '1px solid #ddd',
              borderRadius: '12px',
              width: '320px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '1.5rem',
              background: '#fff'
            }}
          >
            <img
              src={`https://cdn.imagin.studio/getimage?customer=img&make=${encodeURIComponent(car.make)}&modelFamily=${encodeURIComponent(car.model.split(' ')[0])}&zoomType=fullscreen`}
              alt={`${car.make} ${car.model}`}
              style={{
                width: '100%',
                height: '180px',
                objectFit: 'cover',
                borderRadius: '8px',
                marginBottom: '1rem'
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/300x180?text=Car+Not+Found';
              }}
            />
            <h3>
              {car.make} {car.model}
            </h3>
            <div style={{ marginBottom: '0.5rem', color: '#555' }}>
              Year: <strong>{car.year}</strong>
            </div>
            <div style={{ marginBottom: '0.5rem', color: '#555' }}>
              Color: <strong>{car.color}</strong>
            </div>
            <div style={{ marginBottom: '0.5rem', color: '#555' }}>
              Price: <strong>{car.price} €</strong>
            </div>
            <div style={{ marginBottom: '1rem', color: car.rented ? '#d33' : '#090' }}>
              {car.rented ? 'Rented' : 'Available'}
            </div>
            <Button
              theme="primary"
              disabled={car.rented}
              onClick={() => handleBook(car)}
              style={{ width: '100%' }}
            >
              BOOK
            </Button>
          </div>
        ))
      }
    </div>
  );
}
