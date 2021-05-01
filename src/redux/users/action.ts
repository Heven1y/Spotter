import React from 'react'
import { IUser} from '../../Types/interfaces'
import { ACTIVE_USER, UPDATE_USER } from './types'
import {createAction} from '@reduxjs/toolkit'

export const setActiveUserAction = (user:IUser) => {
    return {
        type: ACTIVE_USER,
        payload: user
    }
}

export const updateUserStreamsAction = (stream:string) => {
    return {
        type: UPDATE_USER,
        payload: stream
    }
}