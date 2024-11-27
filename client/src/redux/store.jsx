import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './userSlice'


export const store = configureStore({
    reducer: {
      users: usersReducer,  // manejamos el estado de los usuarios de manera global con este slice // 
    }
  })