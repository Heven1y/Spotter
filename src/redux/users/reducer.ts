import React from 'react'
import {IUser} from '../../Types/interfaces'
import {ACTIVE_USER, UPDATE_USER} from './types'

const initialState = {
    user: {
      active: false,
      streamID: []
    }
}
  export const userReducer = (state:any = initialState, action:any) => {
    switch (action.type){
        case ACTIVE_USER: return {
            ...state,
            user: action.payload
        }
        case UPDATE_USER: return {
          ...state,
          user: {
            ...state.user,
            streamID: [...state.user.streamID, action.payload]
          }
        } 
        default: return state
    }
}