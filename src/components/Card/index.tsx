import { BeerDetails } from '../../api/BeerAPI';

export interface ItemProps extends BeerDetails {
  onClick: () => void;
}

const Card = (props: ItemProps) => {
  const { name, description, image_url, onClick } = props;

  return (
    <>
      <article
        style={{
          display: 'flex',
          maxWidth: '300px',
          borderWidth: '1px',
          borderColor: 'black',
          borderStyle: 'solid',
          margin: '5px',
          padding: '5px',
        }}
        onClick={onClick}
      >
        <div style={{ padding: '20px' }}>
          <img src={image_url} width="60px" />
        </div>
        <div>
          <h3>{name}</h3>
          <hr />
          <div>{description}</div>
        </div>
      </article>
    </>
  );
};

export default Card;
