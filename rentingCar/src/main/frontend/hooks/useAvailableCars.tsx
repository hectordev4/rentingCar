import { useState, useCallback } from 'react';
import { DelegationEndpoint } from 'Frontend/generated/endpoints';
import Car from 'Frontend/generated/dev/renting/delegations/Car';

export function useAvailableCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAvailableCars = useCallback(
    async (
      delegationId: string,
      operation: string,
      fromDate: string,
      toDate: string
    ): Promise<void> => {
      setLoading(true);
      try {
        const rawResult = await DelegationEndpoint.getAvailableCars(
          delegationId,
          operation,
          fromDate,
          toDate
        );
        const result: Car[] = (rawResult ?? []).filter(
          (car): car is Car => car !== undefined
        );
        setCars(result);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { cars, loading, fetchAvailableCars };
}