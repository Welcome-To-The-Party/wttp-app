
import axios from 'axios';
import {PROD_URL, DEV_URL, LOCAL_URL} from '@env'

export const httpClient = axios.create({
    baseURL: DEV_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})