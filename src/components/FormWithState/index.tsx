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
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />
            <Input
              label="Age:"
              type={'number'}
              id="input-age"
              name="age"
              value={age}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAge(Number(e.target.value))
              }
            />
            <Input
              label="Email:"
              type={'email'}
              id="input-email"
              name="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </div>
          <div className="form__row">
            <Input
              label="Password:"
              type={'password'}
              id="input-password"
              name="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
            <Input
              label="Confirm Password:"
              type={'password'}
              id="input-password-confirm"
              name="password-confirm"
              value={passwordConfirm}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPasswordConfirm(e.target.value)
              }
            />
          </div>
          <div className="form__row">
            <div>
              <span>Gender:&nbsp;&nbsp;</span>
              <Input
                label="Male"
                type={'radio'}
                id="input-gender1"
                name="gender"
                value="male"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (e.target.checked) {
                    setGender(e.target.value as Genders);
                  }
                }}
                checked={gender === 'male'}
              />
              <Input
                label="Female"
                type={'radio'}
                id="input-gender2"
                name="gender"
                value="female"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (e.target.checked) {
                    setGender(e.target.value as Genders);
                  }
                }}
                checked={gender === 'female'}
              />
            </div>
            <Input
              label="Accept T&C"
              type={'checkbox'}
              id="input-accept"
              name="accept"
              value="accepted"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setIsTcAccepted(e.target.checked)
              }
              checked={isTcAccepted}
            />
          </div>
          <div className="form__row">
            <Input
              label="Upload Picture:"
              type={'file'}
              id="input-picture"
              name="picture"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPicture(e.target.value)
              }
              value={picture}
            />
            <Input
              label="Select Country:"
              type={'text'}
              id="input-country-select"
              name="country"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCountry(e.target.value)
              }
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
