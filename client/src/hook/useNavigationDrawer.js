import { useState } from "react";

const useNavigationDrawer = (initialValue, timeoutDelay = 0) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(initialValue);

  const closeDrawer = (newValue) => {
    setTimeout(() => {
      setIsDrawerOpen(newValue);
    }, timeoutDelay);
  };

  return [isDrawerOpen, setIsDrawerOpen, closeDrawer];
};

export default useNavigationDrawer;
