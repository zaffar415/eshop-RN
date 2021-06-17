import React,{useState,useEffect} from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    StatusBar,
} from 'react-native';
import {
    Card,
    CardItem,
    Container,
    Left,Body,
    H1,H2,H3,
} from 'native-base';
import CustomHeader from '../components/Header';
import {API_URL} from '@env';
import {connect} from 'react-redux'
import Axios from 'axios';

const Orders = ({navigation,userDetails}) => {

    const [orderList, setOrderList] = useState(null);
    const status = ["", 'Processing', 'Shipping', "Out for Delivery", "Delivered"];

    const fetchOrders = () => {
        Axios.get(API_URL + '/order/orders/' + userDetails._id)
        .then((response) => {
            setOrderList(response.data);
            console.log(response.data);
        });
    }

    useEffect(() => {
        fetchOrders();
    },[navigation]);

    return(
        <>
        <CustomHeader name="Orders" navigation={navigation}/>
        <Container padder style={{padding:10}}>
            <FlatList 
            data={orderList}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => 
                <Card>
                    <CardItem>
                        <Text style={[styles.bgOrange, {width:'50%'}]}>ID</Text>
                        <Text style={{width:'50%', color:'#000', padding:10}}>{item._id}</Text>
                    </CardItem>
                    <CardItem style={{alignItems: 'flex-start'}}>
                        <Text style={[styles.bgOrange, {width:'50%'}]}>PRODUCTS</Text>
                        <View style={{width:'50%'}}>
                        {item.products.map((product) => (
                            <Text style={{color:'#000', fontWeight:'bold', padding:10,}} key={product._id}>{product.name}</Text>
                        ))}
                        </View>
                    </CardItem>
                    <CardItem>
                        <Text style={[styles.bgOrange, {width:'50%'}]}>TOTAL</Text>
                        <Text style={{width:'50%', color:'#000', padding:10}}>{item.totalAmount}</Text>
                    </CardItem>
                    <CardItem>
                        <Text style={[styles.bgOrange, {width:'50%'}]}>PAYMENT MODE</Text>
                        <Text style={{width:'50%', color:'#000', padding:10}}>{item.paymentMode}</Text>
                    </CardItem>
                    <CardItem>
                        <Text style={[styles.bgOrange, {width:'50%'}]}>STATUS</Text>
                        <Text style={{width:'50%', color:'#000', padding:10}}>{item.status}</Text>
                    </CardItem>
                </Card>
            }
            />
        </Container>
        </>
    )
}

const mapStateToProps = state => ({
    userDetails : state.reducer.userDetails,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps,mapDispatchToProps)(Orders);

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
