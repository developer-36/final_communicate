import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
// import jwtDecode from "jwt-decode";
import parseJwt from "../utility/jwt";

const UserGetAllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("jwt_token");
        if (token) {
          const user = parseJwt(token); // Decodes the payload
          console.log(user); // Outputs the decoded payload
          setLoading(false);
          //  return;

          const response = await axios.get("/api/user/getUserProfile", {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`, // Ensure space between Bearer and token
            },
          });

          setAllUsers(response.data);
        }



      } catch (error) {
        console.error("Error in getUsers:", error);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  return [allUsers, loading];
};

export default UserGetAllUsers;
