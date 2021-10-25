import { useDispatch } from 'react-redux'
import {
    DELETE_ACCOUNT,
    SET_USER,
    UPDATE_PROFIL,
} from './type'
import {store} from '../configureStore'
import { REMOVE_TOKEN } from '../auth/type'
import { httpClient } from '../../config/http'
import { navigation } from '../../providers/navigationService'
import { CommonActions } from '@react-navigation/native';
// import { httpClient } from '@config/http'

const token = store.getState().auth.login.token

console.log("token", token)

export const getUser = () => {
    return{
        type: SET_USER,
        payload: {
            request: {
                url: '/users/profile',
                headers: {
                    Authorization: store.getState().auth.login.token
                }
            },
        }
    }
}

export const log_out = () => {
    return {
        type: REMOVE_TOKEN
    }
}

export const get_my_event = (idEvent) => {
    return httpClient.get(`/events/get_event/${idEvent}`, {
        headers: {
            Authorization: store.getState().auth.login.token
        }
    })
}


export const update_profil = (data) => {
    console.log("data", data)
    return{
        type: UPDATE_PROFIL,
        payload: {
            request: {
                method: "POST",
                url: '/users/update_profile',
                headers: {
                    Authorization: store.getState().auth.login.token
                },
                data: data
            },
            options: {
                onSuccess({getState, dispatch, response}){
                    if(response.data.status == 200){
                        dispatch({type: `${UPDATE_PROFIL}_SUCCESS`, payload: response.data.message})
                        dispatch(getUser())
                    }
                },
                onError({getState, dispatch, error}){
                    console.log("error", error)
                    dispatch({type: `${UPDATE_PROFIL}_FAIL`, error: "Une erreur est survenu, veuillez réessayer plutart"});
                }
            }
        }
    }
}

export const delete_account = (data) => {
    return{
        type: DELETE_ACCOUNT,
        payload: {
            request: {
                url: '/users/delete_account',
                headers: {
                    Authorization: store.getState().auth.login.token
                }
            },
            options: {
                onSuccess({getState, dispatch, response}){
                    if(response.data.status == 200){
                        dispatch(log_out())
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 1,
                                routes: [{name: "Welcome"}]
                            })
                        )
                    }
                },
                onError({getState, dispatch, error}){
                    dispatch({type: `${DELETE_ACCOUNT}_FAIL`, error: "la suppression du compte a echoué"});
                }
            }
        }
    }
}