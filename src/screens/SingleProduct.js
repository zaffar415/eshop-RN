import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    StatusBar
} from 'react-native';
import {
    Card,
    CardItem,
    Content,
    Header, 
    H1,H2,H3,
    Left,Right,Body, 
    Container
} from 'native-base';
import AddToCart from '../components/AddToCart'
import imgPlaceholder from '../../assets/images/img-placeholder.jpg';
import CustomHeader from '../components/Header'
import {API_URL} from '@env';

const SingleProduct = ({navigation,route}) => {
    console.log(route.params);
    const {name, description, image, category, sale_price } = route.params;

    return(
        <>
       <CustomHeader name="Shop" navigation={navigation}/>
        <ScrollView style={{
            padding:15,
        }}>
            <Card>                
                <CardItem bordered>
                    <Image source={{uri: `${API_URL}/product/image/${image[0]}`}} style={{width:'100%',height:300,}} />
                </CardItem>
            </Card>

            <View style={{
                padding:10,
            }}>
                <View
                style={{
                    paddingBottom:15,
                    flex:1,
                    flexDirection:'row',
                    justifyContent:'space-between',
                }}
                >
                    <H2 style={{
                        paddingVertical:10,
                    }}>{name}
                    </H2>
                    <View>
                        <AddToCart navigation={navigation} product={route.params} />                    
                    </View>
                </View>
                <View
                    style={{
                        flex:1,
                        flexDirection:'row',
                        paddingBottom:20,
                    }}
                >
                    <H3>Price: </H3>
                    <Text style={{
                        textAlignVertical:'center',
                    }}> {sale_price} </Text>
                </View>
                
                
                <View>
                    <Text>
                    {description}
                    </Text>
                </View>

                <View>
                    <AddToCart navigation={navigation} product={route.params} />
                </View>
                    
            </View>
        </ScrollView>
        </>
    )
}

export default SingleProduct;