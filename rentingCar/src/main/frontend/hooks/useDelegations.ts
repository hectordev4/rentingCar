import { useEffect, useState } from 'react';
import { DelegationEndpoint } from 'Frontend/generated/endpoints.js';
import type Delegation from 'Frontend/generated/dev/renting/delegations/Delegation.js';

export function useDelegations() {
  const [delegations, setDelegations] = useState<Delegation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    DelegationEndpoint.getAllProfileDelegations()
      .then(setDelegations)
      .finally(() => setLoading(false));
  }, []);

  return { delegations, loading };
}
