import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity,StatusBar} from 'react-native';
import {
    Header,
    Left,Body,Right,
    H3,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomHeader = ({name, navigation}) => {
    return(
        <>
        <Header style={{backgroundColor:'#F7941D'}}>
            <Left style={{flex:1, flexDirection:'row', alignItems:'center',}}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Icon name="bars" color="white" size={30} />    
                </TouchableOpacity>
                <H3 style={{color:'#fff',fontWeight:'bold', marginTop:5, marginLeft:15,}}>{name}</H3>
            </Left>
            <Body>

            </Body>
        </Header>
        <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#F7941D"/>
        </>
    )
}

export default CustomHeader;