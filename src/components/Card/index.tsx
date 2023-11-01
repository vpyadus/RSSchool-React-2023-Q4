import { BeerDetails } from '../../api/BeerAPI';

export interface ItemProps extends BeerDetails {}

const Card = (props: ItemProps) => {
  const { name, description, image_url } = props;
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
