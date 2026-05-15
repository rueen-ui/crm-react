import { useTickets } from '../context/TicketsContext.jsx';
import TicketRow from './TicketRow.jsx';

const TicketsTable = () => {
  const { filteredTickets, loading, error } = useTickets();

  if (loading) {
    return <div className="pt-20">Загрузка заявок...</div>;
  }

  if (error) {
    return <div className="pt-20 text-danger">{error}</div>;
  }

  if (filteredTickets.length === 0) {
    return <div className="pt-20">Заявок не найдено.</div>;
  }

  return (
    <table className="table fs-14">
      <thead>
        <tr>
          <th>ID</th>
          <th>Дата</th>
          <th>Продукт</th>
          <th>Имя</th>
          <th>Email</th>
          <th>Телефон</th>
          <th>Статус</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {filteredTickets.map((ticket) => (
          <TicketRow key={ticket.id} ticket={ticket} />
        ))}
      </tbody>
    </table>
  );
};

export default TicketsTable;
