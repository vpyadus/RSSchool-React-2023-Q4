import { NextRouter, useRouter } from 'next/router';
import {
  BeerDetails,
  fetchData,
  fetchItem,
  getRunningQueriesThunk,
} from '../../src/api/BeerAPI';
import { wrapper } from '../../src/store/store';
import MainPage from '../../src/components/MainPage';
import ItemDetails from '../../src/components/ItemDetails';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    // retrieve visible items one more time
    const page: number = Number(context.query.page) || 1;
    const perPage: number = Number(context.query.per_page) || 10;
    const searchQuery: string =
      typeof context.query.search === 'string' ? context.query.search : '';

    store.dispatch(
      fetchData.initiate({
        page,
        per_page: perPage,
        beer_name: searchQuery,
      })
    );

    let items = [] as BeerDetails[];

    await Promise.all(store.dispatch(getRunningQueriesThunk())).then(
      (values) => {
        if (values.length) {
          items = values[0].data as BeerDetails[];
        }
      }
    );

    // get the item details by its id
    const itemId: string =
      typeof context.params?.item === 'string' ? context.params.item : '';

    store.dispatch(fetchItem.initiate(itemId));

    let item = {} as BeerDetails;

    await Promise.all(store.dispatch(getRunningQueriesThunk())).then(
      (values) => {
        if (values.length) {
          item = (values[0].data as BeerDetails[])[0];
        }
      }
    );

    return {
      props: { items, item },
    };
  }
);

export default function Item({
  items,
  item,
}: {
  items: BeerDetails[];
  item: BeerDetails;
}) {
  const router: NextRouter = useRouter();
  const hideItemDetails = (): void => {
    router.back();
  };
  return (
    <>
      <MainPage items={items} />
      <ItemDetails item={item} hideItemDetails={hideItemDetails} />
    </>
  );
}
