"use client";

import { useEffect, useState } from "react";

/**
 * useMediaQuery
 * Reactive CSS media query flag. Starts `false` on the server / first paint
 * and syncs on the client, including live resize/orientation changes.
 *
 *   const isMobile = useMediaQuery("(max-width: 767px)");
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
