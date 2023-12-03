import { ChangeEventHandler, Ref } from 'react';
import { Genders } from '../../features/formDataSlice/formDataSlice';

export type InputType =
  | 'text'
  | 'number'
  | 'checkbox'
  | 'email'
  | 'file'
  | 'password'
  | 'radio';

export type InputProps = {
  id: string;
  name: string;
  type: InputType;
  label: string;
  value?: string | number | Genders;
  checked?: boolean;
  inputRef?: Ref<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

const Input = (props: InputProps): JSX.Element => {
  const {
    id,
    name,
    type,
    label,
    value = '',
    checked = false,
    inputRef = null,
    onChange,
  } = props;

  const isUncontrolled: boolean = inputRef !== null;

  return (
    <>
      <label htmlFor={id}>{label}</label>
      {isUncontrolled ? (
        <input
          defaultValue={value}
          type={type}
          id={id}
          name={name}
          ref={inputRef}
          defaultChecked={checked}
        />
      ) : (
        <input
          value={value}
          type={type}
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
        />
      )}
    </>
  );
};

export default Input;
