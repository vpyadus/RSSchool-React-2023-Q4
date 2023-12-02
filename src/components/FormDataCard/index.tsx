import { FormData } from '../../features/formDataSlice/formDataSlice';
import './style.css';

const FormDataCard = (props: FormData): JSX.Element => {
  const {
    formType,
    name,
    age,
    email,
    password,
    gender,
    tcAccepted,
    picture,
    country,
  } = props;
  return (
    <div className="formdata__card">
      <div>Form Type: {formType}</div>
      <div>Name: {name}</div>
      <div>Age: {age}</div>
      <div>Email: {email}</div>
      <div>Password: {password}</div>
      <div>Gender: {gender}</div>
      <div>Accepted T&C: {tcAccepted ? 'true' : 'false'}</div>
      <div>Pictire: {picture}</div>
      <div>Country: {country}</div>
    </div>
  );
};

export default FormDataCard;
