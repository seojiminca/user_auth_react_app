import {GET_ERRORS} from "./types";
import axios from 'axios';

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
        .then(res => history.push('/'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload:err.response.data
            })
        )
}