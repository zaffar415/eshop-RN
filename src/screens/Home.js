import React from 'react';
import {Text,View,Image,StyleSheet, Button, StatusBar, TouchableHighlight} from 'react-native';
import {
    Container,
    H1,H2,H3,
} from 'native-base';
import CustomHeader from '../components/Header'

const Home = ({navigation}) => {
    return(
        <>
        <CustomHeader name="Home" navigation={navigation}/>
        <Container style={styles.container}>
            <View style={styles.flex}>
                <H1>Welcome to</H1>
                <View style={{flexDirection:'row'}}>
                    <Text style={[styles.heading, {color:'#F7941D'}]}>E.</Text>
                    <TouchableHighlight 
                    onPress={() => navigation.navigate("Shop")}
                    underlayColor="#F7941D"
                    >
                        <Text style={styles.heading}>Shop</Text>
                    </TouchableHighlight>
                </View>
                <H3> A Simple E-commerce App </H3>
            </View>
        </Container>
        </>
    )
}

export default Home;

const styles = StyleSheet.create({
    container : {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    heading: {
        fontSize:50,
    },
    flex : {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    }
})