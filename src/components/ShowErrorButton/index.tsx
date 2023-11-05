import { useState } from 'react';
import TestError from '../TestError';

const ShowErrorButton = () => {
  const [shouldShowError, setShouldShowError] = useState<boolean>(false);

  const showError = (): void => {
    setShouldShowError(true);
  };

  return (
    <>
      <button onClick={showError}>Test Error Boundary</button>
      {shouldShowError && <TestError />}
    </>
  );
};

export default ShowErrorButton;
