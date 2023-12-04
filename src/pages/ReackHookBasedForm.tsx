import FormWithHook from '../components/FormWithHook';
import Header from '../components/Header';

const ReackHookBasedForm = (): JSX.Element => {
  return (
    <div className="form__page">
      <Header isHomePage={false} />
      <FormWithHook />
    </div>
  );
};

export default ReackHookBasedForm;
