import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
    Card,
    CardItem,
    Body,
    H1, H2, H3,
    Thumbnail,
} from 'native-base';
import {API_URL} from '@env';

import imgPlaceholder from '../../assets/images/img-placeholder.jpg';
import AddToCart from './AddToCart';

const ProductCard = ({item, navigation}) => {

    return(
        <Card style={styles.card}>
            <TouchableOpacity onPress={() => navigation.navigate("SingleProduct",{...item})}>              
            <CardItem>  
                <Thumbnail square large source={{uri : `${API_URL}/product/image/${item.image[0]}`}} style={{width:'100%',height:130}} />
            </CardItem>
            </TouchableOpacity>
            <CardItem>
                <Body>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate("SingleProduct")}>
                            <H3>{item.name}</H3>
                        </TouchableOpacity>
                        <Text>{item.small_description}</Text>
                    </View>
                    <AddToCart navigation={navigation} product={item} />
                </Body>
            </CardItem>
        </Card>
    )
}

export default ProductCard;

const styles = StyleSheet.create({
    card: {
        width:'48.5%',
        marginLeft:3,
        
    }
})