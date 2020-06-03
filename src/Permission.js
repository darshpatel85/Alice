import React, { Component } from 'react';
import { SafeAreaView, View, PermissionsAndroid, Image, Text, ImageBackground, Button, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles'
export default class Permission extends React.Component {
    constructor(props) {
        super(props)
        alert("Before get started we required some permission") 
    }
    state = {
        done: false,
        call: false,
        read: false,
        audio: false,

    }
    micro = async() => {
      const grant = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
                title: "Talk with me",
                message:
                    "Talking with me required Audio permission",
                buttonPositive: "Let's Talk",
            }
        );
        if (grant === PermissionsAndroid.RESULTS.GRANTED) {
            this.setState({
                audio:true,
            })
        }
    }
    contact = async() => {
    const grant = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
                title: "In touch with your contacts",
                message:
                    "require reading contacts permission",
                buttonPositive: "Read it"
            }
        );
        if (grant === PermissionsAndroid.RESULTS.GRANTED) {
            this.setState({
                read: true,
            })
        }
    }
    phone = async() => {
    const grant = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CALL_PHONE,
            {
                title: "call whom you love",
                message:
                    "give calling permission so I can call",
                buttonPositive: "ok"
            }
        );
        if (grant === PermissionsAndroid.RESULTS.GRANTED) {
            this.setState({
                call: true,
            })
        }
    }
    render() {
        return (
           
                    <SafeAreaView style={{ flex: 5, backgroundColor: "pink" }}>
                        <ImageBackground source={require('./images/blur1.jpg')} style={{ width: '100%', height: '100%' }}>
                        <View style={{ flex: 1, color: "white", alignItems: "center", alignSelf: "center", width: 250 }}>
                            <Text style={{ color: "white", textAlign: "center", fontSize: 30, backgroundColor: "black", borderRadius: 55, marginVertical: "30%", padding:10 }}>   Permissions   </Text>
                        </View>                        
                        
                    {(this.state.done) ? (
                        <View style={style1.sContainer}>

                            <TouchableOpacity onPress={() => { this.props.navigation.push("AppDrawer", {screen:"Home"}) }}><Text style={{ color: "white" }}>If you are new to me Just ask what can I do? </Text><View style={style1.container}><Text Style={{ color: "white" }}>Done ></Text></View></TouchableOpacity>
                            </View>
                        ) :
                        (
                            <View style={style1.sContainer}>
                                <TouchableOpacity onPress={() => { this.micro("") }}><View style={style1.container}><Text Style={style1.text1}>Microphone</Text></View></TouchableOpacity>
                                <TouchableOpacity onPress={() => { this.contact("") }}><View style={style1.container}><Text Style={style1.text1}>Read Contacts</Text></View></TouchableOpacity>
                                <TouchableOpacity onPress={() => { this.phone("") }}><View style={style1.container}><Text Style={style1.text1}>Call</Text></View></TouchableOpacity>
                                </View>
                                )}
                        


                    <View style={{ flex: 1 }}>
                        {(this.state.audio === true && this.state.call == true && this.state.read == true && this.state.done != true) ?
                                    (<TouchableOpacity onPress={() => { this.setState({ done: true }) }}><Text style={{ color: "white", textAlign: "center", fontSize:25 }}>Next ></Text></TouchableOpacity>) : <></>
                    }
                            </View>
                        </ImageBackground>
            </SafeAreaView>
        )
            
    }
}
const style1 = StyleSheet.create({
    container:{
        backgroundColor: "#24daff",
        width: 250,
        color:"white",
        alignContent:"center",
        height: 60,
        padding: 20,
        alignItems: "center",
        borderRadius: 20,
        margin: 10,
        
    },
    sContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 30,
        flex: 1,
        width: 350,
        alignContent: "center",
        alignSelf: "center",
        borderRadius: 30,
        height:450,
        backgroundColor: "black",
        opacity: 0.9,
        color:"white",
    },
    text1: {
        textAlign: "center",
        textAlignVertical: "center",
        color:"white",
    }
});