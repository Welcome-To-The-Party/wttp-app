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
    SET_PARTICIPATION,

} from './type'

const initialState = {
    find_events: {
        isLoading: false,
        data: [],
        error: ""
    },
    currents_events: {
        isLoading: false,
        data: {},
        error: ''
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
    },
    accpet_participation: {
        isLoading: false,
        message: "",
        error: ''
    },
    refuse_participation: {
        isLoading: false,
        message: "",
        error: ''
    },
    cancel_participation: {
        isLoading: false,
        message: "",
        error: ''
    },
    pay_participation: {
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
        case FIND_CURRENT_EVENTS:
                return {
                    ...state,
                   currents_events: {
                       ...state.currents_events,
                       isLoading: true
                   }
                }
        case `${FIND_CURRENT_EVENTS}_SUCCESS`:
            return {
                ...state,
                currents_events: {
                    ...state.currents_events,
                    isLoading: false,
                    data: action.payload.data.data,
                    error: ''
                }
            }
        case `${FIND_CURRENT_EVENTS}_FAIL`:
            return {
                ...state,
                currents_events: {
                    ...state.currents_events,
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
                    data: action.payload.data,
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
            return {
                ...state,
                infos: {
                    ...state.infos,
                    isLoading: false,
                    message: action.payload.data.data?action.payload.data.data.message: action.payload.data.message,
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
        case ACCEPT_PARTICIPATION:
            return {
                ...state,
                accpet_participation: {
                    ...state.accpet_participation,
                    isLoading: true
                }
            }
        case `${ACCEPT_PARTICIPATION}_SUCCESS`:
            return {
                ...state,
                accpet_participation: {
                    ...state.accpet_participation, 
                    isLoading: false,
                    message: action.payload,
                    error: ''
                }
            }
        case `${ACCEPT_PARTICIPATION}_FAIL`:
            return {
                ...state,
                accpet_participation: {
                    ...state.accpet_participation,
                    isLoading: false,
                    message: "",
                    error: action.error
                }  
            } 
        case REFUSE_PARTICIPATION:
            return {
                ...state,
                refuse_participation: {
                    ...state.refuse_participation,
                    isLoading: true
                }
            }
        case `${REFUSE_PARTICIPATION}_SUCCESS`:
            console.log("data refuse", action.payload.data)
            return {
                ...state,
                refuse_participation: {
                    ...state.refuse_participation, 
                    isLoading: false,
                    message: action.payload,
                    error: ''
                }
            }
        case `${REFUSE_PARTICIPATION}_FAIL`:
            return {
                ...state,
                refuse_participation: {
                    ...state.refuse_participation,
                    isLoading: false,
                    message: "",
                    error: action.error
                }  
            }
        case CANCEL_PARTICIPATION:
            return {
                ...state,
                cancel_participation: {
                    ...state.cancel_participation,
                    isLoading: true
                }
            }
        case `${CANCEL_PARTICIPATION}_SUCCESS`:
            return {
                ...state,
                cancel_participation: {
                    ...state.cancel_participation, 
                    isLoading: false,
                    message: action.payload,
                    error: ''
                }
            }
        case `${CANCEL_PARTICIPATION}_FAIL`:
            return {
                ...state,
                cancel_participation: {
                    ...state.cancel_participation,
                    isLoading: false,
                    message: "",
                    error: action.error
                }  
            } 
        case PAY_PARTICIPATION:
            return {
                ...state,
                pay_participation: {
                    ...state.pay_participation,
                    isLoading: true
                }
            }
        case `${PAY_PARTICIPATION}_SUCCESS`:
            return {
                ...state,
                pay_participation: {
                    ...state.pay_participation, 
                    isLoading: false,
                    data: action.payload,
                    error: ''
                }
            }
        case `${PAY_PARTICIPATION}_FAIL`:
            return {
                ...state,
                pay_participation: {
                    ...state.pay_participation,
                    isLoading: false,
                    data: {},
                    error: action.error
                }  
            }        
        default:
            return state;
    }
}

export default eventsReducer; 