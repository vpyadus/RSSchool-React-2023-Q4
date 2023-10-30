export interface SearchParams {
  beer_name: string;
}

export interface BeerDetails {
  id: number;
  name: string;
  description: string;
  image_url: string;
}

class BeerAPI {
  static async fetchData(params: SearchParams): Promise<BeerDetails[]> {
    const { beer_name } = params;
    const url: string = `https://api.punkapi.com/v2/beers?${
      beer_name
        ? 'beer_name=' + beer_name + '&page=1&per_page=25'
        : 'per_page=80'
    }`;
    return fetch(url)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.error(error));
  }
}

export default BeerAPI;
