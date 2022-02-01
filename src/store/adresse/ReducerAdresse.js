import {
    SETADDRESS,
} from './type'

const initialState = {
    city: '',
}

const adressReducer = (state = initialState, action) => {
    switch (action.type) {
        case SETADDRESS:
            return {
                ...state,
                city: action.payload
            }    
        default:
            return state;
    }
}

export default adressReducer;