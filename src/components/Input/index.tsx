import { Ref } from 'react';

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
  inputRef?: Ref<HTMLInputElement>;
  value?: string | number;
  checked?: boolean;
};

const Input = (props: InputProps): JSX.Element => {
  const {
    id,
    name,
    type,
    label,
    inputRef = null,
    value = '',
    checked = false,
  } = props;
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        defaultValue={value}
        type={type}
        id={id}
        name={name}
        ref={inputRef}
        defaultChecked={checked}
      />
    </>
  );
};

export default Input;
