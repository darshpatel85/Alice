import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    TextInput,
    ScrollView,
    ImageBackground,
    ActivityIndicator,
    NativeModules,
    Linking,
} from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles.js';
export default class Register extends ValidationComponent{
    state = {
        email: "",
        pass: "",
        fname: "",
        isload:false,
        lname: "",
    }

    static navigationOptions = {
        title: "Register",
        headerStyle: {
            backgroundColor: "#73C6B6"
        }
    };
    submit = () => {
        const x = this.validate({
            email: { email: true },
            password: { minlength: 8, maxlength: 12, required: true },
            fname: { minlength: 3, maxlength: 10, required: true },
            lname: { minlength: 3, maxlength: 10, required: true}
        })
        if (x) {
            this.register("e")
        }
        else {
            alert("please provide right details");
        }
    }
     register = e => {
      var { email }= this.state;
      var { pass } = this.state;
      var { fname } = this.state;
         var { lname } = this.state;
         this.setState({
             isload:true,
         })
         if (email === "") {

         }
      fetch('https://adminalice.000webhostapp.com/register.php', {
          method: 'post',
          header: {
              'Accept': 'application/json',
              'Content-type': 'application/json'
          },
          body: JSON.stringify({
              email: email,
              pass: pass,
              fname: fname,
              lname: lname,
          })

      })
          .then((response) => response.json())
          .then((responseJson) => {
              if (responseJson === "User Registered Successfully") {
                  this.StrData(email)
                  this.setState({
                      isload: false,
                  })
              }
              else {
                  alert(responseJson);
                  this.setState({
                      isload: false,
                  })
              }
          })
          .catch((error) => {
              console.error(error);
          });
    }
    StrData = async (x) => {
        try {

            await AsyncStorage.setItem('isLoggedIn', x);
            this.props.navigation.navigate('Permission');
        } catch (error) {
        }
    }
    render() {
        return (

            <SafeAreaView>
                <ImageBackground source={require('./images/blur.jpg')} style={{ width: '100%', height: '100%' }}>

                    <View style={styles1.inputView} >
                        <Image source={require('./images/white.png')} style={{ width: '100%', height: '40%' }}  />
                        <ActivityIndicator size="large" animating={this.state.isload} color="#ffffff" />
                        <Text style={styles1.loginText}>Register Here...</Text>
                        <TextInput
                            style={styles1.inputText}
                            keyboardType='email-address'
                            placeholder="Email..."
                            placeholderTextColor="white"
                            onChangeText={email => this.setState({ email })} />
                        <TextInput
                            style={styles1.inputText}
                            placeholder="Password..."
                            placeholderTextColor="white"
                            onChangeText={pass => this.setState({ pass })} />
                        <TextInput
                            style={styles1.inputText}
                            placeholder="FirstName..."
                            placeholderTextColor="white"
                            onChangeText={fname => this.setState({ fname })} />
                        <TextInput
                            style={styles1.inputText}
                            placeholder="LastName..."
                            placeholderTextColor="white"
                            onChangeText={lname => this.setState({ lname })} />

                        <TouchableOpacity style={styles.loginBtn}
                            onPress={this.register}
                        >
                            <Text style={styles1.loginText}>Register</Text>
                        </TouchableOpacity>
                        
                    </View>

                </ImageBackground>
            </SafeAreaView >

        );
    }
}

const styles1 = StyleSheet.create({
    container: {
        flex: 1,

        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#8935AB",
        marginBottom: 40
    },
    inputView: {
        width: "100%",


        flex: 1,
        height: 50,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    inputText: {
        width: 350,
        backfaceVisibility: "visible",
        color: "white",
        backgroundColor: "black",
        opacity: 0.85,
        borderRadius: 20,
        borderColor: null,

        borderWidth: 0.9,

        height: 50,
        padding: 10,

        marginVertical: 10,

        fontSize: 19
    },
    forgot: {
        color: "white",
        fontSize: 15,
        height: 50
    },
    loginText: {
        color: "white",
        fontSize: 20,
        justifyContent: "center",
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#4A0A64",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10,
    },
    titleText: {
        fontSize: 35,

    }
});