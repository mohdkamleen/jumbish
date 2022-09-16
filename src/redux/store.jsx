import { configureStore } from '@reduxjs/toolkit' 
import order from './slice/order'
import auth from './slice/auth'

const store = configureStore({
  reducer : {
    order,
    auth
  }
})

export default store