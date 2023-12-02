import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UncontrolledForm from './pages/UncontrolledForm.tsx';
import ControlledForm from './pages/ControlledForm.tsx';
import Home from './pages/Home.tsx';
import NotFound from './pages/404.tsx';

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
  return <RouterProvider router={router} />;
}

export default App;
