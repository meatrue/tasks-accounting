import { FC } from "react";

import GetAuthButton from "../../GetAuthButton";

import s from "./AuthMenu.module.scss";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

interface AuthMenuProps {
  className?: string;
}

const AuthMenu: FC<AuthMenuProps> = ({ className }) => {
  const { user } = useTypedSelector(({ authSlice }) => authSlice);

  const name = user?.name ?? null;

  const classNames = [s.header];
  className && classNames.push(className);

  return (
    <div className={classNames.join(" ")}>
      <GetAuthButton />
      {name && <div className={s.userName}>{name}</div>}
    </div>
  );
};

export default AuthMenu;
