import { Component, ReactNode } from 'react';

class TestError extends Component {
  componentDidMount(): void {
    throw new Error('Test Error');
  }

  render(): ReactNode {
    return <></>;
  }
}

export default TestError;
