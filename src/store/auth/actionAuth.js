
import {
    SOCIAL_LOGIN, 
    LOGIN,
    REGISTER,
    RESET_PASSWORD
} from './type'
import { navigate } from '../../providers/navigationService'
import { getUser } from '../user/actionUser'

export const login = (data) => {
    return{
        type: LOGIN,
        payload: {
            request: {
                method: 'POST',
                url: '/auth/jwt/login',
                data: data,
            },
            options: {
                onSuccess({getState, dispatch, response}){
                    console.log("data", response.data.token)
                    if(response.data.status == 400){
                        dispatch({type: `${LOGIN}_FAIL`, error: "Email ou mot de passe incorrect"});
                    }else{
                        navigate("Home")
                        dispatch({type: `${LOGIN}_SUCCESS`, payload: response.data.token});
                        dispatch(getUser())
                    }
                },
                onError({getState, dispatch, error}){
                    console.log("error login", error)
                    dispatch({type: `${LOGIN}_FAIL`, error: "Email ou mot de passe incorrect"});
                }
            }
        }
    }
}


export const social_login = (user_data) => {
    return{
        type: SOCIAL_LOGIN,
        payload: {
            request: {
                method: 'POST',
                url: '/auth/social_connect',
                data: user_data,
            },
            options: {
                onSuccess({getState, dispatch, response}){
                    if(response.data.status == 400){
                        dispatch({type: `${SOCIAL_LOGIN}_FAIL`, error: "Erreur de connexion avec nos serveurs"});
                    }else{
                        navigate("Home")
                        dispatch({type: `${SOCIAL_LOGIN}_SUCCESS`, payload: response.data.token});
                        dispatch(getUser())
                    }
                },
                onError({getState, dispatch, error}){
                     console.log("error login", error)
                    dispatch({type: `${SOCIAL_LOGIN}_FAIL`, error: "Erreur de connexion avec nos serveurs"});
                }
            }
        }
    }
}


export const register = (data) => {
    console.log("data", data)
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
                    console.log("error register", error)
                    dispatch({
                        type: `${REGISTER}_FAIL`,
                        error: "Votre formulaire est invalid"
                    })
                }
            }
        }
    }
}

export const reset_password = (data) => {
    console.log("data", data)
    return{
        type: RESET_PASSWORD,
        payload: {
            request: {
                method: 'POST',
                url: '/auth/password_reset',
                data: data,
            },
        }
    }
}