import React from 'react'
import { IStream } from '../../Types/interfaces'
import {ADD_STREAM, CHANGE_STREAM, REMOVE_STREAM, LOAD_STREAM} from './types'
import {createReducer} from '@reduxjs/toolkit'

const initialState = { 
    streams: []
}

  export const streamReducer = (state:any = initialState, action:any) => {
    switch(action.type) {
        case ADD_STREAM: return {...state, streams: [...state.streams, action.payload]}
        case LOAD_STREAM: return {...state, streams: action.payload}
        case CHANGE_STREAM: return {
            ...state,
            streams: state.streams.map((stream:IStream) => {
                if(stream.id === action.payload.id){
                    return {
                        ...stream,
                        title: action.payload.title,
                        description: action.payload.description
                    }
                }
                return stream
            })
        }
        default: return state
    }
}