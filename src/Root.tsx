import { Provider } from 'react-redux';
import App from './App';
import { ItemsContextProvider } from './Context/ItemsContext';
import ErrorBoundary from './components/ErrorBoundary';
import { store } from './store/store';

const Root = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ItemsContextProvider>
          <App />
        </ItemsContextProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default Root;
