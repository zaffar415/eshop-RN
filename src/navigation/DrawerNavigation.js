import React,{useState} from 'react';
import {connect} from 'react-redux';
import {Button, View, Text, StyleSheet} from 'react-native';
import {Content, H2} from 'native-base';
import {createDrawerNavigator,DrawerItem, DrawerItemList} from '@react-navigation/drawer';
// import {CartNavigator, CheckoutNavigator, HomeNavigator, ShopNavigator} from './StackNavigation';
import Home from '../screens/Home';
import Checkout from '../screens/Checkout';
import Cart from '../screens/Cart';
import Shop from '../screens/Shop';
import Orders from '../screens/Orders';
import SingleProduct from '../screens/SingleProduct';
import Login from '../screens/Login';


import {loginUser, logoutUser} from '../redux/action/actions'

import CustomDrawerContent from './CustomDrawerContent';


const DrawerNavigation = (props,{isAuthenticated}) => {
    const Drawer = createDrawerNavigator();

    return(
        <Drawer.Navigator 
        drawerContent={(props) => <CustomDrawerContent {...props}/>}
        > 
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Shop" component={Shop} />
            <Drawer.Screen name="SingleProduct" component={SingleProduct} />
            <Drawer.Screen name="Cart" component={Cart}/>
            <Drawer.Screen name="Checkout" component={Checkout}/>
            <Drawer.Screen name="Orders" component={Orders}/>
            {!props.isAuthenticated && <>
            
            <Drawer.Screen name="Login" component={Login} />
            </> } 
            

        </Drawer.Navigator>
    )
}

const mapStateToProps = state => ({
  isAuthenticated : state.reducer.isAuthenticated,
})

const mapDispatchToProps = {
  loginUser: (userDetails) => loginUser(userDetails),
  logoutUser: () => logoutUser(),
}

connect(mapStateToProps)(CustomDrawerContent);

export default connect(mapStateToProps, mapDispatchToProps)(DrawerNavigation);
