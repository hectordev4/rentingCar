import { useEffect, useState } from 'react';
import { DelegationEndpoint } from 'Frontend/generated/endpoints';
import type Delegation from 'Frontend/generated/dev/renting/delegations/Delegation';

export function useDelegations() {
  const [delegations, setDelegations] = useState<Delegation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    DelegationEndpoint.getAllProfileDelegations()
      .then((data) => {
        const safeData: Delegation[] = (data ?? []).filter(
          (d): d is Delegation => d !== undefined
        );
        setDelegations(safeData);
      })
      .finally(() => setLoading(false));
  }, []);


  return { delegations, loading };
}
