import { configureStore } from '@reduxjs/toolkit' 
import user from './slice/user' 

const store = configureStore({
  reducer : {
    user
  }
})

export default store