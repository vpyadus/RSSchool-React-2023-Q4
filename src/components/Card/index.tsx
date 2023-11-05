import { BeerDetails } from '../../api/BeerAPI';

export interface ItemProps extends BeerDetails {
  selectItemHandler: (itemId: number) => void;
}

const Card = (props: ItemProps) => {
  const { id, name, description, image_url, selectItemHandler } = props;

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
        onClick={() => selectItemHandler(id)}
      >
        <div style={{ padding: '20px' }}>
          <img src={image_url} width="60px" />
        </div>
        <div>
          <h3>{name}</h3>
          <hr />
          <div>{description}</div>
        </div>
      </div>
    </>
  );
};

export default Card;
