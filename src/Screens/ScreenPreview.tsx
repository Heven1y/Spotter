import React from 'react'
import {View, Text} from 'react-native'

export const Preview:React.FC = () => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Text style={{fontSize: 25}}>Spooter</Text>
        </View>
    )
}