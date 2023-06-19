import { FC, useContext } from "react";

import AuthForm from "./AuthForm";

import s from "./Auth.module.scss";
import { AuthFormContext } from "../App";

interface AuthProps {
  className?: string;
}

const Auth: FC<AuthProps> = ({ className }) => {
  const { hideAuth } = useContext(AuthFormContext);

  const classNames = [s.mainContainer];
  className && classNames.push(className);

  return (
    <div className={classNames.join(" ")}>
      <header className={s.header}>
        <div className={s.headerPanel}>
          <button className={s.backButton} onClick={hideAuth}>
            <svg
              viewBox="0 0 24 24"
              height="24"
              width="24"
              preserveAspectRatio="xMidYMid meet"
              version="1.1"
              x="0px"
              y="0px"
              enableBackground="new 0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12,4l1.4,1.4L7.8,11H20v2H7.8l5.6,5.6L12,20l-8-8L12,4z"
              ></path>
            </svg>
          </button>
          <h2 className={s.title}>Авторизация</h2>
        </div>
      </header>

      <div className={s.formContainer}>
        <h3 className={s.formTitle}>Введите учетные данные</h3>
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
