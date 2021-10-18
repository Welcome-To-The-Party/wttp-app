import { useDispatch } from 'react-redux'
import {
    ADD_FAVORITE,
    CREATE_EVENT,
    FIND_EVENTS,
    LOAD_EVENTS,
    OWNER_EVENTS,
    PARTICIPE_EVENT
} from './type'
import {store} from '../configureStore'

const token = store.getState().auth.login.token

export const find_events = (data) => {
    console.log("data", data)
    return{
        type: FIND_EVENTS,
        payload: {
            request: {
                method: 'POST',
                url: '/events/find_nearby_events',
                headers: {
                    Authorization: `${token}`
                },
                data: data
            },
        }
    }
}

export const get_events = (idEvent) => {
    return{
        type: LOAD_EVENTS,
        payload: {
            request: {
                url: `/events/get_event/${idEvent}`,
                headers: {
                    Authorization: `${token}`
                },
            },
            options: {
                onSuccess({getState, dispatch, response}){
                    dispatch(get_owner_event(response.data.owner, idEvent))
                    dispatch({type: `${LOAD_EVENTS}_SUCCESS`, payload: {id: idEvent, data: response.data}}); 
                },
                onError({getState, dispatch, error}){
                    // dispatch({type: `${LOGIN}_FAIL`, error: error});
                }
            }
        }
    }
}

export const get_owner_event = (idOwner, idEvent) => {
    return{
        type: OWNER_EVENTS,
        payload: {
            request: {
                url: `/users/get_user/${idOwner}`,
                headers: {
                    Authorization: `${token}`
                },
            },
            options: {
                onSuccess({getState, dispatch, response}){
                    // console.log("data", JSON.parse(response.data))
                    dispatch({type: `${OWNER_EVENTS}_SUCCESS`, payload: {id: idEvent, data: response.data}}); 
                },
                onError({getState, dispatch, error}){
                    dispatch({type: `${LOGIN}_FAIL`, error: error});
                }
            }
        }
    }
}

export const participate_event = (data) => {
    return{
        type: PARTICIPE_EVENT,
        payload: {
            request: {
                method: "POST",
                url: `/participations/send_participation_demand`,
                headers: {
                    Authorization: `${token}`
                },
                data: data
            },
        }
    }
}

export const add_favorite = (data) => {
    return{
        type: ADD_FAVORITE,
        payload: {
            request: {
                method: "POST",
                url: `/users/add_favourite`,
                headers: {
                    Authorization: `${token}`
                },
                data: data
            },
        }
    }
}

export const create_event = (data) => {
    return{
        type: CREATE_EVENT,
        payload: {
            request: {
                method: "POST",
                url: `/events/create_event`,
                headers: {
                    Authorization: `${token}`
                },
                data: data
            },
        }
    }
}