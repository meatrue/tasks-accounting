import { FC, ChangeEventHandler } from "react";

import s from "./Input.module.scss";

type InputType = "text" | "password";

interface InputProps {
  className?: string;
  type: InputType;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const Input: FC<InputProps> = ({
  className,
  type,
  value,
  placeholder,
  onChange,
}) => {
  const classNames = [s.input];
  className && classNames.push(className);

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e.target.value);
  };

  return (
    <input
      className={classNames.join(" ")}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onInputChange}
    />
  );
};

export default Input;
