import { API_URL } from '../config.js';

const BASE_URL = API_URL;

const request = async (path, options = {}) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await res.text();
  return text ? JSON.parse(text) : null;
};

export const getTickets = () => request('/tickets');

export const getTicketById = (id) => request(`/tickets/${id}`);

export const createTicket = (data) =>
  request('/tickets', { method: 'POST', body: JSON.stringify(data) });

export const updateTicket = (id, data) =>
  request(`/tickets/${id}`, { method: 'PUT', body: JSON.stringify(data) });

export const deleteTicket = (id) =>
  request(`/tickets/${id}`, { method: 'DELETE' });
