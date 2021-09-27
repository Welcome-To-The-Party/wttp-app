
import {
    LOGIN_FACEBOOK, 
    LOGIN_GOOGLE,
    LOGIN,
    REGISTER
} from './type'
import { navigate } from '../../providers/navigationService'
import { getUser } from '../user/actionUser'

export const login = (data) => {
    return{
        type: LOGIN,
        payload: {
            request: {
                method: 'POST',
                url: '/auth/local/login',
                data: data,
            },
            options: {
                onSuccess({getState, dispatch, response}){
                    console.log("data", response.data)
                    if(response.data.status == 400){
                        dispatch({type: `${LOGIN}_FAIL`, error: "Email ou mot de passe incorrect"});
                    }else{
                        navigate("Home")
                        dispatch({type: `${LOGIN}_SUCCESS`, payload: response.data});
                        dispatch(getUser())
                    }
                },
                onError({getState, dispatch, error}){
                    dispatch({type: `${LOGIN}_FAIL`, error: "Email ou mot de passe incorrect"});
                }
            }
        }
    }
}

export const login_facebook = () => {
    return{
        type: LOGIN_FACEBOOK,
        payload: {
            request: {
                url: '/auth/facebook'
            },
            options: {
                onSuccess({getState, dispatch, response}){
                    console.log("data", response)
                },
                onError({getState, dispatch, error}){
                    console.log("error", error)
                }
            }
        }
    }
}

export const login_google = () => {
    return{
        type: LOGIN_GOOGLE,
        payload: {
            request: {
                url: '/auth/google'
            },
        }
    }
}

export const register = (data) => {
    return{
        type: REGISTER,
        payload: {
            request: {
                method: 'POST',
                url: '/auth/local/register',
                data: data,
            },
            options: {
                onSuccess({getState, dispatch, response}){
                    console.log("register", response.data)
                    if(response.data.status == 200){
                        dispatch({
                            type:`${REGISTER}_SUCCESS`,
                            payload: response.data.message
                        })
                    }
                    else if(response.data.status == 400){
                        dispatch({
                            type: `${REGISTER}_FAIL`,
                            error: response.data.message
                        })
                    }
                    else if(response.data.status == 500 && response.data.message){
                        dispatch({
                            type: `${REGISTER}_FAIL`,
                            error: response.data.message
                        })
                    }
                    else{
                        dispatch({
                            type: `${REGISTER}_FAIL`,
                            error: "Votre formulaire est invalid"
                        })
                    }
                },
                onError({getState, dispatch, error}){
                    dispatch({
                        type: `${REGISTER}_FAIL`,
                        error: "Votre formulaire est invalid"
                    })
                }
            }
        }
    }
}