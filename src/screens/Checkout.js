import React,{useState,useEffect} from 'react';
import {FlatList, View, Text, StyleSheet, TouchableOpacity,TextInput, ScrollView, StatusBar} from 'react-native';
import {
    Container,
    Form,
    Input,
    InputGroup,
    Item,
    H1, H2, H3,
    Content,
    Body,
    Label,
    Left, Right,
    Textarea,
    Card,
    CardItem,
    Radio,
    ListItem,
    List,
} from 'native-base';
import Axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomHeader from '../components/Header';
import {connect} from 'react-redux';
import {updateCart} from '../redux/action/actions';
import {API_URL} from '@env'
import Snackbar from 'react-native-snackbar';


const Checkout = ({navigation,userDetails,updateCart}) => {

    const [firstname, setFirstname] = useState(userDetails.name)
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('')
    const [country, setCountry] = useState('')
    const [state, setState] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [pincode, setPincode] = useState('');
    const [paymentMode, setPaymentMode] = useState(null);
    const [message, setMessage] = useState('')
    const [subTotal, setSubTotal] = useState(0);

    const radioLabels = [
        {
            label : "Credit/Debit card",
            value : "Credit/Debit card",
        },
        {
            label : "Paypal",
            value : "Paypal",
        },
        {
            label : "Cash on Delivery",
            value : "Cash on Delivery",
        },
    ];

    const checkoutSubmitHandler = () => {
        Axios.post(API_URL + '/order/', {
            user_id : userDetails._id,
            products: userDetails.cart,
            firstname,
            lastname,
            phone,
            country,
            state,
            address1,
            address2,
            pincode,
            message,
            paymentMode,
            totalAmount:parseInt(subTotal)+10,
        })
        .then((response) => {
            console.log(response.data)
            Axios.post(API_URL + '/user/updateCart', {
                user_id:userDetails._id,
                cart:[],
            })
            .then((response) => {
                console.log(response.data)
                let newuserDetails = userDetails;
                newuserDetails.cart = [];
                updateCart(newuserDetails);
                Snackbar.show({
                    text:'Order Successful',
                    duration:Snackbar.LENGTH_SHORT,
                    backgroundColor:'green',
                })
                navigation.navigate('Orders');
            })
        })

    }

    useEffect(() => {
        var total = 0;
        userDetails.cart.map((product,index) => {
            total += parseInt(product.qty) * parseFloat(product.sale_price);
        });
        setSubTotal(total);
    },[navigation]);

    return(
        <>
            <CustomHeader name="Checkout" navigation={navigation} />
            <Container style={{padding:20}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <H2>Make Your Checkout Here</H2>
                    <Text style={{marginVertical:5, fontSize:16,}}>Enter your Checkout Details</Text>
                </View>
                <Form style={{marginVertical:10}}>
                    <View style={{paddingTop:20, paddingBottom:5}}>
                        <Text>First Name *</Text>
                    </View>
                    <Item style={{ marginLeft: 0 }}>
                        <Input placeholder="Enter your name" style={{
                            paddingLeft:15,
                            backgroundColor:'#F6F6F6',
                            fontSize:14,
                        }} 
                        onChangeText={(text) => setFirstname(text)}
                        value={firstname}
                        />
                    </Item>

                    <View style={{paddingTop:20, paddingBottom:5}}>
                        <Text>Last Name *</Text>
                    </View>
                    <Item style={{ marginLeft: 0 }}>
                        <Input placeholder="Enter your name" style={{
                            paddingLeft:15,
                            backgroundColor:'#F6F6F6',
                            fontSize:14,
                        }} 
                        onChangeText={(text) => setLastname(text)}
                        value={lastname}
                        />
                    </Item>

                    <View style={{paddingTop:20, paddingBottom:5}}>
                        <Text>Email *</Text>
                    </View>
                    <Item style={{ marginLeft: 0 }}>
                        <Input placeholder="Enter your email" style={{
                            paddingLeft:15,
                            backgroundColor:'#F6F6F6',
                            fontSize:14,
                        }} 
                        value={userDetails.email}
                        disabled="disabled"
                        />
                    </Item>

                    <View style={{paddingTop:20, paddingBottom:5}}>
                        <Text>Phone *</Text>
                    </View>
                    <Item style={{ marginLeft: 0 }}>
                        <Input placeholder="Enter Mobile Number" 
                        keyboardType={'numeric'}                                            
                        style={{
                            paddingLeft:15,
                            backgroundColor:'#F6F6F6',
                            fontSize:14,
                        }} 
                        onChangeText={(text) => setPhone(text)}
                        value={phone}
                        />
                    </Item>

                    <View style={{paddingTop:20, paddingBottom:5}}>
                        <Text>Address 1 *</Text>
                    </View>
                    <Item style={{ marginLeft: 0 }}>
                        <Input placeholder="Address Line 1" 
                        style={{
                            paddingLeft:15,
                            backgroundColor:'#F6F6F6',
                            fontSize:14,
                        }} 
                        onChangeText={(text) => setAddress1(text)}
                        value={address1}
                        />
                    </Item>

                    <View style={{paddingTop:20, paddingBottom:5}}>
                        <Text>Address 2 *</Text>
                    </View>
                    <Item style={{ marginLeft: 0 }}>
                        <Input placeholder="Address Line 2" 
                        style={{
                            paddingLeft:15,
                            backgroundColor:'#F6F6F6',
                            fontSize:14,
                        }}
                        onChangeText={(text) => setAddress2(text)}
                        value={address2}
                        />
                    </Item>

                    <View style={{paddingTop:20, paddingBottom:5}}>
                        <Text>State *</Text>
                    </View>
                    <Item style={{ marginLeft: 0 }}>
                        <Input placeholder="Enter State" 
                        style={{
                            paddingLeft:15,
                            backgroundColor:'#F6F6F6',
                            fontSize:14,
                        }} 
                        onChangeText={(text) => setState(text)}
                        value={state}
                        />
                    </Item>

                    <View style={{paddingTop:20, paddingBottom:5}}>
                        <Text>Country *</Text>
                    </View>
                    <Item style={{ marginLeft: 0 }}>
                        <Input placeholder="Enter Country" 
                        style={{
                            paddingLeft:15,
                            backgroundColor:'#F6F6F6',
                            fontSize:14,
                        }} 
                        onChangeText={(text) => setCountry(text)}
                        value={country}
                        />
                    </Item>

                    <View style={{paddingTop:20, paddingBottom:5}}>
                        <Text>Postal Code *</Text>
                    </View>
                    <Item style={{ marginLeft: 0 }}>
                        <Input placeholder="Enter Pincode" 
                        keyboardType={'numeric'}                                            
                        style={{
                            paddingLeft:15,
                            backgroundColor:'#F6F6F6',
                            fontSize:14,
                        }} 
                        onChangeText={(text) => setPincode(text)}
                        value={pincode}
                        />
                    </Item>

                    <View style={{paddingTop:20, paddingBottom:5}}>
                        <Text>Some Message</Text>
                    </View>
                    <Item style={{ marginLeft: 0 }}>
                        <Textarea
                        style={{
                            paddingLeft:15,
                            backgroundColor:'#F6F6F6',
                            fontSize:14,
                            width:'100%',
                        }}
                        onChangeText={(text) => setMessage(text)}                        
                        >
                        {message}
                        </Textarea>
                    </Item>

                    <Card 
                    style={{
                        marginTop:20,
                        padding:5,
                    }}
                    >
                        <CardItem>
                            <H3>Cart Total</H3>
                        </CardItem>
                        <View
                        style={{
                            borderBottomWidth:3,
                            borderBottomColor:'#F7941D',
                            width:50,
                            marginLeft:15,
                        }}
                        />
                        <CardItem style={{
                            justifyContent:'space-between',
                        }}>
                            <Text>Sub Total</Text>
                            <Text>${subTotal}</Text>
                        </CardItem>
                        <CardItem style={{
                            justifyContent:'space-between',
                        }}>
                            <Text>(+) Shipping</Text>
                            <Text>$10</Text>
                        </CardItem>
                        <CardItem style={{
                            justifyContent:'space-between',
                        }}>
                            <Text>Total</Text>
                            <Text>${parseFloat(subTotal)+10}</Text>
                        </CardItem>

                    </Card>

                    <View
                    style={{
                        marginVertical:20,
                    }}
                    >
                        <H3>Payment Method</H3>
                        <View
                        style={{
                            borderBottomWidth:3,
                            borderBottomColor:'#F7941D',
                            width:50,
                            marginTop:10,
                        }}
                        />
                        <List>
                            {radioLabels.map((item,index) => (
                                <ListItem key={index}>
                                <Radio 
                                onPress={() => setPaymentMode(item.value)}
                                iconName={"lens"}
                                label={"The first option"}
                                selected={paymentMode == item.value}
                                />
                                <Text
                                style={{
                                    paddingLeft:10,
                                }}
                                >{item.label}</Text>
                                </ListItem>
                            ))}
                            
                        </List>
                    </View>

                    <View>
                        <TouchableOpacity style={{
                            marginVertical:20,
                            padding:15,
                            backgroundColor:'#F7941D',
                        }}
                        onPress={checkoutSubmitHandler}
                        >
                            <Text
                            style={{
                                textAlign:'center',
                                fontWeight:'bold',
                            }}
                            >Submit</Text>
                        </TouchableOpacity>
                    </View>
                </Form>
                </ScrollView>
            </Container>
        </>
    )
}

const mapStateToProps = state => ({
    userDetails : state.reducer.userDetails,
    isAuthenticated : state.reducer.isAuthenticated,
});

const mapDispatchToProps = {
    updateCart : (userDetails) => updateCart(userDetails),
}
export default connect(mapStateToProps,mapDispatchToProps)(Checkout);