const removeSearchParam = (
  searchParams: URLSearchParams,
  paramName: string
): URLSearchParams => {
  const updatedKeyValueParamPairs = [
    ...Array.from(searchParams.entries()).filter(
      (keyValuePair: string[]) => keyValuePair[0] !== paramName
    ),
  ];
  return new URLSearchParams(updatedKeyValueParamPairs);
};

export default removeSearchParam;
