import { SETADDRESS } from "./type"


export const set_adress = (adress) => (dispatch) => {
    dispatch({
        type: SETADDRESS,
        payload: adress
    })
}