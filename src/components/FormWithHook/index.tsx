import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
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
  formType: FormTypes;
  name: string;
  age: string;
  email: string;
  password: string;
  passwordConfirm: string;
  gender: Genders;
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

  const { register, handleSubmit } = useForm<FormFields>({
    defaultValues: {
      formType: 'controlled' as FormTypes,
      name: '',
      age: '',
      email: '',
      password: '',
      passwordConfirm: '',
      gender: 'male' as Genders,
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
      formType: data.formType,
      name: data.name,
      age: Number(data.age),
      email: data.email,
      password: data.password,
      gender: data.gender,
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
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <input hidden {...register('formType')} />
        <div className="form__content">
          <div className="form__row">
            <Input
              label="Name:"
              type={'text'}
              id="input-name"
              {...register('name')}
            />
            <Input
              label="Age:"
              type={'number'}
              id="input-age"
              {...register('age')}
            />
            <Input
              label="Email:"
              type={'email'}
              id="input-email"
              {...register('email')}
            />
          </div>
          <div className="form__row">
            <Input
              label="Password:"
              type={'password'}
              id="input-password"
              {...register('password')}
            />
            <Input
              label="Confirm Password:"
              type={'password'}
              id="input-password-confirm"
              {...register('passwordConfirm')}
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
            />
          </div>
          <div className="form__row">
            <Input
              label="Upload Picture:"
              type={'file'}
              id="input-picture"
              {...register('picture')}
            />
            <Input
              label="Select Country:"
              type={'text'}
              id="input-country-select"
              datalist={countries}
              {...register('country')}
            />
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormWithHook;
