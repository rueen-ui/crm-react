import { HashRouter, Routes, Route } from 'react-router-dom';
import { TicketsProvider } from './context/TicketsContext.jsx';
import Layout from './components/Layout.jsx';
import FormPage from './pages/FormPage.jsx';
import TablePage from './pages/TablePage.jsx';
import EditPage from './pages/EditPage.jsx';

const App = () => {
  return (
    <HashRouter>
      <TicketsProvider>
        <Routes>
          <Route path="/" element={<FormPage />} />
          <Route element={<Layout />}>
            <Route path="/table" element={<TablePage />} />
            <Route path="/edit/:id" element={<EditPage />} />
          </Route>
        </Routes>
      </TicketsProvider>
    </HashRouter>
  );
};

export default App;
