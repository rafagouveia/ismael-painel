import {combineReducers} from "redux";
import {
    CHECK_LOGIN_FAILURE,
    CHECK_LOGIN_STARTED,
    CHECK_LOGIN_SUCCESS,
    CHECK_LOGIN_RESET,
    CHECK_LOGGED, CHECK_LOGIN_LOGOUT
} from "../actions/types";


const _getSession = () => {
    let SESSION = localStorage.getItem('SESSION');
    if (SESSION !== null){
        return true
    }
    return false
};

const initialState = {
    loading: false,
    checkData: {
        username: '123',
        password: '123'
    },
    logged: _getSession(),
    status: false,
    error: false
};

const checkLogin = (state = initialState, action) => {
    switch (action.type) {
        case CHECK_LOGIN_STARTED:
            return {
                ...state,
                loading: true
            };
        case CHECK_LOGIN_SUCCESS:
            return {
                ...state,
                checkData: action.payload.response,
                status: action.payload.response.data.status,
                logged: true,
                loading: false
            };
        case CHECK_LOGIN_FAILURE:
            return {
                ...state,
                status: action.payload.data,
                logged: _getSession(),
                error: action.payload.error,
                loading: false
            };
        case CHECK_LOGIN_LOGOUT:
            return {
              ...state,
              logged: false
            };
        case CHECK_LOGIN_RESET:
            return {
                ...state,
                status: false
            };
        default:
            return state;
    }
};


const rootReducer = combineReducers({
    checkLogin: checkLogin
});

export default rootReducer;
