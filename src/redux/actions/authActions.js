import { AUTH } from "../constants/actionTypes";
import * as api from "../../api/authApi";

export const loadUser = () => async (dispatch) => {
   const localUser = JSON.parse(localStorage.getItem('user_info'))

   if(localUser){
      dispatch({type: AUTH, data:localUser})
   }
}

export const login = (formData, navigate) => async (dispatch) => {
    try {
        const {data} = await api.login(formData);
        dispatch({type: AUTH, data});
        navigate('/')
    } catch (error) {
        alert(`Login failed: ${error.response?.data?.error || error.response?.data?.message || error.message}`);
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const {data} = await api.signup(formData);
        dispatch({type: AUTH, data});
        navigate('/')
    } catch (error) {
        alert(`Signup failed: ${error.response?.data?.error || error.response?.data?.message || error.message}`);
    }
}

export const signInWithGoogle = (accessToken, navigate) => async (dispatch) => {
    try {
        const {data} = await api.signInWithGoogle(accessToken);
        dispatch({type: AUTH, data});
        navigate('/')
    } catch (error) {
        alert(`Signin with Google failed: ${error.response?.data?.error || error.response?.data?.message || error.message}`);
    }
}

export const signUpWithGoogle = (accessToken, navigate) => async (dispatch) => {
    try {
        const {data} = await api.signUpWithGoogle(accessToken);
        dispatch({type: AUTH, data});
        navigate('/')
    } catch (error) {
        alert(`Signin with Google failed: ${error.response?.data?.error || error.response?.data?.message || error.message}`);
    }
}

export const getUsers = () => async (dispatch) => {
    try {
        const { data } = await api.getUsers();
        return data; // Return data so it can be used in the component
    } catch (error) {
        alert(`Fetching users failed: ${error.response?.data?.error || error.response?.data?.message || error.message}`);
    }
};

export const deleteUser = (userId) => async (dispatch) => {
    try {
        await api.deleteUser(userId);
        dispatch(loadUser());
    } catch (error) {
        alert(`Delete user failed: ${error.response?.data?.error || error.response?.data?.message || error.message}`);
    }
};

