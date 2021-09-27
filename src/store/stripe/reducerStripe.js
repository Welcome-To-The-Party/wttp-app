import {
    STRIPE_URL,
    STRIPE_URL_SUCCESS,
    STRIPE_URL_FAIL,
} from './type'

const initialState = {
    isLoading: false,
    url: "",
    error: ""
}

const stripeReducer = (state = initialState, action) => {
    switch (action.type) {
        case STRIPE_URL:
            return {
                ...state,
                isLoading: true
            }
        case STRIPE_URL_SUCCESS:
            console.log("url test", action.payload)
            return {
                ...state,
                isLoading: false,
                url: action.payload,
                error: ''
            }
        case STRIPE_URL_FAIL:
            console.log("url error", action.payload)
            return {
                ...state,
                isLoading: false,
                url: '',
                error: action.payload.error
            }     
        default:
            return state;
    }
}

export default stripeReducer;