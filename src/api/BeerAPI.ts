export interface SearchParams {
  beer_name?: string;
  page?: number;
  per_page?: number;
}

export interface BeerDetails {
  id: number;
  name: string;
  description: string;
  image_url: string;
}

class BeerAPI {
  static async fetchData(params: SearchParams): Promise<BeerDetails[]> {
    const urlSearchQuery: string = Object.keys(params)
      .filter((key) => !!params[key as keyof SearchParams])
      .map((key) => `${key}=${params[key as keyof SearchParams]}`)
      .join('&');
    const url: string = `https://api.punkapi.com/v2/beers?${urlSearchQuery}`;
    return fetch(url)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.error(error);
        return [] as BeerDetails[];
      });
  }
}

export default BeerAPI;
