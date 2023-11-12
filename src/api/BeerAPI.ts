import axios from 'axios';

export const apiURL = 'https://api.punkapi.com/v2/beers';

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

class BeerAPI {
  static async fetchData(params: SearchParams): Promise<BeerDetails[]> {
    const urlSearchQuery: string = Object.keys(params)
      .filter((key) => !!params[key as keyof SearchParams])
      .map((key) => `${key}=${params[key as keyof SearchParams]}`)
      .join('&');
    const url: string = `${apiURL}?${urlSearchQuery}`;
    return axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        return [] as BeerDetails[];
      });
  }

  static async fetchItem(id: string): Promise<BeerDetails> {
    const url: string = `${apiURL}/${id}`;
    return axios
      .get(url)
      .then((response) => response.data[0] ?? ({} as BeerDetails))
      .catch((error) => console.error(error));
  }
}

export default BeerAPI;
