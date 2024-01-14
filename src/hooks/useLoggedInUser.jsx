import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosLocal from "./useAxiosLocal";

const useLoggedInUser = () => {
  const { user } = useAuth();
  const axiosLocal = useAxiosLocal();
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    axiosLocal
      .get(`/api/user/${user?.email}`)
      .then((res) => {
        setLoggedInUser(res?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosLocal, user?.email]);
  return { loggedInUser };
};

export default useLoggedInUser;
