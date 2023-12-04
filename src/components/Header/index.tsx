import { Link } from 'react-router-dom';
import './style.css';

const Header = ({ isHomePage }: { isHomePage: boolean }): JSX.Element => {
  return (
    <div className="header__links_container">
      {isHomePage && (
        <>
          <Link to={'/uncontrolled-form'}>
            <button>Open Uncontrolled Form</button>
          </Link>
          <Link to={'/react-hook-form'}>
            <button>Open React-Hook Based Form</button>
          </Link>
        </>
      )}
      {!isHomePage && (
        <Link to={'/'}>
          <button>Go Back</button>
        </Link>
      )}
    </div>
  );
};

export default Header;
