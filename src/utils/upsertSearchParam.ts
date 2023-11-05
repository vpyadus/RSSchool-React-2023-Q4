const upsertSearchParam = (
  searchParams: URLSearchParams,
  paramName: string,
  paramValue: string
): URLSearchParams => {
  const updatedKeyValueParamPairs = [
    ...Array.from(searchParams.entries()).filter(
      (keyValuePair: string[]) => keyValuePair[0] !== paramName
    ),
    [paramName, paramValue],
  ];
  return new URLSearchParams(updatedKeyValueParamPairs);
};

export default upsertSearchParam;
