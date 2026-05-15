import { STATUSES } from '../constants.js';

const StatusSelect = ({ value, onChange }) => (
  <select name="status" className="custom-select" value={value} onChange={onChange}>
    {STATUSES.map((s) => (
      <option key={s.value} value={s.value}>
        {s.label}
      </option>
    ))}
  </select>
);

export default StatusSelect;
