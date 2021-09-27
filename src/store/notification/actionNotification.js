import {
    LOAD_NOTIFICATION,
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
                    Authentification: `Bearder ${token}`
                }
            }
        }
    }
}

