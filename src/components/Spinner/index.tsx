import { Component, ReactNode } from 'react';
import './styles.css';

class Spinner extends Component {
  render(): ReactNode {
    return <div className="loader"></div>;
  }
}

export default Spinner;
