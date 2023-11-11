import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import ItemDetails from './components/ItemDetails/index.tsx';
import Root from './Root.tsx';
import NotFound from './components/NotFound/index.tsx';

export const appRoutes: Array<RouteObject> = [
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <ItemDetails />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

const router = createBrowserRouter(appRoutes);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
