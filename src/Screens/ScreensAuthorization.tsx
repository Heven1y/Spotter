import React from 'react'
import { View, ToastAndroid, Image, Text, KeyboardAvoidingView } from 'react-native';
import {Input, Button, Icon} from 'react-native-elements'
import {TextInput} from 'react-native-paper'
import styles from '../styles'
import {useAppDispatch} from '../redux/hooks'
import {setActiveUserAction} from '../redux/users/action'
import {useAppSelector} from '../redux/hooks'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IUser } from '../Types/interfaces';
import IconAwesome from 'react-native-vector-icons/FontAwesome'
import {signInAPI, registerAPI, signInAPIwithGoogle} from '../API/firebaseAPI'


type LoginProps = {
    navigation:any
}

export const SignIn: React.FC<LoginProps> = (props) => {
    const [usernameText, onChangeName] = React.useState('')
    const [passwordText, onChangePass] = React.useState('')
    const activeUser:IUser = useAppSelector((state:any)=>{
        return state.user.user
      })
    const dispatch = useAppDispatch()
    const loginAttempt = async () => {
        if(passwordText.length !== 0 && usernameText.length !== 0){
            const result:any = await signInAPI(usernameText, passwordText)
            if(result.success){
            console.log('Пользователь с id: ' + result.uid + ' успешно вошел')
            const newUser:IUser = {
            active: true,
            uid: result.uid,
            name: result.data.name,
            phone: result.data.phone,
            email: result.data.email,
            streamID: result.data.streamID
            }
            console.log(newUser)
            dispatch(setActiveUserAction(newUser))
            await AsyncStorage.setItem('activeUser', JSON.stringify(newUser));
            onChangeName('')
            }
            else {
                ToastAndroid.show("Неверны почта или пароль", ToastAndroid.SHORT);
            }
        }
        else{
                ToastAndroid.show("Некоторые из полей пусты", ToastAndroid.SHORT);
        }
    }
    const loginGoogle = async () => {
        const result:any = await signInAPIwithGoogle()
        if(result.success){
            console.log('Пользователь с id: ' + result.uid + ' успешно вошел')
            const newUser:IUser = {
            active: true,
            uid: result.uid,
            name: result.data.name,
            phone: '',
            email: result.data.email,
            streamID: result.data.streamID
            }
            console.log(newUser)
            dispatch(setActiveUserAction(newUser))
            await AsyncStorage.setItem('activeUser', JSON.stringify(newUser));
            onChangeName('')
        }
    }
    return (
      <View style={{...styles.container, backgroundColor: '#343a40'}}>
                <View style={{alignItems: 'center', position: 'absolute', top: '10%'}}>
                <Image source={require('../logo.png')} style={{width: 150, height: 150}}></Image>
                <Text style={{fontSize: 30, color: '#fff', fontFamily: 'Ubuntu-Medium'}}>Spotter</Text>
                </View>
                <View style={{width: '95%', position:'absolute', top: '45%'}}>
                <TextInput value={usernameText} onChangeText={text => onChangeName(text)} 
                label='Email'
                mode='outlined'
                editable
                theme={{ colors: { text: 'white', primary: '#4cc9f0', background: '#343a40', placeholder:'#fff' }, roundness: 15 }}
                style={{width: '95%', marginBottom: 5, marginLeft:'2.5%'}} 
                left={ <TextInput.Icon name='email' color='#fff'/>}/>
                <TextInput value={passwordText} onChangeText={text => onChangePass(text)} 
                label='Password'
                mode='outlined'
                secureTextEntry
                theme={{ colors: { text: 'white', primary: '#4cc9f0', background: '#343a40', placeholder:'#fff' }, roundness: 15 }}
                style={{width: '95%', marginBottom: 5, marginLeft:'2.5%'}} 
                
                left={ <TextInput.Icon name='key' color='#fff'/>}/>
                </View>
                <View style={{flexDirection: 'column', width: '100%', alignItems: 'center', position: 'absolute', top: '70%'}}>
                <Button onPress={loginAttempt} 
                title="Sing In"
                buttonStyle={{backgroundColor:'#343a40', borderRadius: 20, borderWidth: 2, borderColor: '#fff', borderStyle: 'solid'
                , width: '100%', height: '100%'}}
                titleStyle={{fontSize: 18, fontFamily: 'Ubuntu-Medium'}}
                containerStyle={{ width: '80%', height: 60}}
                />
                <Button onPress={loginGoogle} 
                title="Log in with Google" 
                buttonStyle={{backgroundColor:'#343a40', borderRadius: 20, borderWidth: 1, borderColor: '#ddd', borderStyle: 'solid'
                    , width: '100%', height: '100%'}}
                titleStyle={{fontSize: 18, fontFamily: 'Ubuntu-Medium', color: '#eee'}}
                containerStyle={{marginTop: 10, width: '80%', height: 60}}
                icon={<IconAwesome name='google' color='#eee' style={{marginLeft: 20}} size={28}></IconAwesome>}
                iconRight/>
                </View>
                <Button onPress={() => props.navigation.push('Sign Up', { transition: 'vertical' })} 
                title="Register" 
                buttonStyle={{backgroundColor:'#343a40', borderRadius: 10}}
                titleStyle={{fontSize: 18, fontFamily: 'Ubuntu-Medium', color:'#4cc9f0'}}
                containerStyle={{ width: '80%', position: 'absolute', bottom: 10}}/>
      </View>
      );
}

export const SignUp: React.FC<LoginProps> = (props) => {
    const [emailText, onChangeEmail] = React.useState('')
    const [nameText, onChangeName] = React.useState('')
    const [phoneText, onChangePhone] = React.useState('')
    const [passwordText, onChangePass] = React.useState('')
    const [passCheckText, onChangePassCheck] = React.useState('')
    const regAttempt = async () => {
        if(passwordText.length !== 0 && emailText.length !== 0){
        if(passwordText === passCheckText){
        const result:any = await registerAPI(emailText, passwordText, phoneText, nameText)
        props.navigation.navigate('Sign In')
        }
        else{
            ToastAndroid.show("Пароли не одинаковы", ToastAndroid.SHORT);
        }
        }
        else{
            ToastAndroid.show("Некоторые из полей пусты", ToastAndroid.SHORT);
        }
    }
    return (
        <View style={{...styles.container, backgroundColor: '#343a40', justifyContent: 'center'}}>
            <View style={{alignItems: 'center', position: 'absolute', top: 80}}>
            <Text style={{fontSize: 30, color: '#fff', fontFamily: 'Ubuntu-Medium'}}>Registration</Text>
            </View>
        <View style={{width: '100%', backgroundColor: '#343a40', marginBottom: '20%'}}>
                <TextInput value={emailText} onChangeText={text => onChangeEmail(text)} 
                label='Email'
                mode='outlined'
                editable
                theme={{ colors: { text: 'white', primary: '#4cc9f0', background: '#343a40', placeholder:'#fff' }, roundness: 15 }}
                style={{width: '95%', marginBottom: 5, marginLeft:'2.5%'}} 
                left={ <TextInput.Icon name='email' color='#fff'/>}/>
                <TextInput value={nameText} onChangeText={text => onChangeName(text)} 
                label='Full name'
                mode='outlined'
                theme={{ colors: { text: 'white', primary: '#4cc9f0', background: '#343a40', placeholder:'#fff' }, roundness: 15 }}
                style={{width: '95%', marginBottom: 5, marginLeft:'2.5%'}} 
                left={ <TextInput.Icon name='account-circle' color='#fff'/>}/>
                <TextInput value={phoneText} onChangeText={text => onChangePhone(text)} 
                label='Phone number'
                mode='outlined'
                editable
                theme={{ colors: { text: 'white', primary: '#4cc9f0', background: '#343a40', placeholder:'#fff' }, roundness: 15 }}
                style={{width: '95%', marginBottom: 5, marginLeft:'2.5%'}} 
                left={ <TextInput.Icon name='phone' color='#fff'/>}/>
                <TextInput value={passwordText} onChangeText={text => onChangePass(text)} 
                label='Password'
                mode='outlined'
                secureTextEntry
                theme={{ colors: { text: 'white', primary: '#4cc9f0', background: '#343a40', placeholder:'#fff' }, roundness: 15 }}
                style={{width: '95%', marginBottom: 5, marginLeft:'2.5%'}} 
                left={ <TextInput.Icon name='lock' color='#fff'/>}/>
                <TextInput value={passCheckText} onChangeText={text => onChangePassCheck(text)} 
                label='Confirm password'
                mode='outlined'
                secureTextEntry
                theme={{ colors: { text: 'white', primary: '#4cc9f0', background: '#343a40', placeholder:'#fff' }, roundness: 15 }}
                style={{width: '95%', marginBottom: 5, marginLeft:'2.5%'}} 
                left={ <TextInput.Icon name='lock-check' color='#fff'/>}/>
            </View>
        <View style={{flexDirection: 'column', width: '100%', alignItems: 'center'}}>
        <View style={{flexDirection: 'column', width: '100%', alignItems: 'center', position: 'absolute', top: 30}}>
        <Button onPress={regAttempt} 
        title="Sing Up"
        buttonStyle={{backgroundColor:'#343a40', borderRadius: 20, borderWidth: 1, borderColor: '#4cc9f0', 
        borderStyle: 'solid', width: '100%', height: '100%'}}
        titleStyle={{fontSize: 18, fontFamily: 'Ubuntu-Medium', color: '#4cc9f0'}}
        containerStyle={{width: '40%', height:55}}
        />
        </View>
        </View>
        <Button onPress={() => {props.navigation.navigate('Sign In')}} 
        title="Already registered?"
        buttonStyle={{backgroundColor:'#343a40', borderRadius: 10}}
        titleStyle={{fontSize: 18, fontFamily: 'Ubuntu-Medium', color: '#4cc9f0'}}
        containerStyle={{ width: '80%', position: 'absolute', bottom: 10}}
        />
</View>
    );

}