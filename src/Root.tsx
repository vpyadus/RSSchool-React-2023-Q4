import { Provider } from 'react-redux';
import App from './App';
import { ItemsContextProvider } from './Context/ItemsContext';
import { SearchContextProvider } from './Context/SearchContext';
import ErrorBoundary from './components/ErrorBoundary';
import { store } from './store/store';

const Root = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <SearchContextProvider>
          <ItemsContextProvider>
            <App />
          </ItemsContextProvider>
        </SearchContextProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default Root;
