import {
    LOAD_NOTIFICATION,
} from './type'

const initialState = {
    general: {
        isLoading: false,
        list: [],
        error: ''
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
        default:
            return state;
    }
}

export default notificationReducer;