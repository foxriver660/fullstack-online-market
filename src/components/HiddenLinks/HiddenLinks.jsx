
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";

const ShowOnLogin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return children;
  }
  return null;
  
  
};
const ShowOnLogOut = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return children;
  }
  return null;
  
  
};
export {ShowOnLogin, ShowOnLogOut};
