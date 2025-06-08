// src/main/frontend/components/CarCard.tsx

import React from 'react';
import { Button } from '@vaadin/react-components/Button';

type Car = {
  delegationId: string;
  operation: string;
  manufacturer?: string;
  model?: string;
  numberPlate?: string;
  year?: number;
  color?: string;
  price?: number;
  rented?: boolean;
};

interface CarCardProps {
  car: Car;
  isAdmin: boolean;
  onBook: (car: Car) => void;
  onEdit: (car: Car) => void;
  onDelete: (car: Car) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, isAdmin, onBook, onEdit, onDelete }) => {
  if (!car.manufacturer || !car.model) return null;

  return (
    <div
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
        src={`https://cdn.imagin.studio/getimage?customer=img&make=${encodeURIComponent(car.manufacturer)}&modelFamily=${encodeURIComponent(car.model.split(' ')[0])}&zoomType=fullscreen`}
        alt={`${car.manufacturer} ${car.model}`}
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
      <h3>{car.manufacturer} {car.model}</h3>
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
      {isAdmin ? (
        <>
          <Button theme="secondary" style={{ marginBottom: '0.5rem', width: '100%' }} onClick={() => onEdit(car)}>
            Edit
          </Button>
          <Button theme="error" style={{ width: '100%' }} onClick={() => onDelete(car)}>
            Delete
          </Button>
        </>
      ) : (
        <Button
          theme="primary"
          disabled={car.rented}
          onClick={() => onBook(car)}
          style={{ width: '100%' }}
        >
          BOOK
        </Button>
      )}
    </div>
  );
};

export default CarCard;