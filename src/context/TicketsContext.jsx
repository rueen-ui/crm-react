import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { getTickets } from '../api/tickets.js';

const FILTERS_KEY = 'crm_filters';

const getInitialFilters = () => {
  try {
    return JSON.parse(localStorage.getItem(FILTERS_KEY)) ?? { status: 'all', product: 'all' };
  } catch {
    return { status: 'all', product: 'all' };
  }
};

const TicketsContext = createContext(null);

export const TicketsProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFiltersState] = useState(getInitialFilters);

  useEffect(() => {
    getTickets()
      .then(setTickets)
      .catch(() => setError('Не удалось загрузить заявки. Проверьте, запущен ли json-server.'))
      .finally(() => setLoading(false));
  }, []);

  const setFilters = (updates) => {
    const next = { ...filters, ...updates };
    setFiltersState(next);
    localStorage.setItem(FILTERS_KEY, JSON.stringify(next));
  };

  const filteredTickets = useMemo(
    () =>
      tickets.filter((t) => {
        const byStatus = filters.status === 'all' || t.status === filters.status;
        const byProduct = filters.product === 'all' || t.product === filters.product;
        return byStatus && byProduct;
      }),
    [tickets, filters],
  );

  const value = { tickets, setTickets, filteredTickets, filters, setFilters, loading, error };

  return <TicketsContext.Provider value={value}>{children}</TicketsContext.Provider>;
};

export const useTickets = () => useContext(TicketsContext);
