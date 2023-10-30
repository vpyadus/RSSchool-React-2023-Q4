import { Component, ReactNode } from 'react';
import TestError from '../TestError';

interface ShowErrorButtonProps {}

export interface ShowErrorButtonState {
  shouldShowError: boolean;
}

class ShowErrorButton extends Component<
  ShowErrorButtonProps,
  ShowErrorButtonState
> {
  state: Readonly<ShowErrorButtonState> = {
    shouldShowError: false,
  };

  showError(): void {
    this.setState((prevState) => {
      return {
        ...prevState,
        shouldShowError: true,
      };
    });
  }

  render(): ReactNode {
    return (
      <>
        <button onClick={() => this.showError()}>Test Error Boundary</button>
        {this.state.shouldShowError && <TestError />}
      </>
    );
  }
}

export default ShowErrorButton;
