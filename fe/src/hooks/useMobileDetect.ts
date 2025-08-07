import { useEffect, useState } from "react";

export const useMobileDetect = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState<null | boolean>(null);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, [breakpoint]);

  return isMobile;
};
