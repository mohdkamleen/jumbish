import { configureStore } from '@reduxjs/toolkit' 
import order from './slice/order'

const store = configureStore({
  reducer : {
    order
  }
})

export default store