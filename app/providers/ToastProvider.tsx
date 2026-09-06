"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Toast } from "../components/Toast";

type ToastType = "error" | "success";

type ToastContextType = {
  showToast: (message: string, type?: ToastType) => void;
};

export const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState("");
  const [type, setType] = useState<ToastType>("error");

  const showToast = useCallback(
    (message: string, type: ToastType = "error") => {
      setMessage(message);
      setType(type);
    },
    [],
  );

  const closeToast = useCallback(() => {
    setMessage("");
  }, []);

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
    }, 5000000);

    return () => clearTimeout(timer);
  }, [message]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {message && <Toast message={message} type={type} onClose={closeToast} />}
    </ToastContext.Provider>
  );
}
