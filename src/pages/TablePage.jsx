import FilterBar from '../components/FilterBar.jsx';
import TicketsTable from '../components/TicketsTable.jsx';

const TablePage = () => (
  <div className="container-fluid">
    <div className="admin-heading-1">Все заявки</div>
    <FilterBar />
    <TicketsTable />
  </div>
);

export default TablePage;
