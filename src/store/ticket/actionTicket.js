import {
    GET_TICKET
} from './type'
import { DEV_URL } from '@env'

import {store} from '../configureStore'

export const get_ticket = (idEvent) => {
    console.log('idEvent', idEvent)
    return{
        type: GET_TICKET,
        payload: {
            request: {
                url: `/tickets/get_ticket/${idEvent}`,
                headers: {
                    Authorization: store.getState().auth.login.token
                }
            }
        }
    }
}

export const verify_ticket = (cypher) => {
    return DEV_URL + '/tickets/verify_ticket/' + cypher
}


