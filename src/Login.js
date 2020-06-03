// JavaScript source code
import React, { Component, useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    ImageBackground,
    BackHandler, Alert,
} from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import AsyncStorage  from '@react-native-community/async-storage';



export default class Login extends ValidationComponent {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }
    backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to exit?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
    };

    state = {
        isload:false,
        pass: "",
        email: "",
        log:false,
    }
    static navigationOptions = {
        title: "Login",
        headerStyle: {
            backgroundColor: "#73C6B6"
        }
    }


    Submiting = () => {
    
        if (this.validate({
            email: { email: true },

        })) {
  
            this.Login("j");
        }
        else {
            alert("It seems Email is not valid");
        }
    }


    
    Login = e => {
        var { email } = this.state;
        var { pass } = this.state;
        this.setState({
            isload: true
        })

       
       
           fetch('https://adminalice.000webhostapp.com/login.php', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
               body: JSON.stringify({
                   
                   email: email,
                   pass: pass,
               
            })

           }) 
               .then((response) => 
                   response.json()
                   
                  ).then((res) => {
                      this.storeData;
                   if (res === "Wrong Details" || res === "try again") {
                       alert(res);
                       this.setState({
                           isload: false
                       })
                   }
                   else {
                      
                       this.setState({
                           isload: false,
                           log: true,
                           
                       })
                       this.StrData(email);
                       
                   }
               })
              
            .catch((error) => {
                console.error(error);
            });
       
    }
    StrData = async(x) => {
        try {
   
            await AsyncStorage.setItem('isLoggedIn', x);
            this.props.navigation.push('Permission');
        } catch (error) {
        }
    }
   
    render() {
       
        return (
            
            <SafeAreaView>
                <ImageBackground source={require('./images/blur.jpg')} style={{ width: '100%', height: '100%' }}>
                    
                    <View style={styles1.inputView} >
                        <Image source={require('./images/white.png')}  style={{ width: '100%', height: '40%' }} />
                        <TextInput
                            style={styles1.inputText}
                            ref="email"
                            keyboardType='email-address'
                            placeholder="Email..."
                            placeholderTextColor="white"
                            onChangeText={email => this.setState({ email })} />
                        
                        <TextInput
                            style={styles1.inputText}
                            placeholder="Password..."
                            ref="password"
                            placeholderTextColor="white"
                            secureTextEntry={true}
                            onChangeText={pass => this.setState({ pass })} />
                        
                        <ActivityIndicator size="large" animating={this.state.isload} color="#0000ff" />
                        <TouchableOpacity style={styles1.loginBtn}
                            onPress={this.Submiting}
                        >
                            
                            <Text style={styles1.loginText}>LOGIN
                           </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={
                                () => {
                                    this.props.navigation.push('Register')
                                }
                            }
                        >
                            <Text style={styles1.loginText}>New user? Register here</Text>
                        </TouchableOpacity>
                 
                    </View>
                </ImageBackground>
                </SafeAreaView>
            
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
        height: 20,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    inputText: {
        width: 350,
        backfaceVisibility:"visible",
        color: "white",
        backgroundColor: "black",
        opacity: 0.85,
        borderRadius:20,
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
        backgroundColor:"#0049ff",
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