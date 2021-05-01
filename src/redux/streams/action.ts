import React from 'react'
import { IStream } from '../../Types/interfaces'
import { ADD_STREAM, CHANGE_STREAM, REMOVE_STREAM, LOAD_STREAM } from './types'

export const addStreamAction = (stream:IStream) => {
    return {
        type: ADD_STREAM,
        payload: stream
    }
}
export const changeStreamAction = (id: string, title: string, description:string, preview:string) => {
    return {
        type: CHANGE_STREAM,
        payload: {
            id: id,
            title: title,
            description: description,
            preview: preview
        }
    }
}
export const loadStreamAction = (streams:IStream[]) => {
    return {
        type: LOAD_STREAM,
        payload: streams
    }
}