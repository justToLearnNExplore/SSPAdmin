import React, { useState } from "react";
import "./LoginSignup.css";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { login, signup, signInWithGoogle, signUpWithGoogle } from "../../redux/actions/authActions";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const initialState = {
    username: "",
    email: "",
    password: "",
    phone: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [successMessage, setSuccessMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      alert("Please fill in all required fields.");
      return false;
    }
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return false;
    }
    if (!isLogin && (!formData.username || !formData.phone)) {
      alert("Please fill in all required fields.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (isLogin) {
      dispatch(login(formData, navigate));
    } else {
      dispatch(signup(formData, navigate));
    }

    setFormData(initialState); // Reset fields after submission
  };

  const handleGoogleLoginSuccess = async (tokenResponse) => {
    const accessToken = tokenResponse.access_token;

    if (isLogin) {
      dispatch(signInWithGoogle(accessToken, navigate));
    } else {
      dispatch(signUpWithGoogle(accessToken, navigate));
    }
  };

  const handleGoogleLoginError = (error) => {
    
    alert('Google Authentication Failed!...Try again later');
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleLoginSuccess,
    onError: handleGoogleLoginError,
    cookiePolicy: 'single_host_origin',
  });

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Welcome Back!</h2>
        <p>Please {isLogin ? "sign in" : "sign up"} to continue.</p>
        {isLogin ? (
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="email"
                value={formData.email}
                onChange={handleChange}
              />
              
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="password"
                value={formData.password}
                onChange={handleChange}
              />
              
            </div>
            <button type="submit">Login</button>
          </form>
        ) : (
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="username"
                placeholder=""
                value={formData.username}
                onChange={handleChange}
              />
              <label>Username</label>
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder=""
                value={formData.email}
                onChange={handleChange}
              />
              <label>Email</label>
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="at least 6 characters long"
                value={formData.password}
                onChange={handleChange}
              />
              <label>Password</label>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="phone"
                placeholder=""
                value={formData.phone}
                onChange={handleChange}
              />
              <label>Phone</label>
            </div>
            <button type="submit">Sign Up</button>
          </form>
        )}
        <div className="or-separator">
          <span>OR</span>
        </div>

        <div className="social-login">
          <button className="signInWithGoogle" onClick={() => googleLogin()}>
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google Logo"
              className="google-logo"
            />
            Sign in with Google
          </button>
        </div>

        <p className="toggle-link">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)} className="login-text">
            {isLogin ? " Sign Up here!" : " Login here!"}
          </span>
        </p>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
};

export default LoginSignup;
