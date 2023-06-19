import { useEffect, useState } from "react";

export function useSuccessMessage(data: any): boolean {
  const [showSuccess, setShowSuccess] = useState(!!data);

  useEffect(() => {
    if (!data) return;

    setShowSuccess(true);
    const timerId = setTimeout(() => setShowSuccess(false), 5000);

    return () => {
      clearTimeout(timerId);
    };
  }, [data]);

  return showSuccess;
}
