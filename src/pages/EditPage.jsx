import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getTicketById, updateTicket, deleteTicket } from '../api/tickets.js';
import { useTickets } from '../context/TicketsContext.jsx';
import { PRODUCTS } from '../constants.js';
import TicketCard from '../components/TicketCard.jsx';

const initialForm = {
  id: '', date: '', product: PRODUCTS[0].value,
  name: '', email: '', phone: '', status: 'new',
};

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setTickets } = useTickets();

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [saveError, setSaveError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    setLoadError(null);
    getTicketById(id)
      .then((data) => {
        if (!data) { setNotFound(true); return; }
        setForm(data);
      })
      .catch((err) => {
        if (err.message.includes('404')) setNotFound(true);
        else setLoadError('Не удалось загрузить заявку.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveError(null);
    setSubmitting(true);
    try {
      const updated = await updateTicket(id, form);
      setTickets((prev) => prev.map((t) => (t.id === id ? updated : t)));
      navigate('/table');
    } catch {
      setSaveError('Не удалось сохранить изменения. Попробуйте ещё раз.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Удалить заявку? Это действие нельзя отменить.')) return;
    setSaveError(null);
    setDeleting(true);
    try {
      await deleteTicket(id);
      setTickets((prev) => prev.filter((t) => t.id !== id));
      navigate('/table');
    } catch {
      setSaveError('Не удалось удалить заявку. Попробуйте ещё раз.');
      setDeleting(false);
    }
  };

  if (loading) {
    return <div className="container-fluid pt-40">Загрузка...</div>;
  }

  if (notFound) {
    return (
      <div className="container-fluid pt-40">
        <p>Заявка №{id} не найдена.</p>
        <Link to="/table" className="btn btn-link pl-0">← Вернуться к таблице</Link>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="container-fluid pt-40">
        <p className="text-danger">{loadError}</p>
        <Link to="/table" className="btn btn-link pl-0">← Вернуться к таблице</Link>
      </div>
    );
  }

  return (
    <div className="form-wrapper container-fluid">
      <div className="row justify-content-between align-items-center">
        <div className="col">
          <div className="admin-heading-1">Работа с заявкой</div>
        </div>
        <div className="col text-right">
          <Link to="/table" className="btn btn-link">Вернуться назад</Link>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <form onSubmit={handleSubmit}>
            <TicketCard form={form} onChange={handleChange} />

            {saveError && (
              <div className="alert alert-danger mb-3">{saveError}</div>
            )}

            <div className="row justify-content-between">
              <div className="col">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                  disabled={deleting || submitting}
                >
                  {deleting ? 'Удаление...' : 'Удалить заявку'}
                </button>
              </div>
              <div className="col text-right">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting || deleting}
                >
                  {submitting ? 'Сохранение...' : 'Сохранить изменения'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
