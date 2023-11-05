import { useSearchParams } from 'react-router-dom';
import { BeerDetails } from '../../api/BeerAPI';
import upsertSearchParam from '../../utils/upsertSearchParam';

export interface ItemProps extends BeerDetails {}

const Card = (props: ItemProps) => {
  const { id, name, description, image_url } = props;
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSelectItem = (itemId: number): void => {
    const updatedParams = upsertSearchParam(
      searchParams,
      'details',
      String(itemId)
    );
    setSearchParams(updatedParams);
  };

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
        onClick={() => handleSelectItem(id)}
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
