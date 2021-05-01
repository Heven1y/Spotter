import React from 'react'
import { ScrollView} from 'react-native'
import {Button, Icon} from 'react-native-elements'

type SupportProps = {
    route:any,
    navigation:any
}

export const ScreenSupport:React.FC<SupportProps> = (props) => {
    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            title: 'Support',
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
    return(
        <>
          <ScrollView style={{backgroundColor: '#212529', zIndex: 0}}>
            <Button onPress={() => {}} 
            title="Report an error"
            buttonStyle={{backgroundColor:'#212529', justifyContent: 'space-between'}}
            titleStyle={{fontSize: 20, fontFamily: 'Ubuntu-Medium', color: '#fff'}}
            containerStyle={{width: '90%', marginLeft: '5%', marginTop: 15}}
            iconRight
            icon={<Icon name='arrow-forward-ios' size={18} color='#fff'></Icon>}
            />
            <Button onPress={() => {}} 
            title="Open documentation"
            buttonStyle={{backgroundColor:'#212529', justifyContent: 'space-between'}}
            titleStyle={{fontSize: 20, fontFamily: 'Ubuntu-Medium', color: '#fff'}}
            containerStyle={{width: '90%', marginLeft: '5%', marginTop: 15}}
            iconRight
            icon={<Icon name='arrow-forward-ios' size={18} color='#fff'></Icon>}
            />
          </ScrollView>
        </>
        )

}