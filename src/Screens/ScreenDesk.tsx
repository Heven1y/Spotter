import React from 'react'
import { View, Text, ScrollView, ToastAndroid, ActivityIndicator, StatusBar, Alert} from 'react-native'
import {resetStoreAction} from '../redux/storeAction'
import {Input, Button, Icon, Overlay} from 'react-native-elements'
import {FAB, Portal, Dialog, TextInput} from 'react-native-paper'
import {IStream, IUser} from '../Types/interfaces'
import {useAppDispatch, useAppSelector} from '../redux/hooks'
import { loadStreamAction } from '../redux/streams/action'
import {setActiveUserAction} from '../redux/users/action'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {changeStreamAPI, loadStreamAPI, loadStreamFilterAPI, removeStreamAPI, signOutAPI} from '../API/firebaseAPI'
import { StreamPreview } from '../Component/StreamPreview'
import { useFocusEffect } from '@react-navigation/native';

type DeskProps = {
    route:any,
    navigation:any
}

export const ActivityDesk:React.FC<DeskProps> = (props) => {
    const dispatch = useAppDispatch()
    const userActive:IUser = useAppSelector((state:any) => state.user.user)
    const streams:IStream[] = useAppSelector((state:any) => state.streams.streams)
    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            title: 'Cameras',
               headerLeft: () => (
                <Button icon={<Icon
                  name="menu"
                  iconStyle={{width: 30, marginLeft: 20}}
                  color='#fff'
                />} onPress={() => {props.navigation.toggleDrawer()}} buttonStyle={{backgroundColor: 'rgba(0,0,0,0)',}} 
                containerStyle={{width:40, alignItems:'center', marginLeft: 15, borderRadius: 50}}></Button>
               ),
               headerRight: () => {
                return (
                    <Icon name='search' size={28} color='#fff' style={{marginRight: 20}}></Icon>
                )
              },
               headerStyle: {
                backgroundColor: '#343a40',
                elevation: 2,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontFamily: "Ubuntu-Medium"
              }
        });
      }, [props.navigation]);
      const [load, setLoad] = React.useState(false)
      const [change, setChange] = React.useState(false)
      const [title, setTitle] = React.useState('')
      const [descript, setDescript] = React.useState('')
      const [idStreamActive, setId] = React.useState('')
      React.useEffect(() => {
        let isMounted = true;
        async function getStreamsFromStore() {
          if(!load) {
          const needStreams:any = await loadStreamFilterAPI(userActive.streamID)
          dispatch(loadStreamAction(needStreams))
          setLoad(true)
          }
        }
        getStreamsFromStore()
        return () => { isMounted = false };
      }, [load])
    const addCam = () => {

      props.navigation.push('Add Cam')
    }
    const openStream = (stream:IStream) => {
      props.navigation.push('Stream', {stream: stream})
    }
    const onChangeStream = (stream:IStream) => {
        setTitle(stream.title)
        setDescript(stream.description === undefined ? '' : stream.description)
        setId(stream.id)
        setChange(true)
    }
    const onDeleteStream = (id:string) => {
      Alert.alert(
        "Предупреждение о удалении",
        'Вы действительно хотите удалить камеру?',
        [
          {
            text: "Отмена",
            onPress: () => ToastAndroid.show("Удаление отменено", ToastAndroid.SHORT),
            style: "cancel"
          },
          { text: "OK", onPress: () => removeStream(id) }
        ],
        { cancelable: false }
      )
    }
    const removeStream = async (id:string) => {
        const result:boolean = await removeStreamAPI(id, userActive.uid, userActive.streamID.filter((idStream) => idStream !== id))
        setLoad(false)
    }
    const changeStream = async () => {
        const result:boolean = await changeStreamAPI(idStreamActive, title, descript)
        setLoad(false)
        setChange(false)
    }
    if(load === false){
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', backgroundColor: '#212529'}}>
          <ActivityIndicator style={{height:'100%'}} size="large" color="#0000ff"/>
        </View>
      )
    }
    return(
        <>
        <Overlay isVisible={change} onBackdropPress={() => setChange(false)} overlayStyle={{width:'80%', backgroundColor: '#343a40'}}>
            <View>
            <Text style={{fontSize: 18, fontFamily: 'Ubuntu-Medium', color:'#fff', marginBottom: 15}}>Changing the camera</Text>
            <TextInput value={title} onChangeText={text => setTitle(text)}
                label='Name'
                mode='outlined'
                theme={{ colors: { text: 'white', primary: '#4cc9f0', background: '#343a40', placeholder:'#fff' } }}
                style={{width: '100%', marginBottom: 15}} />
            <TextInput value={descript} multiline onChangeText={text => setDescript(text)} 
                label='Description'
                mode='outlined'
                theme={{ colors: { text: 'white', primary: '#4cc9f0', background: '#343a40', placeholder:'#fff' } }}
                style={{width: '100%', maxHeight: 150, fontSize:16, marginBottom: 15}} />
              <View style={{flexDirection: 'row-reverse'}}>
                <Button title='ОК' titleStyle={{color: '#4cc9f0', fontSize: 16}} 
                buttonStyle={{backgroundColor: '#343a40'}} 
                containerStyle={{marginLeft: 5, width: 80}} onPress={() => changeStream()}></Button>
                <Button title='Cancel' titleStyle={{color: '#fff', fontSize: 16}} 
                buttonStyle={{backgroundColor: '#343a40'}}
                containerStyle={{ width: 80}} onPress={() => setChange(false)}></Button>
              </View>
            </View>
        </Overlay>
          <Button activeOpacity={0.5} onPress={addCam}  buttonStyle={{
             width: '100%', height: '100%', borderRadius: 50, backgroundColor: '#3a86ff'
            }} containerStyle={{
              zIndex: 10, position: 'absolute', bottom: 0, right:0, margin: 18, width: 65, height: 65, borderRadius: 50, elevation: 5
            }} icon={<Icon name='video-call' size={30} color='#fff'/>}>
          </Button>
          <ScrollView style={{backgroundColor: '#212529', zIndex: 0}}>
          <View style={{marginTop: 10, marginBottom: 15,}}>
            {streams.length === 0 ? (
                  <Text style={{fontSize: 18, textAlign: 'center', marginTop: '60%', fontFamily: 'Ubuntu-Medium', color:'#fff'}}>There are no connected cameras</Text>
            ) : (
              <>
              {streams.map((stream:IStream) => {
                return (
                  <View key={stream.id}>
                    <StreamPreview stream={stream} openStream={openStream} onChange={onChangeStream} onDelete={onDeleteStream}/>
                  </View>
                )
            })}
              </>
            )}
          </View>
          </ScrollView>
        </>
        )

}