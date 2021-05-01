import React from 'react'
import {View, ScrollView, Text} from 'react-native'
import {Input, Button} from 'react-native-elements'
import {TextInput} from 'react-native-paper'
import Icon from 'react-native-vector-icons/Octicons'
import { addStreamAPI } from '../API/firebaseAPI'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { addStreamAction } from '../redux/streams/action'
import { updateUserStreamsAction } from '../redux/users/action'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IUser } from '../Types/interfaces'

type CamProps = {
    navigation: any
}

export const OptionsCam:React.FC<CamProps> = (props) => {
    const userActive:IUser = useAppSelector((state:any) => state.user.user)
    const dispatch = useAppDispatch()
    const [nameText, onChangeName] = React.useState('')
    const [descriptionText, onChangeDescrip] = React.useState('')
    const [refPreview, setPreviewRef] = React.useState('')
    const [refStream, setStreamRef] = React.useState('')
    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            title: 'Connecting camera',
            headerRight: () => {
                return (
                    <Icon name='info' size={30} color='#fff' style={{marginRight: 10}}></Icon>
                )
            },
            headerStyle: {
                backgroundColor: '#343a40',
            },
            headerTintColor: '#fff'
        });
      }, [props.navigation]);
      const demoValues = () => {
          onChangeName('Sevastopol. The bay.')
          onChangeDescrip('Demo version')
          setPreviewRef('https://lideo.tv/images/records/04560/03621_dff20d3bbc2464f1986ee6076ce027b1.png')
          setStreamRef('https://hls.lideo.tv/ipcam/04560_08862_fd2c9b8dc74e09a428acd234e07e27f8.stream/index.m3u8?tokenhash=DqD0Fq21X04WPZ3TMT6I7Q')
      }
      const addStream = async () => {
          
        const result:any = await addStreamAPI({
            title: nameText,
            description: descriptionText,
            preview: refPreview,
            stream: refStream
        }, userActive.uid, userActive.streamID)
        console.log(result)
        if(result.success){
            dispatch(addStreamAction({
                id: result.id,
                title: nameText,
                description: descriptionText,
                preview: refPreview,
                stream: refStream
            }))
            await AsyncStorage.setItem('activeUser', JSON.stringify({...userActive, streamID: [...userActive.streamID, result.id]}));
            dispatch(updateUserStreamsAction(result.id))
            const user = await JSON.parse(await AsyncStorage.getItem('activeUser') || '{}') as IUser
            console.log(user)
        }
        props.navigation.push('Desk')
      }
    return (
            <View style={{ flex: 3, justifyContent:'center', alignItems: 'center', backgroundColor: '#212529'}}>
                <View style={{width: '100%', position: 'absolute', top: 10}}>
                <TextInput value={nameText} onChangeText={text => onChangeName(text)} 
                label='Name camera'
                mode='outlined'
                editable
                theme={{ colors: { text: 'white', primary: '#4cc9f0', background: '#212529', placeholder:'#fff' }, roundness: 15 }}
                style={{width: '95%', marginBottom: 20, marginLeft:'2.5%'}}/>
                <TextInput value={descriptionText} onChangeText={text => onChangeDescrip(text)} 
                label='Description camera'
                mode='outlined'
                theme={{ colors: { text: 'white', primary: '#4cc9f0', background: '#212529', placeholder:'#fff' }, roundness: 15 }}
                style={{width: '95%', marginBottom: 20, marginLeft:'2.5%'}}/>
                <TextInput value={refPreview} onChangeText={text => setPreviewRef(text)} 
                label='Request preview camers'
                mode='outlined'
                theme={{ colors: { text: 'white', primary: '#4cc9f0', background: '#212529', placeholder:'#fff' }, roundness: 15 }}
                style={{width: '95%', marginBottom: 20, marginLeft:'2.5%'}}/>
                <TextInput value={refStream} onChangeText={text => setStreamRef(text)} 
                label='Request stream'
                mode='outlined'
                theme={{ colors: { text: 'white', primary: '#4cc9f0', background: '#212529', placeholder:'#fff' }, roundness: 15 }}
                style={{width: '95%', marginBottom: 20, marginLeft:'2.5%'}}/>
                </View>
                <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-around', position: 'absolute', bottom: 40}}>
                <Button onPress={addStream} title="Create" titleStyle={{color:'#4cc9f0', fontSize: 20}} 
                buttonStyle={{
                    backgroundColor:'rgba(0,0,0,0)',
                    borderStyle: 'solid',
                    borderColor: '#4cc9f0',
                    borderWidth: 2,
                    borderRadius: 25,
                    height: '100%'
                    }}
                containerStyle={{width: '40%', height: 60}}/>
                <Button onPress={demoValues} title="Demo" titleStyle={{color:'#fff', fontSize: 20}} 
                buttonStyle={{
                    backgroundColor:'rgba(0,0,0,0)',
                    borderStyle: 'solid',
                    borderColor: '#fff',
                    borderWidth: 2,
                    borderRadius: 25,
                    height: '100%'
                    }}
                containerStyle={{width: '40%', height: 60}}/>
                </View>
            </View>
    )
}