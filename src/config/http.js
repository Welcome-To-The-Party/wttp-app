
import axios from 'axios';
import {PROD_URL, DEV_URL, LOCAL_URL} from '@env'
export const httpClient = axios.create({
    baseURL: PROD_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})