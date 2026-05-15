import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getRandomTestData } from '../constants.js';
import { createTicket } from '../api/tickets.js';
import { useTickets } from '../context/TicketsContext.jsx';
import ProductSelect from '../components/ProductSelect.jsx';

const FormPage = () => {
  const [form, setForm] = useState(getRandomTestData);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { setTickets } = useTickets();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('radial-bg', 'flex-center');
    return () => document.body.classList.remove('radial-bg', 'flex-center');
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const newTicket = {
        ...form,
        date: new Date().toISOString().split('T')[0],
        status: 'new',
      };
      const created = await createTicket(newTicket);
      setTickets((prev) => [...prev, created]);
      setForm(getRandomTestData());
      navigate('/table');
    } catch {
      setError('Не удалось отправить заявку. Проверьте, запущен ли сервер.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="white-plate white-plate--payment">
      <div className="container-fluid">
        <div className="white-plate__header text-center">
          <p className="white-plate__logo">
            <span>Форма</span> заявок
          </p>
        </div>

        <div className="white-plate__line-between white-plate__line-between--main" />

        <form onSubmit={handleSubmit}>
          <label>Ваши данные:</label>

          <div className="form-group">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Имя и Фамилия"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="phone"
              className="form-control"
              placeholder="Телефон"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Продукт:</label>
            <ProductSelect value={form.product} onChange={handleChange} />
          </div>

          {error && (
            <div className="alert alert-danger">{error}</div>
          )}

          <div className="form-group">
            <button
              type="submit"
              className="btn btn-lg btn-primary btn-block"
              disabled={submitting}
            >
              {submitting ? 'Отправка...' : 'Оформить заявку'}
            </button>
          </div>
        </form>

        <div className="text-center mt-10">
          <Link to="/table">Перейти к таблице заявок →</Link>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
