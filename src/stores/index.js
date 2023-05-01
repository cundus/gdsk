import { configureStore } from '@reduxjs/toolkit'

import authReducer from './reducers/auth'
import floorReducer from './reducers/floor'
import menuReducer from './reducers/menu'
import cartReducer from './reducers/cart'
import patientOrderReducer from './reducers/patientOrder'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    floor: floorReducer,
    menu: menuReducer,
    cart: cartReducer,
    patientOrder: patientOrderReducer,
  },
})
