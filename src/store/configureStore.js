// configureStore.js

import axiosMiddleware from 'redux-axios-middleware';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk'

import authReducer from './auth/reducerAuth'
import eventsReducer from './events/reducerEvents'
import userReducer from './user/reducerUser'
import stripeReducer from './stripe/reducerStripe'
import notificationReducer from './notification/reducerNotification'
import ticketReducer from './ticket/reducerTicket'
import adressReducer from './adresse/ReducerAdresse'
import { httpClient } from '@config/http'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth', 'user', 'notification']
}

const rootReducer = combineReducers({
    auth: authReducer,
    events: eventsReducer,
    user: userReducer,
    stripe: stripeReducer,
    ticket: ticketReducer,
    notification: notificationReducer,
    address: adressReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, applyMiddleware(axiosMiddleware(httpClient),thunk))

const persistor = persistStore(store)

export {store, persistor};
