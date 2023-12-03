import { ChangeEvent, FormEventHandler, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../Input';
import {
  FormData,
  FormTypes,
  Genders,
  addFormData,
} from '../../features/formDataSlice/formDataSlice';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, StoreState } from '../../store/store';
import getBase64FileRepresentation from '../../utils/getBase64FileRepresentation';

const FormWithState = (): JSX.Element => {
  const [formType] = useState<FormTypes>('controlled');
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number>(0);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [gender, setGender] = useState<Genders>('male');
  const [isTcAccepted, setIsTcAccepted] = useState<boolean>(false);
  const [picture, setPicture] = useState<string>('');
  const [country, setCountry] = useState<string>('');

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const countries: Array<string> = useSelector(
    (store: StoreState) => store.countries.countries
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e): void => {
    e.preventDefault();
    const formData: FormData = {
      formType,
      name,
      age: Number(age),
      email,
      password,
      gender,
      tcAccepted: isTcAccepted,
      picture,
      country: country,
    };
    dispatch(addFormData(formData));
    navigate('/');
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setName(e.target.value);

  const handleAgeChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setAge(Number(e.target.value));

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setEmail(e.target.value);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setPassword(e.target.value);

  const handlePasswordConfirmChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => setPasswordConfirm(e.target.value);

  const handleGenderChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.checked) {
      setGender(e.target.value as Genders);
    }
  };

  const handleAcceptedTCChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setIsTcAccepted(e.target.checked);

  const handlePictureChange = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const b64Picture: string =
      e.target?.files && e.target?.files[0]
        ? await getBase64FileRepresentation(e.target.files[0])
        : '';
    setPicture(b64Picture);
  };

  const handleCountryChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setCountry(e.target.value);

  return (
    <div className="form__page">
      <form onSubmit={handleSubmit} noValidate>
        <input hidden name="form-type" defaultValue={formType} />
        <div className="form__content">
          <div className="form__row">
            <Input
              label="Name:"
              type={'text'}
              id="input-name"
              name="name"
              value={name}
              onChange={handleNameChange}
            />
            <Input
              label="Age:"
              type={'number'}
              id="input-age"
              name="age"
              value={age}
              onChange={handleAgeChange}
            />
            <Input
              label="Email:"
              type={'email'}
              id="input-email"
              name="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="form__row">
            <Input
              label="Password:"
              type={'password'}
              id="input-password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <Input
              label="Confirm Password:"
              type={'password'}
              id="input-password-confirm"
              name="password-confirm"
              value={passwordConfirm}
              onChange={handlePasswordConfirmChange}
            />
          </div>
          <div className="form__row">
            <div className="input-radio">
              <span>Gender:</span>
              <Input
                label="Male"
                type={'radio'}
                id="input-gender1"
                name="gender"
                value="male"
                onChange={handleGenderChange}
                checked={gender === 'male'}
              />
              <Input
                label="Female"
                type={'radio'}
                id="input-gender2"
                name="gender"
                value="female"
                onChange={handleGenderChange}
                checked={gender === 'female'}
              />
            </div>
            <Input
              label="Accept T&C"
              type={'checkbox'}
              id="input-accept"
              name="accept"
              value="accepted"
              onChange={handleAcceptedTCChange}
              checked={isTcAccepted}
            />
          </div>
          <div className="form__row">
            <Input
              label="Upload Picture:"
              type={'file'}
              id="input-picture"
              name="picture"
              onChange={handlePictureChange}
            />
            <Input
              label="Select Country:"
              type={'text'}
              id="input-country-select"
              name="country"
              onChange={handleCountryChange}
              value={country}
              datalist={countries}
            />
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormWithState;
