import { useOutletContext } from 'react-router-dom';
import { BeerDetails, useFetchItemQuery } from '../../api/BeerAPI';
import Spinner from '../Spinner';
import './styles.css';
import { OutletContextParams } from '../../App';
import { StoreState } from '../../store/store';
import { useSelector } from 'react-redux';

const ItemDetails = () => {
  const { itemId, hideItemDetails } = useOutletContext<OutletContextParams>();

  const isLoadingDetailsPage: boolean = useSelector(
    (state: StoreState) => state.loadingFlags.isLoadingDetailsPage
  );

  const { data = [] as BeerDetails[] } = useFetchItemQuery(itemId);
  const item: BeerDetails = data[0] ?? {};

  return (
    <>
      <div className="overlay" onClick={hideItemDetails} />
      <div className="container">
        <div className="modal">
          {isLoadingDetailsPage && <Spinner />}
          {!isLoadingDetailsPage && (
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
