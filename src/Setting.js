import React, { Component } from 'react';
import { SafeAreaView, NativeModules, StyleSheet, View, Text, Alert, Image, BackHandler, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-community/async-storage';
var SendIntentAndroid = require("react-native-send-intent");
var RNSendIntentAndroid = NativeModules.SendIntentAndroid || {};
export default class setting extends React.Component {
    constructor(props) {
        super(props);
        this.retrieveData;
    }
    state = {
        storage: false,

    }
    logout = () => {
        Alert.alert("Hold on!", "Are you sure you want to logout?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "YES", onPress: () => this.remove("") }
        ]);
        return true;
    };
    send = () => {
        SendIntentAndroid.sendMail("darshspatel85@gmail.com", "", "");
    }
    remove = async() => {
        try {
        
        AsyncStorage.removeItem("isLoggedIn");
        this.props.navigation.push("AuthStack", {screen:"Login"});
    } catch (error) { }
}
    render() {
        return (
            <SafeAreaView>
                
                <ImageBackground source={require('./images/blur4.jpg')} style={{ width: "100%", height: "100%" }}>
                    
                        <View style={styles.header}>
                           
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.push('Home')
                                }
                                }>
                            <Image source={require('./images/back.png')} style={styles.Hbutton} />
                           
                        </TouchableOpacity>
                        <Text style={{
                            color: "white",
                            fontSize: 28,
                            margin:10,
                        }}>Settings</Text>
                            
                        </View>    
                   
                    <View style={styles.sContainer}>
                    <View style={styles.container}>
                        <TouchableOpacity onPress={this.send}>
                            <Text style={styles.text}>Help</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                        <TouchableOpacity onPress={this.rate}>
                            <Text style={styles.text}>Rate Us</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.container}>
                        <Text style={styles.text}>Version</Text><Text style={{ color: "white" }}>   1.1.0</Text>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.text}>Privacy Policy</Text>
                    </View>
                    <View style={styles.container}>
                        <TouchableOpacity onPress={this.logout}>
                            <Text style={styles.text}>Logout</Text>
                        </TouchableOpacity>
                        
                        </View>
                        
                    </View>
                </ImageBackground>
            </SafeAreaView>
        );
    }
    
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#02133d",
        opacity:0.9,
        width: "100%",

        padding: 20,

        color: "white",



    },
    header: {

        flexDirection: 'row',
        marginTop:20,
        alignContent: "flex-start",
        height: '10%',

    },
    text: {
        color: "white",
        fontSize:18,
    },

    Hbutton: {
        width: 45,
        alignContent: "center",
        margin:10,
        justifyContent: "center",
        alignSelf: "center",
        
        height: 45,
    },
    sContainer: {
        alignItems: "flex-start",
        margin:15,

        height:'100%',
        width: '100%',
        alignContent: "center",
        alignSelf: "center",
    
        color: "white",
    }

})