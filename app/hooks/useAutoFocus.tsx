"use client";

import { useEffect, useRef } from "react";

export function useAutoFocus(dependency: unknown, disabled = false) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!disabled) {
      ref.current?.focus();
    }
  }, [dependency, disabled]);

  return ref;
}
