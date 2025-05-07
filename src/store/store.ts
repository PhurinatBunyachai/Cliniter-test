import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import productReducer from './productSlice'
import darkModeReducer from './darkModeSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['products', 'darkMode'] // specify which reducers to persist
}

const rootReducer = combineReducers({
  products: productReducer,
  darkMode: darkModeReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch