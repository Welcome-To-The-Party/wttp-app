
import axios from 'axios';
import {PROD_URL} from '@env'

export const httpClient = axios.create({
    baseURL: PROD_URL,
})