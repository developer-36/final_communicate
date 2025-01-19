import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import parseJwt from "../utility/jwt";

// eslint-disable-next-line react-refresh/only-export-components
 const AuthContext = createContext();
 const AuthProvider = ({ children }) => {
   const initialUserState = Cookies.get("jwt_token") || localStorage.getItem("messanger");
  // Parse the user data and store it in the state
  const [authUser, setAuthUser] = useState(
    initialUserState ? parseJwt(initialUserState) : undefined,
  );

  console.log("<=================authUser=========>", authUser)


  const login = (userData) => {
    console.log("<=================login=========>")
    setAuthUser(userData);
  };

  const logout = () => {
    console.log("<=================logout=========>")
    setAuthUser(null);
    localStorage.removeItem("messanger");
  };

  return (
    <AuthContext.Provider value={[authUser, login, logout]}>
      {children}
    </AuthContext.Provider>
  );
};

// Add PropTypes validation
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
