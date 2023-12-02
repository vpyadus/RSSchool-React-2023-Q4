import './App.css';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UncontrolledForm from './pages/UncontrolledForm.tsx';
import ControlledForm from './pages/ControlledForm.tsx';
import Home from './pages/Home.tsx';
import NotFound from './pages/404.tsx';
import { store } from './store/store.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/uncontrolled-form',
    element: <UncontrolledForm />,
  },
  {
    path: '/controlled-form',
    element: <ControlledForm />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
