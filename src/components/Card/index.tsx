import { Component, ReactNode } from 'react';
import { BeerDetails } from '../../api/BeerAPI';

export interface ItemProps extends BeerDetails {}

class Card extends Component<ItemProps> {
  render(): ReactNode {
    return (
      <>
        <div
          style={{
            display: 'flex',
            maxWidth: '300px',
            borderWidth: '1px',
            borderColor: 'black',
            borderStyle: 'solid',
            margin: '5px',
            padding: '5px',
          }}
        >
          <div style={{ padding: '20px' }}>
            <img src={this.props.image_url as string} width="60px" />
          </div>
          <div>
            <h3>{this.props.name}</h3>
            <hr />
            <div>{this.props.description}</div>
          </div>
        </div>
      </>
    );
  }
}

export default Card;
