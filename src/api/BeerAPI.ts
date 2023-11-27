import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export const apiURL = 'https://api.punkapi.com/v2/beers/';

export interface SearchParams {
  beer_name?: string;
  page?: number;
  per_page?: number;
}

export interface BeerDetails {
  id: number;
  name: string;
  tagline: string;
  description: string;
  image_url: string;
  first_brewed: string;
}

export const beerAPI = createApi({
  reducerPath: 'beerApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiURL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    fetchData: builder.query<BeerDetails[], SearchParams>({
      query: (params: SearchParams) => {
        const urlSearchQuery: string = Object.keys(params)
          .filter((key) => !!params[key as keyof SearchParams])
          .map((key) => `${key}=${params[key as keyof SearchParams]}`)
          .join('&');
        return `?${urlSearchQuery}`;
      },
    }),
    fetchItem: builder.query<BeerDetails[], string>({
      query: (id: string) => id,
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useFetchDataQuery,
  useFetchItemQuery,
  util: { getRunningQueriesThunk },
} = beerAPI;

// export endpoints for use in SSR
export const { fetchData, fetchItem } = beerAPI.endpoints;
