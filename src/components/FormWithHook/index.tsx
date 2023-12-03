import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from './schema';
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

export type FormFields = {
  formType: string;
  name: string;
  age: number;
  email: string;
  password: string;
  passwordConfirm: string;
  gender: string;
  tcAccepted: boolean;
  picture: FileList | null;
  country: string;
};

const FormWithHook = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const countries: Array<string> = useSelector(
    (store: StoreState) => store.countries.countries
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormFields>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      formType: 'react hook form based',
      name: '',
      age: 0,
      email: '',
      password: '',
      passwordConfirm: '',
      gender: '',
      tcAccepted: false,
      picture: null,
      country: '',
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (
    data: FormFields
  ): Promise<void> => {
    const b64Picture: string =
      data.picture && data.picture[0]
        ? await getBase64FileRepresentation(data.picture[0])
        : '';
    const formData: FormData = {
      formType: data.formType as FormTypes,
      name: data.name,
      age: Number(data.age),
      email: data.email,
      password: data.password,
      gender: data.gender as Genders,
      tcAccepted: data.tcAccepted,
      picture: b64Picture,
      country: data.country,
    };
    console.log(formData);
    dispatch(addFormData(formData));
    navigate('/');
  };

  return (
    <div className="form__page">
      <h2>Please populate the form to be able to submit</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <input hidden {...register('formType')} />
        <div className="form__content">
          <div className="form__row">
            <Input
              label="Name:"
              type={'text'}
              id="input-name"
              {...register('name')}
              error={errors.name && errors.name.message}
            />
            <Input
              label="Age:"
              type={'number'}
              id="input-age"
              {...register('age')}
              error={errors.age && errors.age.message}
            />
            <Input
              label="Email:"
              type={'email'}
              id="input-email"
              {...register('email')}
              error={errors.email && errors.email.message}
            />
          </div>
          <div className="form__row">
            <Input
              label="Password:"
              type={'password'}
              id="input-password"
              {...register('password')}
              error={errors.password && errors.password.message}
            />
            <Input
              label="Confirm Password:"
              type={'password'}
              id="input-password-confirm"
              {...register('passwordConfirm')}
              error={errors.passwordConfirm && errors.passwordConfirm.message}
            />
          </div>
          <div className="form__row">
            <div className="input-radio">
              <span>Gender:</span>
              <Input
                label="Male"
                type={'radio'}
                id="input-gender1"
                value="male"
                {...register('gender')}
                error={errors.gender && errors.gender.message}
              />
              <Input
                label="Female"
                type={'radio'}
                id="input-gender2"
                value="female"
                {...register('gender')}
              />
            </div>
            <Input
              label="Accept T&C"
              type={'checkbox'}
              id="input-accept"
              {...register('tcAccepted')}
              error={errors.tcAccepted && errors.tcAccepted.message}
            />
          </div>
          <div className="form__row">
            <Input
              label="Upload Picture:"
              type={'file'}
              id="input-picture"
              {...register('picture')}
              error={errors.picture && errors.picture.message}
            />
            <Input
              label="Select Country:"
              type={'text'}
              id="input-country-select"
              datalist={countries}
              {...register('country')}
              error={errors.country && errors.country.message}
            />
          </div>
        </div>
        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormWithHook;
