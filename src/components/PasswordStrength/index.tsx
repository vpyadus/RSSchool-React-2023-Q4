import './style.css';

export type PasswordStrengthProps = {
  strength: number;
};

const grades: Array<string> = ['absent', 'weak', 'medium', 'good', 'strong'];

const PasswordStrength = (props: PasswordStrengthProps): JSX.Element => {
  const { strength } = props;
  return (
    <div className="pswd__container">
      <div className="pswd__legend" hidden={strength < 1}>
        {grades[strength]}
      </div>
      <div className={`pswd strength1`} hidden={strength < 1}></div>
      <div className={`pswd strength2`} hidden={strength < 2}></div>
      <div className={`pswd strength3`} hidden={strength < 3}></div>
      <div className={`pswd strength4`} hidden={strength < 4}></div>
    </div>
  );
};

export default PasswordStrength;
