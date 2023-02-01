import React, {createContext, useState, useEffect} from "react";

export const Context = createContext();

const GeneralContext = ({children}) => {
  const [mushroomData, setMushroomData] = useState(null);
  const [userImageUri, setUserImageUri] = useState();
  //const defaultPath = <applicationserverendpointurlhere>

  const getMushroomFromDatabase = async () => {};

  useEffect(() => {
    getMushroomFromDatabase();
  }, []);

  return (
    <Context.Provider
      value={{
        mushroomData,
        setMushroomData,
        userImageUri,
        setUserImageUri,
        defaultPath,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default GeneralContext;
