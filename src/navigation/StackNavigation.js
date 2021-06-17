import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Shop from '../screens/Shop';
import Cart from '../screens/Cart';
import Checkout from '../screens/Checkout';

const Stack = createStackNavigator();

export const HomeNavigator = () => {    
    return(
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    )
}

export const ShopNavigator = () => {
    return(
        <Stack.Navigator initialRouteName="Shop">
            <Stack.Screen name="Shop" component={Shop} />
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    )
}

export const CartNavigator = () => {
    return(
        <Stack.Navigator initialRouteName="Cart">
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Shop" component={Shop} />
        </Stack.Navigator>
    )
}

export const CheckoutNavigator = () => {
    return(
        <Stack.Navigator initialRouteName="Checkout">
            <Stack.Screen name="Checkout" component={Checkout} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Shop" component={Shop} />
        </Stack.Navigator>
    )
}

