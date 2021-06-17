import React,{useState} from 'react';
import {TouchableHighlight,Text, StyleSheet} from 'react-native'
import Snackbar from 'react-native-snackbar';
import {connect} from 'react-redux';
import Axios from 'axios';
import { addToCart } from '../redux/action/actions';

const AddToCart = ({navigation, product, userDetails, addToCart}) => {

    const [productList, setProductList] = useState(null);

    const addCart = (product) => {

        var user = userDetails;
        let exists = userDetails.cart.find((value, index) => {
            if(value._id === product._id) {
                return true;
            }
        });
        if(exists) {
            Snackbar.show({
                text:'Already Added to Cart',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor:'red',
                action: {
                    text: 'VIEW CART',
                    textColor: 'white',
                    onPress: () => { navigation.navigate('Cart')},
                },
            });   
        } else {
            product.qty = 1;
            user.cart.push(product);
            console.log(user);
            Snackbar.show({
                text:'Added To cart',
                duration:Snackbar.LENGTH_SHORT,
                backgroundColor:'green',
                action: {
                    text: 'VIEW CART',
                    textColor: 'white',
                    onPress: () => { navigation.navigate('Cart')},
                }
            });
        }

    }

    return(
        <TouchableHighlight onPress={() => addCart(product)} style={styles.addtocart}>
            <Text style={styles.textCenter}>Add To Cart</Text>
        </TouchableHighlight>
    )
}

const mapStateToProps = state => ({
    userDetails : state.reducer.userDetails,
    isAuthenticated : state.reducer.isAuthenticated,
});

const mapDispatchToProps = {
    addtocart : (userDetails) => addToCart(userDetails),
}

export default connect(mapStateToProps,mapDispatchToProps)(AddToCart);

const styles = StyleSheet.create({
    addtocart: {
        backgroundColor:'#F7941D',
        padding:5,
        width:'100%',
        padding:10,
        marginTop:10,
    },
    textCenter: {
        textAlign:'center',
        color:'#fff',
        fontWeight:'bold',
    }
});