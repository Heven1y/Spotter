import React from 'react'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { IStream, IUser } from '../Types/interfaces';
import { updateUserStreamsAction } from '../redux/users/action';

export const signInAPI = async (email:string, pass:string) => {
    try{
    const result = await auth().signInWithEmailAndPassword(email, pass)
    const usersDoc = await firestore().collection('users').doc(result.user.uid).get()
    return {data: usersDoc.data(), success: true, uid: result.user.uid}
    }
    catch(e){
        console.log(e)
        return {data: null, success: false}
    }
} 

export const registerAPI = async (email:string, pass:string, phone:string, name:string) => {
    try{
        const resultAuth = await auth().createUserWithEmailAndPassword(email, pass)
        console.log(resultAuth)
        const resultAddUser:any = await firestore().collection('users').doc(resultAuth.user.uid).set(
            {
            name: name,
            streamID: [],
            email: email,
            phone: phone
        })
        return {data: resultAuth, success: true}
    }
    catch(e){
        console.log(e)
        return {data: null, success: false}
    }
}

export const signOutAPI = async () => {
    await auth().signOut()
}

export const addStreamAPI = async (input:any, uid:string, userStreams:string[]) => {
    const streamID = Date.now().toString()
    try{
    await firestore().collection('streams').doc(streamID).set(
        {
            ...input,
            id: streamID
        }
    )
    await firestore().collection('users').doc(uid).update(
        {
        streamID: [...userStreams, streamID],
    })
    return {success: true, id: streamID}
    }
    catch(e){
        console.log(e)
        return {success: false}
    }
}

export const loadStreamAPI = async () => {
    const resultStreams = await firestore().collection('streams').get()
    return resultStreams.docs.map((doc) => doc.data())
}

export const loadStreamFilterAPI = async (streams:string[]) => {
    try{
    const result = await firestore().collection('streams').where('id', 'in', streams).get()
    return result.docs.map((doc) => doc.data())
    }
    catch(error){
        return []
    }
}

export const removeStreamAPI = async (id:string, uid:string, streamsUser:string[]) => {
    try{
        await firestore().collection('streams').doc(id).delete()
        await firestore().collection('users').doc(uid).update(
            {
            streamID: [...streamsUser],
        })
        return true
    }
    catch(error){
        return false
    }
}

export const changeStreamAPI = async (id:string, title:string, description:string) => {
    try{
        await firestore().collection('streams').doc(id).update({
            title: title,
            description: description
        })
        
        return true
    }
    catch(error){
        return false
    }
}

export const signInAPIwithGoogle = async () => {
    try{
    GoogleSignin.configure({
        webClientId: '***********',
        offlineAccess: true
    });
    const resultLogin = await GoogleSignin.signIn()
    console.log(resultLogin)
    const googleCredential = auth.GoogleAuthProvider.credential(resultLogin.idToken)
    const result = await auth().signInWithCredential(googleCredential);
    console.log(result.user)
    const resultAddUser:any = await firestore().collection('users').doc(result.user.uid).set(
        {
        name:'googleUser',
        streamID: [],
        email: result.user.email
    })
    const usersDoc = await firestore().collection('users').doc(result.user.uid).get()
    return {data: usersDoc.data(), success: true, uid: result.user.uid}
    }
    catch(e){
        console.log(e)
        return {success: false}
    }
}