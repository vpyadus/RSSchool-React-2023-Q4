import { BeerDetails } from '../../api/BeerAPI';
import Card from '../Card';

export interface ItemListProps {
  items: Array<BeerDetails>;
  onItemSelect: (itemId: number) => void;
}

const ItemList = (props: ItemListProps) => {
  const { items, onItemSelect } = props;
  return (
    <>
      {items.length ? (
        <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
          {items.map((card) => (
            <Card
              key={card.id}
              {...card}
              onClick={() => onItemSelect(card.id)}
            />
          ))}
        </div>
      ) : (
        <div>Nothing found</div>
      )}
    </>
  );
};

export default ItemList;
