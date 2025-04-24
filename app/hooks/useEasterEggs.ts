import { useEffect, useRef } from "react";
import { init as initClickStorm } from "./eggs/clickStorm";

export function useEasterEggs() {
  const titleRef = useRef<HTMLHeadingElement>(null!);

  useEffect(() => {
    const cleaners = [
      initClickStorm(titleRef), 
    ].filter(Boolean) as (() => void)[];

    return () => cleaners.forEach((fn) => fn());
  }, []);

  return { titleRef };
}
