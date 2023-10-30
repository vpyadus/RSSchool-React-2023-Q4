import { PureComponent, ReactNode } from 'react';
import Card, { ItemProps } from '../Card';

export interface ItemListProps {
  items: Array<ItemProps>;
}

class ItemList extends PureComponent<ItemListProps> {
  render(): ReactNode {
    return (
      <>
        <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
          {this.props.items.map((card) => (
            <Card key={card.id} {...card} />
          ))}
        </div>
      </>
    );
  }
}

export default ItemList;
