import { FC, ChangeEventHandler } from "react";

import s from "./TextArea.module.scss";

interface TextAreaProps {
  className?: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const TextArea: FC<TextAreaProps> = ({
  className,
  value,
  placeholder,
  onChange,
}) => {
  const classNames = [s.textarea];
  className && classNames.push(className);

  const onTextAreaChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    onChange(e.target.value);
  };

  return (
    <textarea
      className={classNames.join(" ")}
      value={value}
      placeholder={placeholder}
      onChange={onTextAreaChange}
    >
      {value}
    </textarea>
  );
};

export default TextArea;
