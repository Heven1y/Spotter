import React from 'react';
import {StatusBar} from 'react-native'
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {SignIn, SignUp} from './src/Screens/ScreensAuthorization'
import {ActivityDesk} from './src/Screens/ScreenDesk'
import {useAppSelector, useAppDispatch} from './src/redux/hooks'
import { IUser } from './src/Types/interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {setActiveUserAction} from './src/redux/users/action'
import {Preview} from './src/Screens/ScreenPreview'
import { OptionsCam } from './src/Screens/ScreenAddCam';
import { SafeAreaProvider, SafeAreaView, initialWindowMetrics } from 'react-native-safe-area-context';
import {DrawerContent} from './src/Component/DrawerContent'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {Provider as PaperProvider} from 'react-native-paper'
import {ScreenStream} from './src/Screens/ScreenStream'
import { ScreenProfile } from './src/Screens/ScreenProfile';
import { ScreenSettings } from './src/Screens/ScreenSettings';
import { ScreenSupport } from './src/Screens/ScreenSupport';
const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const App:React.FC = () => { 
  const activeUser:IUser = useAppSelector((state:any)=>{
    return state.user.user
  })
  const dispatch = useAppDispatch()
  const [load, setLoad] = React.useState(false)
  React.useEffect(() => {
    async function getActiveFromStore() {
      if(!load) {
        const user = await JSON.parse(await AsyncStorage.getItem('activeUser') || '{}') as IUser
        if(user.active){
          dispatch(setActiveUserAction(user))
        }
        setLoad(true)
      }
    }
    getActiveFromStore()
  }, [load])

  const screensStackActiveUser = () => {
    return (
      <Stack.Navigator initialRouteName={"Desk"}>
          <Stack.Screen name="Desk"  component={ActivityDesk}/>
          <Stack.Screen name='Add Cam' component={OptionsCam}/>
          <Stack.Screen name='Stream' component={ScreenStream}/>
      </Stack.Navigator>
    )
  }

  const screenProfileDrawer = () => {
    return (
      <Stack.Navigator initialRouteName={"Profile"}>
          <Stack.Screen name="Profile"  component={ScreenProfile}/>
      </Stack.Navigator>
    )
  }
  const screenSettingsDrawer = () => {
    return (
      <Stack.Navigator initialRouteName={"Settings"}>
          <Stack.Screen name="Settings"  component={ScreenSettings}/>
      </Stack.Navigator>
    )
  }
  const screenSupportDrawer = () => {
    return (
      <Stack.Navigator initialRouteName={"Support"}>
          <Stack.Screen name="Support"  component={ScreenSupport}/>
      </Stack.Navigator>
    )
  }

  if(load == false) {
    return <Preview/>
  }
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
    <NavigationContainer>
      {
        activeUser.active ? (
          <PaperProvider>
            <StatusBar
              animated={true}
              backgroundColor="rgba(0,0,0,0)"
              translucent barStyle='light-content'/>
          <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>} 
          drawerStyle={{backgroundColor: 'rgba(52,58,64, 1)', }}>
            <Drawer.Screen name='Desk' component={screensStackActiveUser} options={({route}) => {
              const routeName = getFocusedRouteNameFromRoute(route) ?? 'Desk'
              if(routeName == 'Add Cam' || routeName == 'Stream') {
                return {swipeEnabled: false}
              }
              else {
                return {swipeEnabled: true}
              }
            }}></Drawer.Screen>
            <Drawer.Screen name='Profile' component={screenProfileDrawer}></Drawer.Screen>
            <Drawer.Screen name='Settings' component={screenSettingsDrawer}></Drawer.Screen>
            <Drawer.Screen name='Support' component={screenSupportDrawer}></Drawer.Screen>
          </Drawer.Navigator>
          </PaperProvider>
        )
        : (
          <>
          <StatusBar
            animated={true}
            backgroundColor="rgba(0,0,0,0)"
            translucent barStyle='light-content'/>
          <Stack.Navigator initialRouteName={"Sign In"}>
          <Stack.Screen name="Sign In" component={SignIn} options={{header: () => null}}/>
          <Stack.Screen name="Sign Up" component={SignUp} options={{header: () => null}}/>
          </Stack.Navigator>
          </>
        )
      }
    </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App
