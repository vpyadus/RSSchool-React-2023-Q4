import { ChangeEventHandler, RefObject } from 'react';
import { Genders } from '../../features/formDataSlice/formDataSlice';
import './style.css';

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
  inputRef?: RefObject<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  datalist?: Array<string>;
  error?: string;
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
    datalist = [],
    error = '',
  } = props;

  const isUncontrolled: boolean = inputRef !== null;
  const isDatalist: boolean = datalist.length > 0;
  const datalistId: string = isDatalist ? `datalist-${id}` : '';

  return (
    <>
      <div>
        <label htmlFor={id}>{label}</label>
        {isUncontrolled ? (
          <input
            defaultValue={value}
            type={type}
            id={id}
            name={name}
            ref={inputRef}
            defaultChecked={checked}
            list={datalistId}
          />
        ) : (
          <input
            value={value}
            type={type}
            id={id}
            name={name}
            checked={checked}
            onChange={onChange}
            list={datalistId}
          />
        )}
        <div className="error-message">&nbsp;{error}</div>
      </div>
      {isDatalist && (
        <datalist id={datalistId}>
          {datalist.map((country: string, index: number) => (
            <option value={country} key={index} />
          ))}
        </datalist>
      )}
    </>
  );
};

export default Input;
