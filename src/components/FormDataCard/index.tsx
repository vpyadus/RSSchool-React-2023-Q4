import { useEffect, useState } from 'react';
import { FormData } from '../../features/formDataSlice/formDataSlice';
import './style.css';

export type FormDataCardProps = {
  data: FormData;
  isNewlyAdded: boolean;
};

const FormDataCard = (props: FormDataCardProps): JSX.Element => {
  const { isNewlyAdded } = props;
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
  } = props.data;

  const [isHighlighted, setIsHignlighted] = useState<boolean>(isNewlyAdded);

  useEffect(() => {
    if (isNewlyAdded) {
      setTimeout(() => {
        setIsHignlighted(false);
      }, 3000);
    }
  }, [isNewlyAdded]);

  return (
    <div className={`formdata__card ${isHighlighted ? 'highlighted' : ''}`}>
      <div>
        <b>Form Type:</b> {formType}
      </div>
      <div>
        <b>Name:</b> {name}
      </div>
      <div>
        <b>Age:</b> {age}
      </div>
      <div>
        <b>Email:</b> {email}
      </div>
      <div>
        <b>Password:</b> {password}
      </div>
      <div>
        <b>Gender:</b> {gender}
      </div>
      <div>
        <b>Accepted T&C:</b> {tcAccepted ? 'true' : 'false'}
      </div>
      <div>
        <b>Picture:</b> <br />
        <img src={picture} />
      </div>
      <div>
        <b>Country:</b> {country}
      </div>
    </div>
  );
};

export default FormDataCard;
