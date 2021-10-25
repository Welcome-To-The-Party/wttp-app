import {
    STRIPE_URL, STRIPE_URL_SUCCESS,
} from './type'

import {store} from '../configureStore'

const token = store.getState().auth.login.token

export const get_stripe_dashboard = () => {
    return{
        type: STRIPE_URL,
        payload: {
            request: {
                url: '/banking/get_stripe_dashboard_url',
                headers: {
                    Authorization: store.getState().auth.login.token
                }
            },
            options: {
                onSuccess({getState, dispatch, response}){
                    dispatch({type: STRIPE_URL_SUCCESS, payload: response.data.url})
                },
                onError({getState, dispatch, error}){
                    console.log("error get_stripe_dashboard", error)
                }
            }
        }
    }
}

export const create_stripe_account = () => {
    return{
        type: STRIPE_URL,
        payload: {
            request: {
                url: '/banking/create_stripe_account',
                headers: {
                    Authorization: store.getState().auth.login.token
                }
            },
            options: {
                onSuccess({getState, dispatch, response}){
                    dispatch({type: STRIPE_URL_SUCCESS, payload: response.data.accountLinks.url})
                },
                onError({getState, dispatch, error}){
                    console.log("error create_stripe_account", error)
                }
            }
        }
    }
}