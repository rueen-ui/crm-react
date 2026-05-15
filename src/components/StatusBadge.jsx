import { STATUSES } from '../constants.js';

const STATUS_MAP = Object.fromEntries(STATUSES.map((s) => [s.value, s]));

const StatusBadge = ({ status }) => {
  const s = STATUS_MAP[status];
  return (
    <div className={`badge badge-pill ${s?.badge ?? ''}`}>
      {s?.label ?? status}
    </div>
  );
};

export default StatusBadge;
