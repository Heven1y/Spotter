import React from 'react'
import { View, Text, ScrollView, ToastAndroid, ActivityIndicator, StatusBar, Alert} from 'react-native'
import {resetStoreAction} from '../redux/storeAction'
import {Input, Button, Icon, Divider} from 'react-native-elements'
import {RadioButton, List} from 'react-native-paper'
import {IStream, IUser} from '../Types/interfaces'
import {useAppDispatch, useAppSelector} from '../redux/hooks'
import { loadStreamAction } from '../redux/streams/action'
import {setActiveUserAction} from '../redux/users/action'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {changeStreamAPI, loadStreamAPI, loadStreamFilterAPI, removeStreamAPI, signOutAPI} from '../API/firebaseAPI'
import { StreamPreview } from '../Component/StreamPreview'
import { useFocusEffect } from '@react-navigation/native';

type SettingsProps = {
    route:any,
    navigation:any
}

export const ScreenSettings:React.FC<SettingsProps> = (props) => {
    const dispatch = useAppDispatch()
    const userActive:IUser = useAppSelector((state:any) => state.user.user)
    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            title: 'Settings',
               headerLeft: () => (
                <Button icon={<Icon
                  name="menu"
                  iconStyle={{width: 30, marginLeft: 20}}
                  color='#fff'
                />} onPress={() => {props.navigation.toggleDrawer()}} buttonStyle={{backgroundColor: 'rgba(0,0,0,0)',}} 
                containerStyle={{width:40, alignItems:'center', marginLeft: 15, borderRadius: 50}}></Button>
               ),
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
      const [title, setTitle] = React.useState('first')
      const [descript, setDescript] = React.useState('')
      const [idStreamActive, setId] = React.useState('')
    return(
        <>
          <ScrollView style={{backgroundColor: '#212529', zIndex: 0}}>
          <View>
              <Text style={{fontSize: 18, fontFamily: 'Ubuntu-Medium', color: '#fff', marginLeft:'5%',
                marginTop: 20, marginBottom: 20}}>Accounts</Text>
              <Divider style={{height: 1, backgroundColor:'#555', width: '90%', marginLeft:'5%'}}></Divider>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
              width: '90%', marginLeft:'5%', marginTop: 20}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton
                    value="first"
                    color='#4cc9f0'
                    status={ title === 'first' ? 'checked' : 'unchecked' }
                    onPress={() => setTitle('first')}
                    />
                <Text style={{fontSize: 18, fontFamily: 'Ubuntu-Medium', color: '#fff', marginLeft: 10}}>{userActive.email}</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
              width: '90%', marginLeft:'5%', marginTop: 20}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton
                    value="second"
                    color='#4cc9f0'
                    status={ title === 'second' ? 'checked' : 'unchecked' }
                    onPress={() => setTitle('second')}
                />
                <Text style={{fontSize: 18, fontFamily: 'Ubuntu-Medium', color: '#fff', marginLeft: 10}}>user@mail.com</Text>
                </View>
                <Icon name='delete-outline' size={30} color='#fff'></Icon>
              </View>
          </View>
          <View>
              <Text style={{fontSize: 18, fontFamily: 'Ubuntu-Medium', color: '#fff', marginLeft:'5%',
                marginTop: 20, marginBottom: 20}}>Language</Text>
              <Divider style={{height: 1, backgroundColor:'#555', width: '90%', marginLeft:'5%'}}></Divider>
              <View style={{width: '95%', marginLeft:'2.5%'}}>
                <List.Accordion theme={{colors: {primary: '#4cc9f0'}}} style={{marginTop: 10}} 
                titleStyle={{fontSize:20, fontFamily: 'Ubuntu-Medium'}} title="English">
                    <List.Item titleStyle={{fontSize:18, fontFamily: 'Ubuntu-Medium', color: '#fff'}} onPress={() => {}} title="English" />
                    <List.Item titleStyle={{fontSize:18, fontFamily: 'Ubuntu-Medium', color: '#fff'}} onPress={() => {}} title="Русский" />
                </List.Accordion>
              </View>
          </View>
          <View style={{marginBottom: 20}}>
              <Text style={{fontSize: 18, fontFamily: 'Ubuntu-Medium', color: '#fff', marginLeft:'5%',
                marginTop: 20, marginBottom: 20}}>Info</Text>
              <Divider style={{height: 1, backgroundColor:'#555', width: '90%', marginLeft:'5%'}}></Divider>
              <Button onPress={() => {}} 
                title="About developers"
                buttonStyle={{backgroundColor:'#212529', justifyContent: 'flex-start'}}
                titleStyle={{fontSize: 20, fontFamily: 'Ubuntu-Medium', color: '#fff'}}
                containerStyle={{width: '90%', marginLeft: '5%', marginTop: 15}}
                />
                <Button onPress={() => {}} 
                title="About app"
                buttonStyle={{backgroundColor:'#212529', justifyContent: 'flex-start'}}
                titleStyle={{fontSize: 20, fontFamily: 'Ubuntu-Medium', color: '#fff'}}
                containerStyle={{width: '90%', marginLeft: '5%', marginTop: 15}}
                />
          </View>
          </ScrollView>
        </>
        )

}