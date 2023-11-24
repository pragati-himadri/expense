// ThemeContext.js
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isBlackTheme, setIsBlackTheme] = useState(false);

  const toggleTheme = () => {
    setIsBlackTheme((prev) => !prev);
    if (!isBlackTheme) {
        document.body.style.backgroundColor = `deep-blue`; 
      } else {
        document.body.style.backgroundColor = 'white'; 
      }
    console.log("hello");
  };

  return (
    <ThemeContext.Provider value={{ isBlackTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
