import React from 'react'
import {View, Text, TouchableHighlight, ActivityIndicator } from 'react-native'
import {Card, Image, Button, Icon} from 'react-native-elements'
import { IStream } from '../Types/interfaces'
import { Menu, Divider, Provider, Dialog } from 'react-native-paper';

const standartPreview = `https://i09.fotocdn.net/s122/090038aab57a6637/user_l/2788818684.jpg`

type StreamProps = {
    stream:IStream,
    openStream(stream:IStream):void,
    onChange(stream:IStream):void,
    onDelete(id:string):void
}

export const StreamPreview:React.FC<StreamProps> = (props) => {
    const [visible, setVisible] = React.useState(false);
    const [change, setChange] = React.useState(false)
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    return (
        <View style={{
            backgroundColor: 'rgba(0,0,0,0)',
            borderRadius: 15,
            width: '90%',
            marginLeft: '5%',
            marginBottom: 15
            }}>
        <TouchableHighlight onPress={() => props.openStream(props.stream)} activeOpacity={1} underlayColor={'rgba(0,0,0,0)'}>
            <View>
            <View
                    style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    width: 45,
                    height: 45,
                    position: 'absolute',
                    top: 5,
                    right: 0,
                    zIndex: 10,
                }}>
                    <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<Button onPress={openMenu} buttonStyle={{backgroundColor:'rgba(0,0,0,0)', borderRadius: 15}} icon={<Icon name="more-vert" color='#000'/>} />}>
                    <Menu.Item 
                    onPress={() => props.onChange(props.stream)} 
                    title="Изменить" />
                    <Menu.Item 
                    onPress={() => props.onDelete(props.stream.id)} 
                    title="Удалить" />
                    </Menu>
                </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', height: 220}}>
                <Image containerStyle={{width:'100%', height: '100%', borderRadius: 15}} 
                source={{ uri: props.stream.preview === '' ? standartPreview : props.stream.preview }}
                PlaceholderContent={<ActivityIndicator style={{height: 220}} size="large" color="#0000ff"/>}
                placeholderStyle={{backgroundColor: '#eee'}}/>
            </View>
            <View style={{width:'100%', padding:14, borderRadius:15, position: 'absolute', bottom: 0, backgroundColor:'rgba(0, 0, 0, 0.7)'}}>
                <Text style={{fontSize: 18, fontWeight: '700', color: '#fff'}}>{props.stream.title}</Text>
                <Text style={{marginTop: 10, fontSize: 16, color: '#fff'}}>{props.stream.description}</Text>
            </View>
            </View>
        </TouchableHighlight>
        
        </View >
    )
}