import React from 'react'
import { View, TouchableHighlight } from 'react-native';
import {
    DrawerItem
} from '@react-navigation/drawer';
import {
    Drawer,
    Banner
} from 'react-native-paper';
import {Icon, Avatar, Text} from 'react-native-elements'
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { IUser } from '../Types/interfaces';
import { signOutAPI } from '../API/firebaseAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { resetStoreAction } from '../redux/storeAction';

type DrawerProps = {
    navigation:any
}

export const DrawerContent:React.FC<DrawerProps> = (props) => {
    const [visible, setVisible] = React.useState(false)
    const userActive:IUser = useAppSelector((state:any) => state.user.user)
    const dispatch = useAppDispatch()
    const logOut = async () => {
        const remUser:IUser = {
          active: false,
          uid: '',
          phone: '',
          name: '',
          streamID: [],
          email: ''
        }
        await signOutAPI()
        await AsyncStorage.setItem('activeUser', JSON.stringify(remUser))
        dispatch(resetStoreAction())
    }
    return(
        <View style={{flexDirection: 'column', justifyContent: 'space-between', height: '100%'}}>
                    <Drawer.Section style={{borderBottomWidth: 0, borderStyle: 'solid'}}>
                    <TouchableHighlight onPress={() => setVisible(!visible)} activeOpacity={1} underlayColor={'rgba(0,0,0,0)'}>
                    <View style={{flexDirection: 'column', paddingLeft: 20, paddingBottom: 15, paddingTop: 40, backgroundColor:'#212529'}}>
                            <Avatar rounded size={60} source={require('../avatar.jpg')}></Avatar>
                            <Text style={{fontSize:20, color:'#fff', marginTop: 10, fontFamily: 'Ubuntu-Medium'}}>{userActive.name}</Text>
                            <Text style={{fontSize:8, color:'#fff'}}>uid: {userActive.uid}</Text>
                            <Icon containerStyle={{position: 'absolute', right: 10, bottom: 10}} name={visible ? 'expand-less' : 'expand-more'} size={30} color='#fff'></Icon>
                    </View>
                    </TouchableHighlight>
                    <Banner
                    visible={visible}
                    actions={[]}
                    style={{backgroundColor: '#343a40'}}
                    >
                        <View style={{flexDirection:'column', alignItems: 'center'}}>
                            <View style={{width: '100%', flexDirection:'row', alignItems: 'center', marginBottom: 15}}>
                                <Avatar rounded size={25} source={require('../avatar.jpg')}></Avatar>
                                <Text style={{fontSize:16, color:'#fff', marginLeft: 20, fontFamily: 'Ubuntu-Medium'}}>{userActive.name}</Text>
                            </View>
                            <View style={{width: '100%', flexDirection:'row', alignItems: 'center'}}>
                                <Icon name='add' color='#fff' size={25}></Icon>
                                <Text style={{fontSize:16, color:'#fff', marginLeft: 20, fontFamily: 'Ubuntu-Medium'}}>Add account</Text>
                            </View>
                        </View>
                    </Banner>
                        <DrawerItem 
                            label="Cameras"
                            icon={() => (
                                <Icon 
                                color='#fff'
                                name="videocam" 
                                />
                            )}
                            labelStyle={{color:'#fff', fontSize: 16, fontFamily: 'Ubuntu-Medium'}}
                            onPress={() => props.navigation.navigate('Desk')}
                        />
                        <DrawerItem 
                            label="Profile"
                            icon={() => (
                                <Icon 
                                color='#fff'
                                name="account-circle" 
                                />
                            )}
                            labelStyle={{color:'#fff', fontSize: 16, fontFamily: 'Ubuntu-Medium'}}
                            onPress={() => props.navigation.navigate('Profile')}
                        />
                        <DrawerItem 
                            label="Settings"
                            icon={() => (
                                <Icon 
                                color='#fff'
                                name="settings" 
                                />
                            )}
                            labelStyle={{color:'#fff', fontSize: 16, fontFamily: 'Ubuntu-Medium'}}
                            onPress={() => props.navigation.navigate('Settings')}
                        />
                        <DrawerItem 
                            label="Support"
                            icon={() => (
                                <Icon 
                                color='#fff'
                                name="help" 
                                />
                            )}
                            labelStyle={{color:'#fff', fontSize: 16, fontFamily: 'Ubuntu-Medium'}}
                            onPress={() => props.navigation.navigate('Support')}
                        />
                    </Drawer.Section>
            <Drawer.Section style={{bottom: 0}}>
                <DrawerItem 
                    icon={() => (
                        <Icon 
                        color='#fff'
                        name="exit-to-app" 
                        />
                    )}
                    labelStyle={{color:'#fff', fontSize: 16, fontFamily: 'Ubuntu-Medium'}}
                    label="Log out"
                    onPress={logOut}
                />
            </Drawer.Section>
        </View>
    );
}