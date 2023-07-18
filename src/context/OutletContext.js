// import React, { createContext } from 'react';

// const OutletContext = createContext(null);

// export const OutletContextProvider = ({ value, children }) => {
//   return (
//     <OutletContext.Provider value={value}>
//       {children}
//     </OutletContext.Provider>
//   );
// };

// export const useOutletContext = () => {
//   return React.useContext(OutletContext);
// };
// import React, { createContext, useState } from 'react';

// export const OutletContext = createContext(null);

// export const OutletContextProvider = ({ children }) => {
//   const [user, setUser] = useState('');

//   return (
//     <OutletContext.Provider value={{ user, setUser }}>
//       {children}
//     </OutletContext.Provider>
//   );
// };
import { createContext } from "react";

// Initialize a Context with default value of null
const OutletContext = createContext(null);

export default OutletContext;
