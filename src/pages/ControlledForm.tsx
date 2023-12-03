import FormWithState from '../components/FormWithState';
import Header from '../components/Header';

const ControlledForm = (): JSX.Element => {
  return (
    <div className="form__page">
      <Header isHomePage={false} />
      <FormWithState />
    </div>
  );
};

export default ControlledForm;
