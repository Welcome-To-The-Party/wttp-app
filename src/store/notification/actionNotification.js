import {
    LOAD_NOTIFICATION, LOAD_ORDER_NOTIFICATION, SET_TOKEN_NOTIFICATION,
} from './type'

import {store} from '../configureStore'

const token = store.getState().auth.login.token

export const get_general_notifications = () => {
    return{
        type: LOAD_NOTIFICATION,
        payload: {
            request: {
                url: '/notifications/get_notifications',
                headers: {
                    Authorization: `${token}`
                }
            }
        }
    }
}

export const get_notification_participation = () => {
    return{
        type: LOAD_ORDER_NOTIFICATION,
        payload: {
            request: {
                url: '/notifications/get_unchecked_participation_demand',
                headers: {
                    Authorization: `${token}`
                }
            }
        }
    }
}


export const set_token_push = (data) => {
    return{
        type: SET_TOKEN_NOTIFICATION,
        payload: {
            request: {
                method: "PUT",
                url: '/users/push_token',
                headers: {
                    Authorization: `${token}`
                },
                data
            }
        }
    }
}
