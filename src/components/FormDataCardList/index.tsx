import { useSelector } from 'react-redux';
import { FormData } from '../../features/formDataSlice/formDataSlice';
import FormDataCard from '../FormDataCard';
import { StoreState } from '../../store/store';
import './style.css';

const FormDataCardList = (): JSX.Element => {
  const formDataArray: Array<FormData> = useSelector(
    (state: StoreState) => state.formData.formSubmissions
  );
  return (
    <div className="formdata__list">
      {formDataArray
        .slice()
        .reverse()
        .map((formData: FormData, index: number) => (
          <FormDataCard {...formData} key={index} />
        ))}
    </div>
  );
};

export default FormDataCardList;
