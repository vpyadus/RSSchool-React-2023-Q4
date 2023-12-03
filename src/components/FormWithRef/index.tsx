import { ChangeEvent, FormEventHandler, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../Input';
import { AppDispatch, StoreState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  FormData,
  FormTypes,
  addFormData,
} from '../../features/formDataSlice/formDataSlice';
import getBase64FileRepresentation from '../../utils/getBase64FileRepresentation';
import PasswordStrength from '../PasswordStrength';
import getPasswordStrength from '../../utils/getPasswordStrength';

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

  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const handlerPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const strength: number = getPasswordStrength(e.target.value ?? '');
    setPasswordStrength(strength);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    e
  ): Promise<void> => {
    e.preventDefault();
    const b64Picture: string =
      imageRef.current?.files && imageRef.current?.files[0]
        ? await getBase64FileRepresentation(imageRef.current?.files[0])
        : '';
    const formData: FormData = {
      formType: (formTypeRef.current?.value as FormTypes) ?? 'uncontrolled',
      name: nameRef.current?.value ?? '',
      age: Number(ageRef.current?.value),
      email: emailRef.current?.value ?? '',
      password: passwordRef.current?.value ?? '',
      gender: maleGenderRef.current?.checked ? 'male' : 'female',
      tcAccepted: Boolean(acceptRef.current?.checked),
      picture: b64Picture,
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
              ref={nameRef}
            />
            <Input
              label="Age:"
              type={'number'}
              id="input-age"
              name="age"
              ref={ageRef}
            />
            <Input
              label="Email:"
              type={'email'}
              id="input-email"
              name="email"
              ref={emailRef}
            />
          </div>
          <div className="form__row">
            <div>
              <PasswordStrength strength={passwordStrength} />
              <Input
                label="Password:"
                type={'password'}
                id="input-password"
                name="password"
                ref={passwordRef}
                onChange={handlerPasswordChange}
              />
            </div>
            <Input
              label="Confirm Password:"
              type={'password'}
              id="input-password-confirm"
              name="password-confirm"
              ref={passwordConfirmRef}
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
                ref={maleGenderRef}
                checked
              />
              <Input
                label="Female"
                type={'radio'}
                id="input-gender2"
                name="gender"
                value="female"
                ref={femaleGenderRef}
              />
            </div>
            <Input
              label="Accept T&C"
              type={'checkbox'}
              id="input-accept"
              name="accept"
              value="accepted"
              ref={acceptRef}
            />
          </div>
          <div className="form__row">
            <Input
              label="Upload Picture:"
              type={'file'}
              id="input-picture"
              name="picture"
              ref={imageRef}
            />
            <Input
              label="Select Country:"
              type={'text'}
              id="input-country-select"
              name="country"
              ref={countryRef}
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
