import App from './App';
import { ItemsContextProvider } from './Context/ItemsContext';
import { SearchContextProvider } from './Context/SearchContext';
import ErrorBoundary from './components/ErrorBoundary';

const Root = () => {
  return (
    <ErrorBoundary>
      <SearchContextProvider>
        <ItemsContextProvider>
          <App />
        </ItemsContextProvider>
      </SearchContextProvider>
    </ErrorBoundary>
  );
};

export default Root;
