import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Top from './Top';
import authRoutes from './route/authRoutes';
import { PersistGate } from 'redux-persist/integration/react';

const Example = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Layout>
            <Routes>
              <Route path='/' element={<Top />} />
              {authRoutes}
            </Routes>
          </Layout>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default Example;
