import {
    SET_USER, 
    SET_USER_SUCCESS, 
    SET_USER_FAIL,
} from './type'

const initialState = {
    user: {
        isLoading: false,
        data: {},
        error: ""
    },
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
               user: {
                   ...state.user,
                   isLoading: true
               }
            }
        case SET_USER_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    isLoading: false,
                    data: action.payload.data.user,
                    error: ''
                }
            }
        case SET_USER_FAIL:
            return {
                ...state,
                user: {
                    ...state.user,
                    isLoading: false,
                    data: {},
                    error: action.payload.error
                }
            }    
        default:
            return state;
    }
}

export default userReducer;