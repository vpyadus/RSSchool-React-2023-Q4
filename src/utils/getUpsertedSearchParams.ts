export type SearchParamItem = {
  [key: string]: string;
};

const getUpsertedSearchParams = (
  paramString: string,
  newParams: SearchParamItem[]
): string => {
  // https:google.com is used as a dummy filler, it doesn't affect anything
  const url: URL = new URL(`https://google.com${paramString}`);
  const searchParams = new URLSearchParams(url.search);
  newParams.forEach((paramObj: SearchParamItem) => {
    const key: string = Object.keys(paramObj)[0];
    searchParams.set(key, paramObj[key]);
  });
  return searchParams.toString();
};

export default getUpsertedSearchParams;
