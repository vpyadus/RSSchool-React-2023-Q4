import { useState } from 'react';
import TestError from '../TestError';

export interface ShowErrorButtonState {
  shouldShowError: boolean;
}

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
