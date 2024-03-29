import {
    SET_USER, 
    UPDATE_PROFIL,
    DELETE_ACCOUNT,
    RATE_USER
} from './type'

const initialState = {
    user: {
        isLoading: false,
        data: {},
        error: ""
    },
    update: {
        isLoading: false,
        message: "",
        error: ""
    },
    delete: {
        isLoading: false,
        data: "",
        error: ""
    },
    rate: {
        isLoading: false,
        message: "",
        error: ""
    }
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
        case `${SET_USER}_SUCCESS`:
            console.log('get user', action.payload.data)
            return {
                ...state,
                user: {
                    ...state.user,
                    isLoading: false,
                    data: action.payload.data.data,
                    error: ''
                }
            }
        case `${SET_USER}_FAIL`:
            console.log('get user error', action.payload.data)
            return {
                ...state,
                user: {
                    ...state.user,
                    isLoading: false,
                    data: {},
                    error: action.payload
                }
            }
        case UPDATE_PROFIL:
            return {
                ...state,
               update: {
                   ...state.update,
                   isLoading: true
               }
            }
        case `${UPDATE_PROFIL}_SUCCESS`:
            return {
                ...state,
                update: {
                    ...state.update,
                    isLoading: false,
                    message: action.payload,
                    error: ''
                }
            }
        case `${UPDATE_PROFIL}_FAIL`:
            return {
                ...state,
                update: {
                    ...state.update,
                    isLoading: false,
                    message: 'impossible de mettre a jour votre profil, veuillez réessayer plutart',
                    error: action.error
                }
            }
        case DELETE_ACCOUNT:
            return {
                ...state,
               delete: {
                   ...state.delete,
                   isLoading: true
               }
            }
        case `${DELETE_ACCOUNT}_SUCCESS`:
            return {
                ...state,
                delete: {
                    ...state.delete,
                    isLoading: false,
                    data: action.payload.data,
                    error: ''
                }
            }
        case `${DELETE_ACCOUNT}_FAIL`:
            return {
                ...state,
                delete: {
                    ...state.delete,
                    isLoading: false,
                    data: {},
                    error: action.payload
                }
            }
        case RATE_USER:
            return {
                ...state,
               rate: {
                   ...state.rate,
                   isLoading: true
               }
            }
        case `${RATE_USER}_SUCCESS`:
            return {
                ...state,
                rate: {
                    ...state.rate,
                    isLoading: false,
                    message: action.payload.data,
                    error: ''
                }
            }
        case `${RATE_USER}_FAIL`:
            return {
                ...state,
                rate: {
                    ...state.rate,
                    isLoading: false,
                    message: '',
                    error: action.payload
                }
            }       
        default:
            return state;
    }
}

export default userReducer;
