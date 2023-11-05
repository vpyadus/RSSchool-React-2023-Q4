import { BeerDetails } from '../../api/BeerAPI';
import Card from '../Card';

export interface ItemListProps {
  items: Array<BeerDetails>;
  selectItemHandler: (itemId: number) => void;
}

const ItemList = (props: ItemListProps) => {
  const { items, selectItemHandler } = props;
  return (
    <>
      <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
        {items.map((card) => (
          <Card key={card.id} {...card} selectItemHandler={selectItemHandler} />
        ))}
      </div>
    </>
  );
};

export default ItemList;
