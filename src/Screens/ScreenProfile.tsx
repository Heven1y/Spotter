import React from 'react'
import { View, Text, ScrollView, ToastAndroid, ActivityIndicator, StatusBar, Alert} from 'react-native'
import {resetStoreAction} from '../redux/storeAction'
import {Input, Button, Icon, Avatar, Divider} from 'react-native-elements'
import {FAB, Portal, Dialog, TextInput} from 'react-native-paper'
import {IStream, IUser} from '../Types/interfaces'
import {useAppDispatch, useAppSelector} from '../redux/hooks'

type ProfileProps = {
    route:any,
    navigation:any
}

export const ScreenProfile:React.FC<ProfileProps> = (props) => {
    const userActive:IUser = useAppSelector((state:any) => state.user.user)
    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            title: 'Profile',
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
      const [title, setTitle] = React.useState(userActive.name)
    return(
        <>
          <ScrollView style={{ backgroundColor: '#212529', zIndex: 0}}>
            <View style={{width: '100%', alignItems:'center', marginTop: 40}}>
            <Icon name='edit' size={30} color='#fff' containerStyle={{position:'absolute', zIndex: 10, left: 240}} 
            iconStyle={{backgroundColor: '#4cc9f0', padding: 8, borderRadius: 50}}></Icon>
          <Avatar rounded size={140} source={require('../avatar.jpg')}></Avatar>
          </View>
          <TextInput value={title} onChangeText={text => setTitle(text)} 
                label='Name'
                mode='outlined'
                editable
                theme={{ colors: { text: 'white', primary: '#4cc9f0', background: '#212529', placeholder:'#fff' }, roundness: 15 }}
                style={{width: '90%', marginBottom: 30, marginTop: 20, marginLeft:'5%'}}/>
            <Divider style={{height: 3, backgroundColor:'#555'}}></Divider>
            <Button onPress={() => {}} 
        title="Email"
        buttonStyle={{backgroundColor:'#212529', justifyContent: 'space-between'}}
        titleStyle={{fontSize: 20, fontFamily: 'Ubuntu-Medium', color: '#fff'}}
        containerStyle={{width: '90%', marginLeft: '5%', marginTop: 15}}
        iconRight
        icon={<Icon name='arrow-forward-ios' size={18} color='#fff'></Icon>}
        />
        <Button onPress={() => {}} 
        title="Phone number"
        buttonStyle={{backgroundColor:'#212529', justifyContent: 'space-between'}}
        titleStyle={{fontSize: 20, fontFamily: 'Ubuntu-Medium', color: '#fff'}}
        containerStyle={{width: '90%', marginLeft: '5%', marginTop: 15}}
        iconRight
        icon={<Icon name='arrow-forward-ios' size={18} color='#fff'></Icon>}
        />
        <Button onPress={() => {}} 
        title="Change password"
        buttonStyle={{backgroundColor:'#212529', justifyContent: 'space-between'}}
        titleStyle={{fontSize: 20, fontFamily: 'Ubuntu-Medium', color: '#fff'}}
        containerStyle={{width: '90%', marginLeft: '5%', marginTop: 15}}
        iconRight
        icon={<Icon name='arrow-forward-ios' size={18} color='#fff'></Icon>}
        />
        <Button onPress={() => {}}
        title="Update"
        buttonStyle={{backgroundColor:'#3a86ff', borderRadius: 10, width: '100%', height: '100%'}}
        titleStyle={{fontSize: 20, fontFamily: 'Ubuntu-Medium', color: '#fff'}}
        containerStyle={{marginTop: 50, width: '85%', marginLeft: '7.5%', height: 50}}
        />
          </ScrollView>
        </>
        )

}