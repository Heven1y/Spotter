import { transform } from '@babel/core';
import React from 'react'
import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
      flex: 3,
      alignItems: 'center'
    },
    login_text: {
      position: 'relative',
      fontSize: 20,
      marginBottom: 20
    },
    input_style: {
      width: 300,
    },
    button_style: {
      flexDirection: 'row',
    },
    btn_register: {
      marginLeft: 30
    },
    header: {
      fontSize: 16
    },
    icon_add: {
      position: 'relative',
      color: '#72A8BC',
      fontSize: 32,
      right: 5
    },
    icon_settings: {
      position: 'relative',
      color: '#72A8BC',
      fontSize: 32,
      width: 40
    },
    column_style: {
      width: '100%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderRadius: 5
    },
    column_style_onPress: {
      width: '90%',
      marginLeft: '5%',
      marginBottom: 10,
      borderStyle: 'solid',
      borderRadius: 5,
      tintColor: '#fff'
    },
    icon_check: {
      position: 'relative',
      color: '#72A8BC',
      width: 40,
      left: '85%',
      top: '-5%'
    },
    icon_trash: {
      position: 'absolute',
      color: '#FF0000',
      width: 40,
      left: '5%',
      top: '75%'
    },
    card_style: {
      width: '100%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderTopWidth: 0,
      borderColor: '#f0f0f0'
    },
    button_sub_and_hide: {
      width: '100%', 
      height: 30, 
      borderStyle: 'solid',
      borderRadius: 50,
      backgroundColor: '#BFB393'
    },
    header_card_title: {
      fontSize: 16,
      color: '#fff',
      overflow: 'hidden'
    },
    header_card: {
      backgroundColor: '#BFB393',
      elevation: 0,
      shadowOpacity: 0,
    },
    icon_edit_card: {
      position: 'relative',
      color: '#fff',
      width: 40
    },
    icon_add_comment: {
      position: 'relative',
      color: '#BFB393',
    },
    style_text_in_card: {
        fontSize: 16,
        color: '#BFB393',
        marginLeft: 20,
        marginBottom: 10,
        marginRight: 20,
        lineHeight: 25
    },
    style_View_in_card: {
      backgroundColor: '#fff',
      borderStyle: 'solid',
      borderBottomWidth: 1,
      borderColor: '#f0f0f0',
    },
    style_text_in_card_for_title: {
      fontSize: 20,
      color: '#72A8BC',
      marginLeft: 10,
      marginTop: 10,
      marginBottom: 10
    },
  });

export default styles