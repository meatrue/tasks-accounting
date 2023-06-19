import { useEffect, useState } from "react";

export function useErrorMessage(error: string | null): boolean {
  const [showError, setShowError] = useState(!!error);

  useEffect(() => {
    if (!error) return;

    setShowError(true);
    const timerId = setTimeout(() => setShowError(false), 5000);

    return () => {
      clearTimeout(timerId);
    };
  }, [error]);

  return showError;
}
