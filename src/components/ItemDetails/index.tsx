import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import BeerAPI, { BeerDetails } from '../../api/BeerAPI';
import Spinner from '../Spinner';
import './styles.css';
import { OutletContextParams } from '../../App';

const ItemDetails = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [item, setItem] = useState<BeerDetails>({} as BeerDetails);
  const { itemId, hideItemDetails } = useOutletContext<OutletContextParams>();

  useEffect(() => {
    const fetchItem = async (): Promise<void> => {
      const data = await BeerAPI.fetchItem(itemId);
      setIsLoading(false);
      setItem(data);
    };
    if (itemId) fetchItem();
  }, [itemId]);

  return (
    <>
      <div className="overlay" onClick={hideItemDetails} />
      <div className="container">
        <div className="modal">
          {isLoading && <Spinner />}
          {!isLoading && (
            <>
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
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ItemDetails;
