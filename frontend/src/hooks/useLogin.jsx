import { useState, useContext, useEffect } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

const useLogin = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { setIsLoggedIn } = useContext(AuthContext);
  const { setTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const login = async (email, password) => {
    if (!email || !password) {
      setErrorMessage("Please fill in all the fields");
      return;
    }
    try {
      const response = await authService.login(email, password);
      localStorage.setItem("access_token", response.token);
      const theme = response.using_darkmode ? "dark" : "light";
      localStorage.setItem("theme", theme);
      setTheme(theme);
      setLoginSuccess(true);
      setIsLoggedIn(true);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else if (error.request) {
        setErrorMessage("No response from server. Please try again later.");
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  useEffect(() => {
    if (loginSuccess) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [loginSuccess, navigate]);

  return {
    login,
    errorMessage,
    loginSuccess,
    setErrorMessage,
    setLoginSuccess,
  };
};

export default useLogin;
