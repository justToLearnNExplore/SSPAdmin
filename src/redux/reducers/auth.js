import { AUTH, LOGOUT } from "../constants/actionTypes";

const initialState = {
    authData: JSON.parse(localStorage.getItem('user_info')) || null
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case AUTH :
           
            localStorage.setItem('user_info', JSON.stringify({ ...action?.data }))
            return { ...state, authData: action?.data};
        case LOGOUT :
            localStorage.clear();  
            return { ...state, authData: null};  
        default:
           return state;
    }
};

export default authReducer;