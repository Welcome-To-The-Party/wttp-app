import { useDispatch } from 'react-redux'
import {
    ACCEPT_PARTICIPATION,
    ADD_FAVORITE,
    CANCEL_PARTICIPATION,
    CREATE_EVENT,
    FIND_CURRENT_EVENTS,
    FIND_EVENTS,
    LOAD_EVENTS,
    OWNER_EVENTS,
    PARTICIPE_EVENT,
    PAY_PARTICIPATION,
    REFUSE_PARTICIPATION,
    SET_ORGANISATION,
    SET_PARTICIPATION
} from './type'
import {store} from '../configureStore'
import { getUser } from '../user/actionUser'

const token = store.getState().auth.login.token



export const find_events = (data) => {
    return{
        type: FIND_EVENTS,
        payload: {
            request: {
                method: 'POST',
                url: '/events/find_nearby_events',
                headers: {
                    Authorization: store.getState().auth.login.token
                },
                data: data
            },
        }
    }
}

export const find_current_events = () => {
    return{
        type: FIND_CURRENT_EVENTS,
        payload: {
            request: {
                method: 'POST',
                url: '/events/find_events',
                headers: {
                    Authorization: store.getState().auth.login.token
                }
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
                    Authorization: store.getState().auth.login.token
                },
            },
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
                    Authorization: store.getState().auth.login.token
                },
            },
            options: {
                onSuccess({getState, dispatch, response}){
                    // console.log("data", JSON.parse(response.data))
                    dispatch({type: `${OWNER_EVENTS}_SUCCESS`, payload: {id: idEvent, data: response.data}}); 
                },
                onError({getState, dispatch, error}){
                    dispatch({type: `${OWNER_EVENTS}_FAIL`, error: error});
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
                    Authorization: store.getState().auth.login.token
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
                    Authorization: store.getState().auth.login.token
                },
                data: data
            },
            options: {
                onSuccess({getState, dispatch, response}){
                    // console.log("data", JSON.parse(response.data))
                    dispatch({type: `${ADD_FAVORITE}_SUCCESS`, payload: response.data.message});
                    dispatch(getUser())
                },
                onError({getState, dispatch, error}){
                    dispatch({type: `${ADD_FAVORITE}_FAIL`, error: error});
                }
            }
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
                    Authorization: store.getState().auth.login.token
                },
                data: data
            },
        }
    }
}

export const get_organisations = (data) => {
    return{
        type: SET_ORGANISATION,
        payload: {
            request: {
                url: `/users/get_organisations`,
                headers: {
                    Authorization: store.getState().auth.login.token
                },
                data: data
            },
        }
    }
}

export const get_participations = (data) => {
    return{
        type: SET_PARTICIPATION,
        payload: {
            request: {
                url: `/users/get_participations`,
                headers: {
                    Authorization: store.getState().auth.login.token
                },
                data: data
            },
        }
    }
}

export const accept_participation = (data) => {
    return{
        type: ACCEPT_PARTICIPATION,
        payload: {
            request: {
                method: "POST",
                url: `/participations/accept_participation_demand`,
                headers: {
                    Authorization: store.getState().auth.login.token
                },
                data: data
            },
            options: {
                onSuccess({getState, dispatch, response}){
                    // console.log("data", JSON.parse(response.data))
                    console.log('reponse accept participation', response.data)
                    dispatch({type: `${ACCEPT_PARTICIPATION}_SUCCESS`, payload: response.data.message})
                    dispatch(get_events(data.eventid))
                },
                onError({getState, dispatch, error}){
                    console.log('rerror accept participation', error)
                    dispatch({type:  `${ACCEPT_PARTICIPATION}_FAIL`, error: "Erreur interne au serveur"})
                }
            }
        }
    }
}

export const refuse_participation = (data) => {
    return{
        type: REFUSE_PARTICIPATION,
        payload: {
            request: {
                method: "POST",
                url: `/participations/refuse_participation_demand`,
                headers: {
                    Authorization: store.getState().auth.login.token
                },
                data: data
            },
            options: {
                onSuccess({getState, dispatch, response}){
                    // console.log("data", JSON.parse(response.data))
                    console.log('reponse refuse participation', response.data)
                    dispatch({type: `${REFUSE_PARTICIPATION}_SUCCESS`, payload: response.data.message})
                    dispatch(get_events(data.eventid))
                },
                onError({getState, dispatch, error}){
                    console.log('rerror refuse participation', error)
                    dispatch({type:  `${REFUSE_PARTICIPATION}_FAIL`, error: "Erreur interne au serveur"})
                }
            }
        }
    }
}

export const cancel_participation = (data) => {
    return{
        type: CANCEL_PARTICIPATION,
        payload: {
            request: {
                method: "POST",
                url: `/participations/cancel_participation`,
                headers: {
                    Authorization: store.getState().auth.login.token
                },
                data: data
            },
            options: {
                onSuccess({getState, dispatch, response}){
                    dispatch({type: `${CANCEL_PARTICIPATION}_SUCCESS`, payload: response.data.message})
                    dispatch(get_participations())
                },
                onError({getState, dispatch, error}){
                    dispatch({type:  `${CANCEL_PARTICIPATION}_FAIL`, error: "Erreur interne au serveur"})
                }
            }
        }
    }
}

export const pay_participation = (data) => {
    return{
        type: PAY_PARTICIPATION,
        payload: {
            request: {
                method: "POST",
                url: `/banking/pay_for_event`,
                headers: {
                    Authorization: store.getState().auth.login.token
                },
                data: data
            },
            options: {
                onSuccess({getState, dispatch, response}){
                    console.log('reponse refuse participation', response.data)
                    dispatch({type: `${PAY_PARTICIPATION}_SUCCESS`, payload: response.data})
                    // dispatch(get_participations())
                },
                onError({getState, dispatch, error}){
                    console.log('rerror refuse participation', error)
                    dispatch({type:  `${PAY_PARTICIPATION}_FAIL`, error: "Erreur interne au serveur"})
                }
            }
        }
    }
}