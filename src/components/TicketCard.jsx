import ProductSelect from './ProductSelect.jsx';
import StatusSelect from './StatusSelect.jsx';

const TicketCard = ({ form, onChange }) => (
  <div className="card mb-4">
    <div className="card-header">Данные о заявке</div>
    <div className="card-body">

      <div className="row mb-3">
        <div className="col-md-2"><strong>ID:</strong></div>
        <div className="col">Заявка №{form.id}</div>
      </div>

      <div className="row mb-3">
        <div className="col-md-2"><strong>Дата создания:</strong></div>
        <div className="col">{form.date || '—'}</div>
      </div>

      <div className="row mb-3">
        <div className="col-md-2"><strong>Продукт:</strong></div>
        <div className="col">
          <ProductSelect value={form.product} onChange={onChange} className="custom-select" />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-2"><strong>Имя:</strong></div>
        <div className="col">
          <input
            type="text"
            name="name"
            className="form-control"
            value={form.name}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-2"><strong>Email:</strong></div>
        <div className="col">
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-2"><strong>Телефон:</strong></div>
        <div className="col">
          <input
            type="text"
            name="phone"
            className="form-control"
            value={form.phone}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-2"><strong>Статус заявки:</strong></div>
        <div className="col">
          <StatusSelect value={form.status} onChange={onChange} />
        </div>
      </div>

    </div>
  </div>
);

export default TicketCard;
