import Card, { ItemProps } from '../Card';

export interface ItemListProps {
  items: Array<ItemProps>;
}

const ItemList = (props: ItemListProps) => {
  const { items } = props;
  return (
    <>
      <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
        {items.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </div>
    </>
  );
};

export default ItemList;
