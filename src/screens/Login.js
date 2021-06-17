import React,{useState} from 'react'
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import {
  Container,
  Text,
  Form,
  Item,
  Input,
  H1,
  Label,
} from 'native-base';
import Snackbar from 'react-native-snackbar'

import CustomHeader from '../components/Header'
import {API_URL} from '@env';

import {loginUser} from '../redux/action/actions'
import {connect} from 'react-redux'
import Axios from 'axios'

const Login = ({navigation, loginUser}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const formSubmit = async() => {
    try {
      await Axios.post(`${API_URL}/user/login`, {
        email,
        password,
      }) 
      .then((response) =>{
        if(response.data.email === email) {
          Snackbar.show({
            text:'Login Success',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor:'green',
          })
          loginUser(response.data);
          // navigation.navigate("Home");
        } else {
          Snackbar.show({
            text:'INVALID CREDENTIALS',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor:'red',
          });
        }
      })  
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <>
    
      <CustomHeader name="Login" />
      <Container style={styles.container}>
        <Form style={styles.form}>
        <View style={{flexDirection:'row', paddingTop:20, justifyContent:'center', alignItems:'center'}}>
          <H1 style={{color:'#F7941D'}}>E.</H1>
          <H1>Shop</H1>
        </View>

          <Item floatingLabel style={styles.item}>
            <Label>Email</Label>
            <Input 
            value={email}
            onChangeText={(text) => setEmail(text)}
            />
          </Item>
          <Item floatingLabel style={styles.item}>
            <Label>Password</Label>
            <Input 
            value={password}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            />
          </Item>

          <TouchableOpacity 
          style={styles.button}
          onPress={formSubmit}
          >
            <Text style={styles.btnText}> Login </Text>  
          </TouchableOpacity>      

          <View style={styles.clickHere}>
            <Text>Don't Have an Account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register") }>
              <Text style={styles.clickHereText}>Click Here</Text>
            </TouchableOpacity>
          </View>
          
          
        </Form>
      </Container>
    </>
  )
}

const mapDispatchToProps = {
  loginUser: (userDetails) => loginUser(userDetails),
}


export default connect(null, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#454545',
  },
  form: {
    backgroundColor:'#fff',
    color:'#000',
    width:'80%',
    paddingVertical:20,
    borderRadius:10,
  },
  item : {
    padding:5,
  },
  button: {
    backgroundColor:'green',
    color:'#fff',
    alignItems:'center',
    alignSelf:'center',
    paddingHorizontal:50,
    paddingVertical:5,
    borderRadius:5,
    marginTop:30,
  },
  btnText: {
    paddingVertical:10,
    color:'#fff',
    fontSize:24,
  },
  clickHere: {
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    paddingTop:30,
  },
  clickHereText: {
    color:'blue',
  }
})
