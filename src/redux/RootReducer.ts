import React from 'react'
import {combineReducers} from 'redux'
import { streamReducer } from './streams/reducer'
import {userReducer} from './users/reducer'
export const AppReducer = combineReducers({
    user: userReducer,
    streams: streamReducer
})

const RootReducer = (state:any, action:any) => {
    if(action.type === 'RESET_STORE'){
        state = undefined
    }
    return AppReducer(state, action)
  }

export default RootReducer