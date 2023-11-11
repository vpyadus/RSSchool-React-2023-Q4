import { ReactNode, createContext, useState } from 'react';

export interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (newSearchQuery: string) => void;
}

export const SearchContext = createContext<SearchContextType>({
  searchQuery: '',
  setSearchQuery: (newSearchQuery: string) => {
    console.log(newSearchQuery);
  },
});

export interface SearchContextProviderProps {
  children: ReactNode;
}

export const SearchContextProvider = ({
  children,
}: SearchContextProviderProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
