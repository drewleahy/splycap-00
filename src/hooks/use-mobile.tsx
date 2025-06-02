
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      console.log('Mobile check:', { 
        windowWidth: window.innerWidth, 
        breakpoint: MOBILE_BREAKPOINT, 
        isMobile: mobile 
      });
      setIsMobile(mobile);
    };

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      checkMobile();
    }
    
    mql.addEventListener("change", onChange)
    checkMobile(); // Initial check
    
    return () => mql.removeEventListener("change", onChange)
  }, [])

  React.useEffect(() => {
    console.log('useIsMobile result:', isMobile);
  }, [isMobile]);

  return !!isMobile
}
