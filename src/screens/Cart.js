import React,{useState, useEffect} from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList, TouchableOpacity, StatusBar} from 'react-native';
import {
    Card,
    CardItem,
    Container,
    H1,H2,H3,
    Left,Body,
    Thumbnail
} from 'native-base';
import CustomHeader from '../components/Header';

import {connect} from 'react-redux';
import { addToCart } from '../redux/action/actions';
import {API_URL} from '@env';

const Cart = ({navigation, addToCart, userDetails, isAuthenticated}) => {
    console.log(userDetails);
    const [cart,setCart] = useState(userDetails.cart);
    const [subTotal,setSubTotal] = useState(0);

    const updateQty = (quantity,index,product) => {
        if(quantity > 0) {
            let userToUpdate = userDetails;
            userToUpdate.cart[index].qty = quantity;
            console.log(userToUpdate);
        }
    }
    
    useEffect(() => {
        var total = 0;
        setCart(userDetails.cart);
        cart.map((product,index) => {
            total += parseInt(product.qty) * parseFloat(product.sale_price);
        });
        setSubTotal(total);
    },[navigation])
    
    // const cart = [
    //     {
    //         id:1,
    //         product: 'product Image',
    //         name:'name',
    //         description: 'Lorem ipsum iis a dummy text used as a description...',
    //         price:12,
    //         quantity:1,
    //         total:120,
    //         remove:'remove',
    //     },
    //     {
    //         id:2,
    //         product: 'product Image',
    //         name:'name',
    //         description: 'Lorem ipsum iis a dummy text used as a description...',
    //         price:12,
    //         quantity:1,
    //         total:120,
    //         remove:'remove',
    //     },
    // ];

    return(
        <>
        <CustomHeader name="Cart" navigation={navigation}/>
        <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#F7941D"/>
        <Container padder style={styles.container}>
            <FlatList
            data={cart}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            renderItem = {({item,index}) => 
                <Card>
                    <CardItem style={{alignItems: 'flex-start'}}> 
                        <Text style={[styles.bgOrange, {width:'50%',}]}>PRODUCT</Text>
                        <Thumbnail square large source={{uri : `${API_URL}/product/image/${item.image[0]}`}} style={{marginLeft:10, width:'50%', height:150}} />
                    </CardItem>
                    <CardItem style={{alignItems: 'flex-start'}}>
                        <Text style={[styles.bgOrange, {width:'50%'}]}>NAME</Text>
                        <View style={{width:'50%', padding:10}}>
                            <Text style={{color:'#000', fontWeight:'bold', fontSize:16,}}>{item.name}</Text>
                            <Text>{item.description}</Text>
                        </View>
                    </CardItem>
                    <CardItem>
                        <Text style={[styles.bgOrange, {width:'50%',}]}>UNIT PRICE</Text>
                        <Text style={{width:'50%', color:'#000', padding:10}}>{item.sale_price}</Text>
                    </CardItem>
                    <CardItem>
                        <Text style={[styles.bgOrange, {width:'50%',}]}>QUANTITY</Text>
                        <TouchableOpacity style={{width:'15%', color:'#000', padding:10}} onPress={() => updateQty(parseInt(item.qty)-1,index,item)}><Text> - </Text></TouchableOpacity>
                        <Text style={{width:'20%', color:'#000', padding:10}}>{item.qty}</Text>
                        <TouchableOpacity style={{width:'15%', color:'#000', padding:10}} onPress={() => updateQty(parseInt(item.qty)+1,index,item)}><Text> + </Text></TouchableOpacity>
                    </CardItem>
                    <CardItem>
                        <Text style={[styles.bgOrange, {width:'50%',}]}>TOTAL</Text>
                        <Text style={{width:'50%', color:'#000', padding:10}}>{parseFloat(item.qty) * parseFloat(item.sale_price)}</Text>
                    </CardItem>
                    <CardItem>
                        <Text style={[styles.bgOrange, {width:'50%',}]}>REMOVE</Text>
                        <TouchableOpacity style={{width:'50%'}}>
                            <Text style={styles.textDanger}>REMOVE</Text>
                        </TouchableOpacity>
                    </CardItem>
                </Card>
            }
            />

            <View>
                <Card>
                    <CardItem 
                    style={{
                        justifyContent:'space-between',
                    }}
                    >
                        <Text style={{
                            fontWeight:'bold',
                        }}>Sub Total : ${subTotal}</Text>

                        <TouchableOpacity
                        onPress={() => navigation.navigate("Checkout")}
                        style={{
                            backgroundColor:'#F7941D',
                            padding:10,
                        }}
                        >
                            <Text
                            style={{
                                color:'#fff',
                            }}

                            >Proceed to Checkout</Text>
                        </TouchableOpacity>
                    </CardItem>
                </Card>
            </View>
        </Container>
        </>
    )
}   

const mapStateToProps = state => ({
    userDetails : state.reducer.userDetails,
    isAuthenticated : state.reducer.isAuthenticated,
});

const mapDispatchToProps = {
    addToCart : (userDetails) => addToCart(userDetails)
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart);

const styles = StyleSheet.create({
    container : {
        padding:10,
    },
    textOrange : {
        color:'#F7941D',
        padding:10,
    },
    bgOrange : {
        backgroundColor:'#F7941D',
        color:'#fff',
        padding:10,
    },
    textDanger: {
        color:'#ff0000',
        padding:10,
    }
})
