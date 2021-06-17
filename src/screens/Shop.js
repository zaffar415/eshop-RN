import React,{useEffect, useState} from 'react';
import {View,Text,SafeAreaView,StyleSheet, ScrollView, FlatList, StatusBar} from 'react-native';
import {
    Container,
    Content,
    Left,
    Body,
    H2,
} from 'native-base'
import ProductCard from '../components/ProductCard';
import CustomHeader from '../components/Header';
import axios from 'axios';
import { connect } from 'react-redux';
import {API_URL} from '@env';


const Shop = ({navigation}) => {
    const [products,setProducts] = useState(null);
    console.log(API_URL);
    const getProducts = async() => {
        await axios.get(`${API_URL}/product/`)
        .then((response) => {
            console.log(response.data);
            setProducts(response.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }


    useEffect(() => {
        getProducts();
    },[])

    // const products = [
    //     {
    //         id:1,
    //         title:'Eshop',
    //         description:'Lorem ipsum iis a dummy text used as a description...'
    //     },
    //     {
    //         id:2,
    //         title:'Eshop',
    //         description:'Lorem ipsum iis a dummy text used as a description...'
    //     },
    //     {
    //         id:3,
    //         title:'Eshop',
    //         description:'Lorem ipsum iis a dummy text used as a description...'
    //     },
    //     {
    //         id:4,
    //         title:'Eshop',
    //         description:'Lorem ipsum iis a dummy text used as a description...'
    //     },
    //     {
    //         id:5,
    //         title:'Eshop',
    //         description:'Lorem ipsum iis a dummy text used as a description...'
    //     },
    //     {
    //         id:6,
    //         title:'Eshop',
    //         description:'Lorem ipsum iis a dummy text used as a description...'
    //     },
    //     {
    //         id:7,
    //         title:'Eshop',
    //         description:'Lorem ipsum iis a dummy text used as a description...'
    //     },
    // ]

    return(
        <>
        <CustomHeader name="Shop" navigation={navigation}/>
        <Container padder>
            <View style={{paddingTop:10}}>
                <FlatList 
                data={products}
                renderItem={({item}) => <ProductCard item={item} navigation={navigation} />}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item._id}
                numColumns={2}                
                />

                {/* <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard /> */}
                
            </View>
            
        </Container>
        </>
    )
}

export default connect()(Shop);

const styles = StyleSheet.create({
   
})

