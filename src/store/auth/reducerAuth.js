import { 
    SOCIAL_LOGIN,
    LOGIN,
    REGISTER,
    REMOVE_TOKEN,
    RESET_PASSWORD,
} from './type'

const initialState = {
    user: {},
    login: {
        token: '',
        isLoading: false,
        error: ""
    },
    social_login: {
        url: "",
        facebookLoading: false,
        googleLoading: false,
        error: ""
    },
    register: {
        isLoading: false,
        message: "",
        error: ""
    },
    reset_password: {
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
        case `${LOGIN}_SUCCESS`:
            return {
                ...state,
                login: {
                    ...state.login,
                    isLoading: false,
                    token: action.payload,
                    error: ""
                }
            }
        case `${LOGIN}_FAIL`:
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
        case SOCIAL_LOGIN:
            return {
                ...state,
                social_login: {
                    ...state.social_login,
                    facebookLoading: action.payload.social_type === 'facebook' ? true: false,
                    googleLoading: action.payload.social_type === 'google' ? true: false,
                }
            }
        case `${SOCIAL_LOGIN}_SUCCESS`:
            return {
                ...state,
                social_login: {
                    ...state.social_login,
                    facebookLoading: false,
                    googleLoading: false,
                    error: ""
                },
                login: {
                    ...state.login,
                    isLoading: false,
                    token: action.payload,
                    error: ""
                }
            }
        case `${SOCIAL_LOGIN}_FAIL`:
            return {
                ...state,
                social_login: {
                    ...state.social_login,
                    facebookLoading: false,
                    googleLoading: false,
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
        case `${REGISTER}_SUCCESS`:
            return {
                ...state,
                register: {
                    ...state.register,
                    isLoading: false,
                    message: action.payload,
                    error: ""
                }
            }
        case `${REGISTER}_FAIL`:
            return {
                ...state,
                register: {
                    ...state.register,
                    isLoading: false,
                    message: "",
                    error: action.error
                }
            }
        case RESET_PASSWORD:
            return {
                ...state,
                reset_password: {
                    ...state.reset_password,
                    isLoading: true
                }
            }
        case `${RESET_PASSWORD}_SUCCESS`:
            return {
                ...state,
                reset_password: {
                    ...state.reset_password,
                    isLoading: false,
                    message: action.payload.data.message,
                    error: ""
                }
            }
        case `${RESET_PASSWORD}_FAIL`:
            return {
                ...state,
                reset_password: {
                    ...state.reset_password,
                    isLoading: false,
                    message: "",
                    error: "une erreur est survenue veuillez réessayer plutart"
                }
            }
        default:
            return state;
    }
}

export default authReducer;