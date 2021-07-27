import {LOGIN_USER, REGISTER_USER} from '../_actions/types';

export default function(previousState = {}, action){
    switch(action.type){
        case LOGIN_USER:
            return {...previousState, loginSuccess: action.payload};
        case REGISTER_USER:
            return {...previousState, register: action.payload};
            
        default:
            return previousState;
            
    }
}