import {
    SET_USER, 
    UPDATE_PROFIL,
    DELETE_ACCOUNT
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
            console.log("SET_USER ok ------------", action.payload.data)
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
            console.log("SET_USER fails ------------", action)
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
                    message: {},
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
        default:
            return state;
    }
}

export default userReducer;