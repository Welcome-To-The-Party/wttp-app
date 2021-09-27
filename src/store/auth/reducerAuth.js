import { REGISTER } from 'redux-persist/es/constants'
import { 
    LOGIN_FACEBOOK,
    LOGIN_FACEBOOK_SUCCESS,
    LOGIN_FACEBOOK_FAIL,
    LOGIN_GOOGLE,
    LOGIN_GOOGLE_SUCCESS,
    LOGIN_GOOGLE_FAIL,
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REMOVE_TOKEN,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './type'

const initialState = {
    user: {},
    login: {
        token: '',
        isLoading: false,
        error: ""
    },
    login_facebook: {
        url: "",
        isLoading: false,
        error: ""
    },
    login_google: {
        url: "",
        isLoading: false,
        error: ""
    },
    register: {
        isLoading: false,
        message: "",
        error: ""
    }
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                login: {
                    ...state.login,
                    isLoading: true
                }
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                login: {
                    ...state.login,
                    isLoading: false,
                    token: action.payload["connect.sid"],
                    error: ""
                }
            }
        case LOGIN_FAIL:
            return {
                ...state,
                login: {
                    ...state.login,
                    isLoading: false,
                    token: "",
                    error: action.error
                }
            }
        case REMOVE_TOKEN:
            return {
                ...state,
                login: {
                    ...state.login,
                    isLoading: false,
                    token: "",
                    error: ""
                }
            }
        case LOGIN_FACEBOOK:
            return {
                ...state,
                login_facebook: {
                    ...state.login_facebook,
                    isLoading: true
                }
            }
        case LOGIN_FACEBOOK_SUCCESS:
            return {
                ...state,
                login_facebook: {
                    ...state.login_facebook,
                    isLoading: false,
                    url: action.payload.data,
                    error: ""
                }
            }
        case LOGIN_FACEBOOK_FAIL:
            return {
                ...state,
                login_facebook: {
                    ...state.login_facebook,
                    isLoading: false,
                    url: "",
                    error: "connexion facebook echoué"
                }
            }
        case LOGIN_GOOGLE:
            return {
                ...state,
                login_google: {
                    ...state.login_google,
                    isLoading: true
                }
            }
        case LOGIN_GOOGLE_SUCCESS:
            return {
                ...state,
                login_google: {
                    ...state.login_google,
                    isLoading: false,
                    url: action.payload.data,
                    error: ""
                }
            }
        case LOGIN_GOOGLE_FAIL:
            return {
                ...state,
                login_google: {
                    ...state.login_google,
                    isLoading: false,
                    url: "",
                    error: "connexion facebook echoué"
                }
            }
        case REGISTER:
            return {
                ...state,
                register: {
                    ...state.register,
                    isLoading: true
                }
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                register: {
                    ...state.register,
                    isLoading: false,
                    message: action.payload,
                    error: ""
                }
            }
        case REGISTER_FAIL:
            return {
                ...state,
                register: {
                    ...state.register,
                    isLoading: false,
                    message: "",
                    error: action.error
                }
            }
        default:
            return state;
    }
}

export default authReducer;