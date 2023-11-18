import { BeerDetails } from '../../api/BeerAPI';
import './styles.css';

export interface ItemProps extends BeerDetails {
  onClick: () => void;
}

const Card = (props: ItemProps) => {
  const { name, description, image_url, onClick } = props;

  return (
    <>
      <article className="itemcard" onClick={onClick}>
        <div style={{ padding: '20px' }}>
          <img src={image_url} width="60px" alt={name} />
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
