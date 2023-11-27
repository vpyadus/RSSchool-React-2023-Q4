import { NextRouter, useRouter } from 'next/router';
import ItemList from '../ItemList';
import Search, { SearchHandlerFunc } from '../Search';
import ShowErrorButton from '../ShowErrorButton';
import Pagination from '../Pagination';
import getUpsertedSearchParams from '../../utils/getUpsertedSearchParams';
import { BeerDetails } from '../../api/BeerAPI';

export default function MainPage({ items }: { items: BeerDetails[] }) {
  const router: NextRouter = useRouter();
  const searchQuery: string =
    typeof router.query.search === 'string' ? router.query.search : '';
  const perPage: string =
    typeof router.query.per_page === 'string' ? router.query.per_page : '';

  const afterSearchHandler: SearchHandlerFunc = (searchQuery: string): void => {
    const params: string = getUpsertedSearchParams(router.asPath, [
      { page: '1' },
      { search: searchQuery },
    ]);
    router.push(`/?${params}`);
  };

  const onItemSelect = (itemId: number): void => {
    router.push(`/details/${itemId}${router.asPath}`);
  };

  return (
    <>
      <header className="main_header">
        <Search
          afterSearchHandler={afterSearchHandler}
          searchQuery={searchQuery}
        />
        <ShowErrorButton />
      </header>
      <main>
        <Pagination
          isLastPage={items.length === 0 || items.length < Number(perPage)}
        />
        <ItemList {...{ items, onItemSelect }} />
      </main>
    </>
  );
}
