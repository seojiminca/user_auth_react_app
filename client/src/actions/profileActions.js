import axios from 'axios';

import {
    GET_PROFILE,
    PROFILE_LOADING,
    GET_ERRORS,
    CLEAR_CURRENT_PROFILE
} from "./types";

//Get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());

    axios
        .get('/profiles')
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: {} //에러내용이 없다.
                //payload:err.response.data -> 에러정보를 던진다.
            })
        })
}

// Profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    };
};

// Clear profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    };
};