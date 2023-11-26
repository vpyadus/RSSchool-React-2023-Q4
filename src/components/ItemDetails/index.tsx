import { BeerDetails } from '../../api/BeerAPI';

export type ItemDetailsProps = {
  item: BeerDetails;
  hideItemDetails: () => void;
};

const ItemDetails = (props: ItemDetailsProps) => {
  const { item, hideItemDetails } = props;

  return (
    <>
      <div className="overlay" onClick={hideItemDetails} />
      <div className="container">
        <div className="modal">
          <button className="closeBtn" onClick={hideItemDetails}>
            Close
          </button>
          <h2 className="heading">{item.name}</h2>
          <hr />
          <div className="pictureContainer">
            <img className="picture" src={item.image_url} />
          </div>
          <div className="modalContent">
            <h4>Tagline:</h4>
            <span>{item.tagline}</span>
            <h4>Description:</h4>
            <span>{item.description}</span>
            <h4>First brewed:</h4>
            <span>{item.first_brewed}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemDetails;
