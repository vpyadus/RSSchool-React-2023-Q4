import { FormEventHandler, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../Input';
import { AppDispatch, StoreState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  FormData,
  FormTypes,
  addFormData,
} from '../../features/formDataSlice/formDataSlice';

const FormWithRef = (): JSX.Element => {
  const formTypeRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const maleGenderRef = useRef<HTMLInputElement>(null);
  const femaleGenderRef = useRef<HTMLInputElement>(null);
  const acceptRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const countries: Array<string> = useSelector(
    (store: StoreState) => store.countries.countries
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e): void => {
    e.preventDefault();
    const formData: FormData = {
      formType: (formTypeRef.current?.value as FormTypes) ?? 'uncontrolled',
      name: nameRef.current?.value ?? '',
      age: Number(ageRef.current?.value),
      email: emailRef.current?.value ?? '',
      password: passwordRef.current?.value ?? '',
      gender: maleGenderRef.current?.checked ? 'male' : 'female',
      tcAccepted: Boolean(acceptRef.current?.checked),
      picture: '',
      country: countryRef.current?.value ?? '',
    };
    dispatch(addFormData(formData));
    navigate('/');
  };

  return (
    <div className="form__page">
      <form onSubmit={handleSubmit} noValidate>
        <input
          hidden
          name="form-type"
          defaultValue={'uncontrolled'}
          ref={formTypeRef}
        />
        <div className="form__content">
          <div className="form__row">
            <Input
              label="Name:"
              type={'text'}
              id="input-name"
              name="name"
              inputRef={nameRef}
            />
            <Input
              label="Age:"
              type={'number'}
              id="input-age"
              name="age"
              inputRef={ageRef}
            />
            <Input
              label="Email:"
              type={'email'}
              id="input-email"
              name="email"
              inputRef={emailRef}
            />
          </div>
          <div className="form__row">
            <Input
              label="Password:"
              type={'password'}
              id="input-password"
              name="password"
              inputRef={passwordRef}
            />
            <Input
              label="Confirm Password:"
              type={'password'}
              id="input-password-confirm"
              name="password-confirm"
              inputRef={passwordConfirmRef}
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
                inputRef={maleGenderRef}
                checked
              />
              <Input
                label="Female"
                type={'radio'}
                id="input-gender2"
                name="gender"
                value="female"
                inputRef={femaleGenderRef}
              />
            </div>
            <Input
              label="Accept T&C"
              type={'checkbox'}
              id="input-accept"
              name="accept"
              value="accepted"
              inputRef={acceptRef}
            />
          </div>
          <div className="form__row">
            <Input
              label="Upload Picture:"
              type={'file'}
              id="input-picture"
              name="picture"
              inputRef={imageRef}
            />
            <Input
              label="Select Country:"
              type={'text'}
              id="input-country-select"
              name="country"
              inputRef={countryRef}
              datalist={countries}
            />
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormWithRef;
