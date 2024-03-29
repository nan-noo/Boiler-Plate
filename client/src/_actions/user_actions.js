import axios from '../axios';
import {USER_SERVER} from '../components/Config';
import {LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER} from './types';

export function loginUser(dataToSubmit){
    // 서버로부터 받은 데이터를 request에 저장
    const request = axios.post(`${USER_SERVER}/login`, dataToSubmit) 
        .then(response => response.data);

    // reducer에 넘겨준다.
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/register`, dataToSubmit) 
        .then(response => response.data);

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function auth(){
    const request = axios.get(`${USER_SERVER}/auth`) 
        .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get(`${USER_SERVER}/logout`) 
        .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}