import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge.jsx';
import { PRODUCTS } from '../constants.js';

const PRODUCT_MAP = Object.fromEntries(PRODUCTS.map((p) => [p.value, p.label]));

const TicketRow = ({ ticket }) => (
  <tr>
    <th scope="row">{ticket.id}</th>
    <td>{ticket.date}</td>
    <td>{PRODUCT_MAP[ticket.product] ?? ticket.product}</td>
    <td>{ticket.name}</td>
    <td>{ticket.email}</td>
    <td>{ticket.phone}</td>
    <td>
      <StatusBadge status={ticket.status} />
    </td>
    <td>
      <Link to={`/edit/${ticket.id}`}>Редактировать</Link>
    </td>
  </tr>
);

export default TicketRow;
