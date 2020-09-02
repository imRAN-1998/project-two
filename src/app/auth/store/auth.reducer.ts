import { User } from '../user.model';
import * as AuthAction from './auth.actions';

export interface State{
    user : User;
    authError : string;
    loading : boolean;
}
const initalState : State={
    user : null,
    authError : null,
    loading: false
}
export function authReducer(state : State=initalState,action : AuthAction.AuthActionsType){
    switch(action.type){
        case AuthAction.AUTHENTICATE_SUCCESS : 
            const user1 = new User(action.payload.email,
                action.payload.userId,
                action.payload.token,
                action.payload.expirationDate);
            return{
                ...state,
                authError : null,
                loading:false,
                user : user1
            };
        case AuthAction.LOGOUT : 
            return {
                ...state,
                user : null
            };
        case AuthAction.LOGIN_START:
        case AuthAction.SIGNUP_START:
            return{
                ...state,
                authError : null,
                loading:true
            }
        case AuthAction.AUTHENTICATE_FAIL:
            return {
                ...state,
                authError : action.payload,
                loading:false,
                user : null
            }
        case AuthAction.CLEAR_ERROR:
            return{
                ...state,
                authError:null
            }
        default : 
            return state;
    }
}