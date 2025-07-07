import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import  {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from 'redux-persist'
import { cartSlice } from './cart/cart.slice';
import { persistStore } from 'redux-persist';


const persistConfig = {
    key: 'stilmashop',
    storage,
    whiteList:['cart']
}

const isClient = typeof window !== 'undefined'

const combinedReducers = combineReducers({
    cart: cartSlice.reducer
})

let mainReducer = combinedReducers

if (isClient) {
    const { persistReducer } = require('redux-persist')
    const storage = require('redux-persist/lib/storage')

    mainReducer = persistReducer(persistConfig, combinedReducers)
}

export const store = configureStore({
    reducer: mainReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [
                FLUSH,
                REHYDRATE,
                PAUSE,
                PERSIST,
                PURGE,
                REGISTER

            ]
        }
    })
})

export const persistor = persistStore(store)

export type TypeRootState = ReturnType<typeof mainReducer>