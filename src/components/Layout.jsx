import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useTickets } from '../context/TicketsContext.jsx';

const SIDEBAR_STATUSES = [
  { value: 'all', label: 'Все вместе' },
  { value: 'new', label: 'Новые' },
  { value: 'inwork', label: 'В работе' },
  { value: 'complete', label: 'Завершённые' },
];

const Layout = () => {
  const { tickets, filters, setFilters } = useTickets();
  const navigate = useNavigate();

  const countByStatus = (status) => tickets.filter((t) => t.status === status).length;

  const handleStatusClick = (status) => {
    setFilters({ status });
    navigate('/table');
  };

  return (
    <div className="body--dashboard" style={{ minHeight: '100vh' }}>
      <div className="left-panel">

        <div className="left-panel__logo">
          <div className="left-panel__logo-title">CRM заявки</div>
          <div className="left-panel__logo-subtitle">учебный проект</div>
        </div>

        <div className="left-panel__user clearfix">
          <div className="left-panel__user-photo">
            <img src="/img/avatars/avatar-128.jpg" alt="avatar" />
          </div>
          <div className="left-panel__user-name">
            Пётр <br /> Васильевич
          </div>
        </div>

        <div className="left-panel__navigation">
          <div className="left-panel__navigation-title">Заявки</div>
          <ul>
            {SIDEBAR_STATUSES.map(({ value, label }) => (
              <li key={value}>
                <a
                  href="#"
                  className={filters.status === value ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); handleStatusClick(value); }}
                >
                  {label}
                  {value !== 'all' && countByStatus(value) > 0 && (
                    <div className="badge">{countByStatus(value)}</div>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="left-panel__navigation left-panel__navigation--no-line">
          <ul>
            <li>
              <NavLink to="/">Добавить заявку</NavLink>
            </li>
          </ul>
        </div>

      </div>

      <div className="main-wrapper">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
