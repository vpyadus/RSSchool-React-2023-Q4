import * as yup from 'yup';
import { FormFields } from '../components/FormWithHook';

const formSchema: yup.ObjectSchema<FormFields> = yup.object().shape({
  formType: yup.string().required('Form Type is missing'),

  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z]+/, 'Must have first letter uppercased'),

  age: yup
    .number()
    .required('Age is required')
    .positive('Number should be positive'),

  email: yup
    .string()
    .required('Email is required')
    .matches(
      /^([a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*\.[a-zA-Z]{2,6}$/,
      'Please enter correct email'
    ),

  password: yup
    .string()
    .required('Password is required')
    .matches(/\d/, 'Should have at least one number')
    .matches(/[A-Z]/, 'Should have at least one uppercased letter')
    .matches(/[a-z]/, 'Should have at least one lowercased letter')
    .matches(
      /[$&+,:;=?@#|'<>.^*()%!-]/,
      'Should have at least one special character'
    ),

  passwordConfirm: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), ''], 'Should match the entered password'),

  gender: yup
    .string()
    .required('Gender is required')
    .oneOf(['male', 'female'], 'Please select a gender'),

  tcAccepted: yup
    .boolean()
    .required('Accept T&C is required')
    .oneOf([true], 'Should Accept T&C'),

  picture: yup
    .mixed<FileList>()
    .required('Image is required')
    .test(
      'is-image-selected',
      'Image is not selected',
      (value: FileList) => value.length > 0
    )
    .test('is-valid-type', 'Not a valid image type', (value: FileList) => {
      return (
        !!value.length &&
        ['png', 'jpg', 'jpeg'].indexOf(value[0].type.split('/')[1]) > -1
      );
    })
    .test(
      'is-valid-size',
      'Image size is larger than 1Mb',
      (value: FileList) => !!value.length && value[0].size < 1000000
    ),

  country: yup.string().required('Country is required'),
});

export default formSchema;
