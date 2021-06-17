import React,{useState} from 'react'
import {StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity, Image} from 'react-native';
import {
  Container,
  Text,
  Form,
  Item,
  Input,
  H1,
  Label,
  Button,
} from 'native-base';


import {registerUser} from '../redux/action/actions'
import {connect} from 'react-redux'
import Axios from 'axios'
import ImagePicker from 'react-native-image-picker';


const Register = ({navigation, registerUser}) => {

  const HOST = 'http://953c534b3c07.ngrok.io';
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [image, setImage] = useState(null);
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [errorMsg, setErrorMsg] = useState(null);

  const registerHandler = async() => {
    setErrorMsg(null)
    if(password1 === password2)  {

      const formData = new FormData();
      formData.append('name',name);
      formData.append('email',email);
      formData.append('password' , password1);
      formData.append('image', {
        uri:image.uri,
        type:image.type,
        name: image.fileName,
      });


      await Axios.post(`${HOST}/register`, formData , {
        headers: {
          'Content-Type' : 'multipart/form-data',
        }
      })
      .then((response) => {
        console.log(response.data)
        if(response.data == 1 ) {
          let userDetails = {
            name,
            email,
            password:password1,
          }
          registerUser(userDetails);
          navigation.navigate("Home");
        }
        else {
          setErrorMsg(response.data);
        }
      })
    }
    else {
      setErrorMsg("Password doesn't Match");
    }
  }

  const chooseImage = () => {
    ImagePicker.showImagePicker({
      mediaType:'photo',
    }, (response) => {
      
      if (response.didCancel) {
        console.log('User Cancelled Image picker');
      } else if (response.error) {
        console.log('Image Picker Error :', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom Button :', response.customButton);
      } else {
        console.log(response.path);
        setImage(response);
      }
    });

  }

  return (
    <ScrollView>
      <Container style={styles.container}>
        <Form style={styles.form}>
        <H1 style={{paddingVertical:35, alignItems:'center', textAlign:'center'}}>Register !!</H1>
        {errorMsg && (
          <Text
          style={{
            color:'red',
            padding:5,
          }}
          >
          {errorMsg}
          </Text>
        )}
          <Item floatingLabel style={styles.item}>
            <Label>Name</Label>
            <Input 
            value={name}
            onChangeText={(text) => setName(text)}
            />
          </Item>
          <Item floatingLabel style={styles.item}>
            <Label>Email</Label>
            <Input 
            value={email}
            onChangeText={(text) =>setEmail(text)}
            />
          </Item>
          
          <Item floatingLabel style={styles.item}>
            <Label>Password</Label>
            <Input 
            value={password1}
            onChangeText={(text) => setPassword1(text)}
            secureTextEntry={true}
            />
          </Item>
          <Item floatingLabel style={styles.item}>
            <Label>Confirm Password</Label>
            <Input 
            value={password2}
            onChangeText={(text) => setPassword2(text)}
            secureTextEntry={true}
            />
          </Item>

          <View
          style={{
            marginTop:20,
            textAlign:'center',
            padding:10,
          }}
          >
          {image !== null ? (
            <View>
              <TouchableOpacity
              onPress={() => setImage(null)}
              >
                <Text 
                style={{
                  textAlign:'right',
                  color:'red'
                }}
                >Remove</Text>
              </TouchableOpacity>
             <Image 
             source={{uri:image.uri}}
             style={{width:'100%', height:200}}
             />
            </View>
            
          ) : (
            
            <Button 
            regular
            onPress={chooseImage}
            >
              <Text>chooseImage</Text>
            </Button>

          )}
          </View>


          <TouchableOpacity style={styles.button} onPress={registerHandler}>
            <Text style={styles.btnText}> Register </Text>  
          </TouchableOpacity>      

          <View style={styles.clickHere}>
            <Text>Already Have an Account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login") }>
              <Text style={styles.clickHereText}>Click Here</Text>
            </TouchableOpacity>
          </View>

        </Form>
      </Container>
    </ScrollView>
  )
}

const mapDispatchToProps = {
  registerUser : (userDetails) => registerUser(userDetails)
}

export default connect(null, mapDispatchToProps)(Register);

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
