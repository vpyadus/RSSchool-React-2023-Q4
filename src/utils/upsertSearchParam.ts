import removeSearchParam from './removeSearchParam';

const upsertSearchParam = (
  searchParams: URLSearchParams,
  paramName: string,
  paramValue: string
): URLSearchParams => {
  const updatedSearchParams: URLSearchParams = removeSearchParam(
    searchParams,
    paramName
  );
  const updatedKeyValueParamPairs = [
    ...Array.from(updatedSearchParams.entries()),
    [paramName, paramValue],
  ];
  return new URLSearchParams(updatedKeyValueParamPairs);
};

export default upsertSearchParam;
