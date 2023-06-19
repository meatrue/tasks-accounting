import { FC, MouseEventHandler } from "react";

import s from "./Button.module.scss";

export enum ButtonType {
  BUTTON = "button",
  SUBMIT = "submit",
  RESET = "reset",
}

export enum ButtonColor {
  DEFAULT = "green",
  GRAY = "gray",
}

interface ButtonProps {
  className?: string;
  type: ButtonType;
  text: string;
  color?: ButtonColor;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  className,
  text,
  color,
  onClick,
  ...props
}) => {
  const classNames = [s.button];
  className && classNames.push(className);
  (color && classNames.push(s[color])) ||
    classNames.push(s[ButtonColor.DEFAULT]);

  return (
    <button
      className={classNames.join(" ")}
      onClick={onClick && onClick}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
