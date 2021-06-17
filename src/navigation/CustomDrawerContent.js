import React from 'react'
import {Button, View, Text, StyleSheet} from 'react-native';
import {Content, H2} from 'native-base';
import {DrawerItemList,DrawerItem} from '@react-navigation/drawer';
import {connect} from 'react-redux';
import {loginUser, logoutUser} from '../redux/action/actions'
import Snackbar from 'react-native-snackbar';

function CustomDrawerContent(props) {

      return (
      <>
        <View style={styles.flexRow}>
          <Text style={[styles.heading, {color:'#F7941D'}]}>E.</Text>
          <Text style={styles.heading}>Shop</Text>
        </View>
        <Content>
          <DrawerItemList {...props}
           activeBackgroundColor="#F7941D"
           inactiveBackgroundColor="#FFFFFF"
           activeTintColor="#FFFFFF"
           inactiveTintColor="#F7941D"
          />
          {props.isAuthenticated && 
          <DrawerItem 
          label="Logout" 
          onPress={() => { 
              props.logoutUser(); 
              Snackbar.show({
                text:'Logout Success',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor:'red',
              })
              props.navigation.closeDrawer(); }} 
          activeBackgroundColor="#F7941D"
          inactiveBackgroundColor="#FFFFFF"
          activeTintColor="#FFFFFF"
          inactiveTintColor="#F7941D"
          /> }
       </Content>
       <View style={{
         marginBottom:20,
       }}>
         <Text>Facebook</Text>
         <Text>Instagram</Text>
         <Text>Whatsapp</Text>
         <Text>Twitter</Text>
       </View>
      </>
      );
    }


const mapStateToProps = state => ({
    isAuthenticated : state.reducer.isAuthenticated,
});

const mapDispatchToProps = {
    loginUser: (userDetails) => loginUser(userDetails),
    logoutUser: () => logoutUser(),
}
  
    
export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawerContent);


const styles = StyleSheet.create({
    heading: {
      fontSize:50,
    },
    flexRow : {
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        maxHeight:180,
    }
  })