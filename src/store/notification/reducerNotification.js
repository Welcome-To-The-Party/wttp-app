import {
    LOAD_NOTIFICATION, 
    LOAD_ORDER_NOTIFICATION,
    SET_TOKEN_NOTIFICATION
} from './type'

const initialState = {
    general: {
        isLoading: false,
        list: [],
        error: ''
    },
    participation: {
        isLoading: false,
        list: [],
        error: ''
    },
    notificationPush: {
        isLoading: false,
        token: "",
        isNotif: false,
        error: ""
    }
}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_NOTIFICATION:
            return {
                ...state,
                general: {
                    ...state.general,
                    isLoading: true,
                }
            }
        case `${LOAD_NOTIFICATION}_SUCCESS`:
            return {
                ...state,
                general: {
                    ...state.general,
                    isLoading: false,
                    list: action.payload.data.data,
                    error: ''
                }
            }
        case `${LOAD_NOTIFICATION}_FAIL`:
            return {
                ...state,
                general: {
                    ...state.general,
                    isLoading: false,
                    list: [],
                    error: action.payload
                }
            }
        case LOAD_ORDER_NOTIFICATION:
            return {
                ...state,
                participation: {
                    ...state.participation,
                    isLoading: true,
                }
            }
        case `${LOAD_ORDER_NOTIFICATION}_SUCCESS`:
            return {
                ...state,
                participation: {
                    ...state.participation,
                    isLoading: false,
                    list: action.payload.data,
                    error: ''
                }
            }
        case `${LOAD_ORDER_NOTIFICATION}_FAIL`:
            return {
                ...state,
                participation: {
                    ...state.participation,
                    isLoading: false,
                    list: [],
                    error: action.payload
                }
            }
        case SET_TOKEN_NOTIFICATION:
            return {
                ...state,
                notificationPush: {
                    ...state.notificationPush,
                    isLoading: true,
                }
            }
        case `${SET_TOKEN_NOTIFICATION}_SUCCESS`:
            return {
                ...state,
                notificationPush: {
                    ...state.notificationPush,
                    isLoading: false,
                    token: action.payload.data,
                    isNotif: !state.notificationPush.isNotif,
                    error: ''
                }
            }
        case `${SET_TOKEN_NOTIFICATION}_FAIL`:
            return {
                ...state,
                notificationPush: {
                    ...state.notificationPush,
                    isLoading: false,
                    token: "",
                    isNotif: false,
                    error: action.payload
                }
            }     
        default:
            return state;
    }
}

export default notificationReducer;