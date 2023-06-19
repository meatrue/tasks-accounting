import { FC, FormEventHandler, MouseEventHandler, useState } from "react";

import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { fetchAuthorizedUser, logout } from "../../../redux/authSlice";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useSuccessMessage } from "../../../hooks/useSuccessMessage";
import { useErrorMessage } from "../../../hooks/useErrorMessage";
import Button, { ButtonColor, ButtonType } from "../../ui-kit/Button";
import Input from "../../ui-kit/Input";

import s from "./AuthForm.module.scss";

const AuthForm: FC = () => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useTypedDispatch();
  const { user, error, loading } = useTypedSelector((state) => state.authSlice);

  const showSuccess = useSuccessMessage(user);
  const showError = useErrorMessage(error);

  const onFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setName("");
    setPassword("");

    dispatch(fetchAuthorizedUser({ name, password }));
  };

  const onLogout: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(logout());
  };

  const onNameChange = (name: string) => {
    setName(name);
  };

  const onPasswordChange = (password: string) => {
    setPassword(password);
  };

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <div className={s.formItem}>
          <label className={s.label}>Имя:</label>
          <Input
            className={s.textInput}
            type="text"
            placeholder="Введите имя"
            value={name}
            onChange={onNameChange}
          />
        </div>

        <div className={s.formItem}>
          <label className={s.label}>Пароль:</label>
          <Input
            className={s.textInput}
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={onPasswordChange}
          />
        </div>

        <div className={s.formItem}>
          {!user ? (
            <Button
              className={s.submit}
              type={ButtonType.SUBMIT}
              text={loading ? "Проверяем..." : "Подтвердить"}
              disabled={!name || !password || loading}
            />
          ) : (
            <Button
              className={s.submit}
              type={ButtonType.BUTTON}
              text="Выйти"
              color={ButtonColor.GRAY}
              onClick={onLogout}
            />
          )}
        </div>
      </form>

      {!!showSuccess && (
        <div className={s.successMessage}>Вы успешно авторизовались</div>
      )}
      {!!showError && <div className={s.error}>{error}</div>}
    </>
  );
};

export default AuthForm;
