import React from 'react';
import Delegation from 'Frontend/generated/dev/renting/delegations/Delegation';


type Props = {
  delegations: Delegation[];
  loading: boolean;
  showDropdown: boolean;
  setShowDropdown: (show: boolean) => void;
  selectedDelegation: { delegationId: string; operation: string } | null;
  onSelect: (delegation: { delegationId: string; operation: string }) => void;
};

export default function DelegationSelector({
  delegations,
  loading,
  showDropdown,
  setShowDropdown,
  selectedDelegation,
  onSelect,
}: Props) {
  return (
    <div style={{ position: 'relative' }}>
      <button className="homeDelegation" onClick={() => setShowDropdown(!showDropdown)}>
        <span>
          {selectedDelegation
            ? delegations.find(
                (d) =>
                  d.delegationId === selectedDelegation.delegationId &&
                  d.operation === selectedDelegation.operation
              )?.name ?? 'Delegation'
            : 'Delegation'}
        </span>
        <img style={{ width: '50px' }} src="icons/arrowDown.svg" alt="Toggle Dropdown" />
      </button>

      {showDropdown && !loading && (
        <ul className="delegation-dropdown">
          {delegations
            .filter(
              (d): d is Delegation & { delegationId: string; operation: string } =>
                !!d.delegationId && !!d.operation
            )
            .map((d) => (
              <li
                key={d.delegationId + d.operation}
                onClick={() => onSelect({ delegationId: d.delegationId, operation: d.operation })}
              >
                {d.name}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}