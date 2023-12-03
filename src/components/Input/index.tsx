import { ChangeEventHandler, ForwardedRef, forwardRef } from 'react';
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
  onChange?: ChangeEventHandler<HTMLInputElement>;
  datalist?: Array<string>;
  error?: string;
};

const Input = forwardRef(
  (
    props: InputProps,
    inputRef: ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
    const {
      id,
      name,
      type,
      label,
      value = '',
      checked = false,
      onChange,
      datalist = [],
      error = '',
    } = props;

    const isDatalist: boolean = datalist.length > 0;
    const datalistId: string = isDatalist ? `datalist-${id}` : '';
    const isFileUpload: boolean = type === 'file';

    return (
      <>
        <div>
          <label htmlFor={id}>{label}</label>
          {isFileUpload ? (
            <input
              type={type}
              id={id}
              name={name}
              onChange={onChange}
              ref={inputRef}
            />
          ) : (
            <input
              defaultValue={value}
              type={type}
              id={id}
              name={name}
              ref={inputRef}
              defaultChecked={checked}
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
  }
);

export default Input;
