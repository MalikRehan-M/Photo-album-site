import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [authState, setAuthState] = useState({
    isAuth: false,
    token: null,
    role: null,
    name:null
  });

  const loginUser = (val, rolevalue,namevalue) => {
    setAuthState({ isAuth: true, token: val, role:rolevalue,name:namevalue });
  };
  const logoutUser = () => {
    setAuthState({ isAuth: false, token: null, role: null,name:null });
  };

  let value = {
    authState,
    loginUser,
    logoutUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
