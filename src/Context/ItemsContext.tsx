import { ReactNode, createContext, useState } from 'react';
import { BeerDetails } from '../api/BeerAPI';

export interface ItemsContextType {
  items: Array<BeerDetails>;
  setItems: (newItems: Array<BeerDetails>) => void;
}

export const ItemsContext = createContext<ItemsContextType>({
  items: [],
  setItems: (newItems) => {
    console.log(newItems);
  },
});

export interface ItemsContextProviderProps {
  children: ReactNode;
}

export const ItemsContextProvider = ({
  children,
}: ItemsContextProviderProps) => {
  const [items, setItems] = useState<Array<BeerDetails>>([]);
  return (
    <ItemsContext.Provider value={{ items, setItems }}>
      {children}
    </ItemsContext.Provider>
  );
};
