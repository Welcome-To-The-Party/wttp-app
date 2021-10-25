import { 
    LOGIN_FACEBOOK,
    LOGIN_GOOGLE,
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
        case LOGIN_FACEBOOK:
            return {
                ...state,
                login_facebook: {
                    ...state.login_facebook,
                    isLoading: true
                }
            }
        case `${LOGIN_FACEBOOK}_SUCCESS`:
            console.log("action.payload.data",action.payload.data)
            return {
                ...state,
                login_facebook: {
                    ...state.login_facebook,
                    isLoading: false,
                    url: action.payload?action.payload.data:"",
                    error: ""
                }
            }
        case `${LOGIN_FACEBOOK}_FAIL`:
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
        case `${LOGIN_GOOGLE}_SUCCESS`:
            return {
                ...state,
                login_google: {
                    ...state.login_google,
                    isLoading: false,
                    url: action.payload?action.payload.data:"",
                    error: ""
                }
            }
        case `${LOGIN_GOOGLE}_FAIL`:
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