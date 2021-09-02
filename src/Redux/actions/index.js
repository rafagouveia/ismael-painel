import {
    ADD_PRODUCT,
    CHECK_LOGIN_FAILURE,
    CHECK_LOGIN_STARTED,
    CHECK_LOGIN_SUCCESS,
    DELETE_PRODUCT,
    GET_LOGIN_DATA,
    GET_PRODUCT,
    CHECK_LOGIN_RESET,
    CHECK_LOGGED, CHECK_LOGIN_LOGOUT
} from "./types";
import api from "./../../services/api";


export const checkAll = (url, data) => {
    return dispatch => {

        dispatch({type: CHECK_LOGIN_STARTED});

        api.get(url, { params: data })
            .then(function (response) {
                if (response.data.status === "success") {
                    localStorage.setItem('SESSION', JSON.stringify(response.data))
                    dispatch({
                        type: CHECK_LOGIN_SUCCESS,
                        payload: {response}
                    });


                } else {
                    dispatch({
                        type: CHECK_LOGIN_FAILURE,
                        payload: {response}
                    });
                    console.log(response)
                }

            })
            .catch(function (error) {
                dispatch({type: CHECK_LOGIN_FAILURE, payload: {error}});
            });

    };
};

export const resetStatus = () => {
    return dispatch => {
        dispatch({type: CHECK_LOGIN_RESET});
    }
};

export const logout = () => {
    return dispatch => {
        dispatch({type: CHECK_LOGIN_LOGOUT, payload: {logged: false} });
    }
};