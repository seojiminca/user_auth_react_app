import {GET_ERRORS, SET_CURRENT_USER} from "./types";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from "../utils/setAuthToken";

//화면이동. 회원가입이 됐을떄 로그인페이지 이동.
export const registerUser = (userData, history) => dispatch => {

    axios
        .post('users/signup', userData)
        .then(res => history.push('/login'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload:err.response.data
            })
        );
};

export const loginUser = (userData, history) => dispatch => {
    axios
        .post('users/login', userData)
        .then(res => {
            const {token} = res.data;

            //Set token to localStorage
            localStorage.setItem('jwtToken', token);

            // Set token to Auth header
            setAuthToken(token);

            const decoded = jwt_decode(token);

            dispatch(setCurrentUser(decoded));

        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload:err.response.data
            })
        )
};

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};