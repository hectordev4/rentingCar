import { useCallback, useState } from 'react';
import { DelegationEndpoint } from 'Frontend/generated/endpoints';
import type Car from 'Frontend/generated/dev/renting/delegations/Car';

export const useAvailableCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAvailableCars = useCallback(
    async (
      delegationId: string,
      operation: string,
      fromDate: string,
      toDate: string
    ): Promise<void> => {
      setLoading(true);
      try {
        const result: Car[] = await DelegationEndpoint.getAvailableCars(
          delegationId,
          operation,
          fromDate,
          toDate
        );
        setCars(result);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { cars, loading, fetchAvailableCars };
};
