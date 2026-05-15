import { PRODUCTS } from '../constants.js';
import { useTickets } from '../context/TicketsContext.jsx';

const FILTER_STATUSES = [
  { value: 'all', label: 'Все' },
  { value: 'new', label: 'Новые' },
  { value: 'inwork', label: 'В работе' },
  { value: 'complete', label: 'Завершённые' },
];

const FilterBar = () => {
  const { filters, setFilters } = useTickets();

  return (
    <div className="row mb-3 justify-content-start">
      <div className="col">
        <div className="btn-group" role="group">
          {FILTER_STATUSES.map((s) => (
            <button
              key={s.value}
              type="button"
              className={`btn ${filters.status === s.value ? 'btn-primary' : 'btn-light'}`}
              onClick={() => setFilters({ status: s.value })}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
      <div className="col">
        <select
          className="custom-select"
          value={filters.product}
          onChange={(e) => setFilters({ product: e.target.value })}
        >
          <option value="all">Все продукты</option>
          {PRODUCTS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
