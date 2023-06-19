import { FC, useState, MouseEventHandler, createContext } from "react";

import { useTypedSelector } from "../../hooks/useTypedSelector";
import AuthMenu from "./AuthMenu";
import Auth from "../Auth";
import TasksList from "./TasksList";
import AddTaskForm from "./AddTaskForm";

import s from "./App.module.scss";

export type AuthFormContextValue = {
  showAuth: MouseEventHandler<HTMLButtonElement>;
  hideAuth: MouseEventHandler<HTMLButtonElement>;
};

export const AuthFormContext = createContext<AuthFormContextValue>({
  showAuth: () => {},
  hideAuth: () => {},
});

const App: FC = () => {
  const [isAuthActive, setIsAuthActive] = useState(false);
  const { user } = useTypedSelector(({ authSlice }) => authSlice);

  const showAuth: MouseEventHandler<HTMLButtonElement> = () => {
    setIsAuthActive(true);
  };

  const hideAuth: MouseEventHandler<HTMLButtonElement> = () => {
    setIsAuthActive(false);
  };

  const authClassName = isAuthActive ? s.authActive : s.authHidden;

  return (
    <main className={s.mainContainer}>
      <div className={s.sectionsWrapper}>
        <section className={s.sidePanel}>
          <AuthFormContext.Provider value={{ showAuth, hideAuth }}>
            <AuthMenu />
            <Auth className={`${s.auth} ${authClassName}`} />
          </AuthFormContext.Provider>

          {user && <AddTaskForm className={s.addingFormContainer} />}
        </section>
        <section className={s.mainSection}>
          <TasksList />
        </section>
      </div>
    </main>
  );
};

export default App;
