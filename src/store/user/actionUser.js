import { useDispatch } from 'react-redux'
import {
    MY_EVENT,
    SET_USER,
    STRIPE_URL,
} from './type'
import {store} from '../configureStore'
import { REMOVE_TOKEN } from '../auth/type'
import { httpClient } from '../../config/http'
// import { httpClient } from '@config/http'

const token = store.getState().auth.login.token

export const getUser = () => {
    return{
        type: SET_USER,
        payload: {
            request: {
                url: '/users/profile',
                headers: {
                    Authentification: `Bearder ${token}`
                }
            }
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
            Authentification: `Bearder ${token}`
        }
    })
}
