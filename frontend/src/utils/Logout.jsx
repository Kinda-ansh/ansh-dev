    import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const isTokenValid = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decoded.exp > currentTime;
  } catch (error) {
    return false; // If token is invalid or decoding fails
  }
};

export const logout = () => {
  // Remove token from localStorage
  localStorage.removeItem("accessToken");
  // Navigate to the login page or logout route
  const navigate = useNavigate();
  navigate("/logout");
};
