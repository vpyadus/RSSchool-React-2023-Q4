import { useEffect } from 'react';

const TestError = () => {
  useEffect(() => {
    throw new Error('Test Error');
  }, []);
  return <></>;
};

export default TestError;
