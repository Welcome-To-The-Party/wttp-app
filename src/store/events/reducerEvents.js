import {
    ADD_FAVORITE,
    CREATE_EVENT,
    FIND_EVENTS,
    LOAD_EVENTS,
    OWNER_EVENTS,
    PARTICIPE_EVENT,
    SET_ORGANISATION,
    SET_PARTICIPATION,

} from './type'

const initialState = {
    find_events: {
        isLoading: false,
        data: [],
        error: ""
    },
    event: {
        isLoading: false,
        data: {},
        error: ''
    },
    owner_event: {
        isLoading: false,
        data: {},
        error: ''
    },
    infos: {
        isLoading: false,
        message: "",
        error: ''
    },
    create: {
        isLoading: false,
        message: "",
        error: ''
    },
    organisations: {
        isLoading: false,
        data: {},
        error: ''
    },
    participations: {
        isLoading: false,
        data: {},
        error: ''
    }
}

const eventsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_EVENTS:
            return {
                ...state,
               find_events: {
                   ...state.find_events,
                   isLoading: true
               }
            }
        case `${FIND_EVENTS}_SUCCESS`:
            return {
                ...state,
                find_events: {
                    ...state.find_events,
                    isLoading: false,
                    data: action.payload.data.nearbyEvents,
                    error: ''
                }
            }
        case `${FIND_EVENTS}_FAIL`:
            return {
                ...state,
                find_events: {
                    ...state.find_events,
                    isLoading: false,
                    data: [],
                    error: action.payload
                }
            }
        case LOAD_EVENTS:
            return {
                ...state,
                event: {
                    ...state.event,
                    isLoading: true
                }
            }
        case `${LOAD_EVENTS}_SUCCESS`:
            return {
                ...state,
                event: {
                    ...state.event,
                    isLoading: false,
                    data: {
                        ...state.event.data,
                        [action.payload.id]: action.payload.data
                    },
                    error: ''
                }
            }
        case `${LOAD_EVENTS}_FAIL`:
            return {
                ...state,
                event: {
                    ...state.event,
                    isLoading: false,
                    data: [],
                    error: action.payload.error
                }
            }
        case OWNER_EVENTS:
            return {
                ...state,
                owner_event: {
                    ...state.owner_event,
                    isLoading: true
                }
            }
        case `${OWNER_EVENTS}_SUCCESS`:
            return {
                ...state,
                owner_event: {
                    ...state.owner_event,
                    isLoading: false,
                    data: {
                        ...state.owner_event.data,
                        [action.payload.id]: action.payload.data
                    },
                    error: ''
                }
            }
        case `${OWNER_EVENTS}_FAIL`:
            return {
                ...state,
                owner_event: {
                    ...state.owner_event,
                    isLoading: false,
                    data: [],
                    error: action.error
                }
            }
        case PARTICIPE_EVENT:
            return {
                ...state,
                infos: {
                    ...state.infos,
                    isLoading: true
                }
            }
        case `${PARTICIPE_EVENT}_SUCCESS`:
            console.log("participation", action.payload.data)
            return {
                ...state,
                infos: {
                    ...state.infos,
                    isLoading: false,
                    message: action.payload.data.status == 200?action.payload.data.data.message: action.payload.data.message,
                    error: ''
                }
            }
        case `${PARTICIPE_EVENT}_FAIL`:
            return {
                ...state,
                infos: {
                    ...state.infos,
                    isLoading: false,
                    message: "",
                    error: action.payload
                }
            }
        case ADD_FAVORITE:
            return {
                ...state,
                infos: {
                    ...state.infos,
                    isLoading: true
                }
            }
        case `${ADD_FAVORITE}_SUCCESS`:
            return {
                ...state,
                infos: {
                    ...state.infos,
                    isLoading: false,
                    message: action.payload,
                    error: ''
                }
            }
        case `${ADD_FAVORITE}_FAIL`:
            return {
                ...state,
                infos: {
                    ...state.infos,
                    isLoading: false,
                    message: "",
                    error: action.payload
                }
            }
        case CREATE_EVENT:
            return {
                ...state,
                create: {
                    ...state.create,
                    isLoading: true
                }
            }
        case `${CREATE_EVENT}_SUCCESS`:
            console.log("message", action.payload.data)
            return {
                ...state,
                create: {
                    ...state.create,
                    isLoading: false,
                    message: action.payload.data.message? action.payload.data.message: "Vous avez créé un evenement!",
                    error: ''
                }
            }
        case `${CREATE_EVENT}_FAIL`:
            return {
                ...state,
                create: {
                    ...state.create,
                    isLoading: false,
                    message: "",
                    error: action.payload
                }
            }
        case SET_ORGANISATION:
            return {
                ...state,
                organisations: {
                    ...state.organisations,
                    isLoading: true
                }
            }
        case `${SET_ORGANISATION}_SUCCESS`:
            return {
                ...state,
                organisations: {
                    ...state.organisations, 
                    isLoading: false,
                    data: action.payload.data.data,
                    error: ''
                }
            }
        case `${SET_ORGANISATION}_FAIL`:
            return {
                ...state,
                organisations: {
                    ...state.organisations,
                    isLoading: false,
                    data: "",
                    error: action.payload
                }
            }  
        case SET_PARTICIPATION:
            return {
                ...state,
                participations: {
                    ...state.participations,
                    isLoading: true
                }
            }
        case `${SET_PARTICIPATION}_SUCCESS`:
            console.log("data", action.payload.data)
            return {
                ...state,
                participations: {
                    ...state.participations, 
                    isLoading: false,
                    data: action.payload.data.data,
                    error: ''
                }
            }
        case `${SET_PARTICIPATION}_FAIL`:
            return {
                ...state,
                participations: {
                    ...state.participations,
                    isLoading: false,
                    data: "",
                    error: action.payload
                }  
            }          
        default:
            return state;
    }
}

export default eventsReducer; 