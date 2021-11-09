import {
    GET_TICKET
} from './type'

const initialState = {
    isLoading: false,
    data: {},
    error: ''
}

const ticketReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TICKET:
            return {
                ...state,
                isLoading: true,
            }
        case `${GET_TICKET}_SUCCESS`:
            return {
                ...state,
                isLoading: false,
                data: action.payload.data,
                error: ''
            }
        case `${GET_TICKET}_FAIL`:
            return {
                ...state,
                isLoading: false,
                data: [],
                error: action.payload
            }
        default:
            return state;
    }
}

export default ticketReducer;