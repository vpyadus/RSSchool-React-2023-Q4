import Header from '../components/Header';
import FormWithRef from '../components/FormWithRef';

const UncontrolledForm = (): JSX.Element => {
  return (
    <div className="form__page">
      <Header isHomePage={false} />
      <FormWithRef />
    </div>
  );
};

export default UncontrolledForm;
