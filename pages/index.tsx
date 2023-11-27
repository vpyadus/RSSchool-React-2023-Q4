import {
  BeerDetails,
  fetchData,
  getRunningQueriesThunk,
} from '../src/api/BeerAPI';
import { wrapper } from '../src/store/store';
import MainPage from '../src/components/MainPage';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
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

    return {
      props: { items },
    };
  }
);

export default MainPage;
