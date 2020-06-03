// JavaScript source code
import React, { Component } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    ImageBackground,
    NativeModules,
    Linking,
    BackHandler,
    Alert,
} from 'react-native';
import Tts from 'react-native-tts';
import styles from './styles.js';
import Contacts from 'react-native-unified-contacts';
import Voice from 'react-native-voice';
var SendIntentAndroid = require("react-native-send-intent");
var RNSendIntentAndroid = NativeModules.SendIntentAndroid || {};




export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.loadContacts = this.loadContacts;
        Voice.onSpeechStart = this.onSpeechStart;
        Voice.onSpeechEnd = this.onSpeechEnd;
        Voice.onSpeechError = this.onSpeechError;
        Voice.onSpeechResults = this.onSpeechResults;
        Voice.onSpeechPartialResults = this.onSpeechPartialResults;
        Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
        global.pos = 2;
    }
    state = {
        end: '',
        started: '',
        results: [],
        partialResults: [],
        humanVoice: [['alice', 'Hii I\'m Alice'], ['alice', 'How can I help you?']],
        conts: true,
        text: "",
        type:false,
        humidity:"", temprature:"", weather_descriptions:"",
        isLOading: true,
        greeting: undefined,
    };
    static navigationOptions = {
        title: "Home",
        headerStyle: {
            backgroundColor: "#73C6B6"
        }
    }
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
    }
    componentWillUnmount() {
        Voice.destroy().then(Voice.removeAllListeners);
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

    loadContacts = (name1, t, k) => {
        try {
            Contacts.searchContacts(name1, (error, contacts) => {
                if (error || contacts==null) {
                    console.log("UJ");
                }
                else {
                    contacts.map((result) => {
                        console.log(result)
                        if (result.fullName.toLowerCase() === name1) {
                            console.log(name1)
                            var x = result.phoneNumbers;
                            var y = x[0].digits;
                            if (t === "call") {
                                RNSendIntentAndroid.sendPhoneCall(y, false);
                            }
                            else if (t === "whatsapp") {
                                Linking.openURL("whatsapp://send?phone=" + y + "&text=" + k);
                            }
                        }
                        else {alert("sorry can't find that contact")}
                    })
                }
            });
        } catch (e) { Alert.alert("Sorry!!", "It's Problem in fetching your contacts "), console.log(e) }
    }
   
    xyz = (text) => {
        let newResults = this.state.humanVoice;
        newResults[pos++] = ['human', text];
        this.setState({ humanVoice: newResults });
        this.audioProcess(text);
    }
    onSpeechResults = e => {
        this.setState({
            results: e.value,
        });
        this.xyz(this.state.results[0]);
    };

    audioProcess = e => {
        e = e.toLowerCase();
        let Process = e.split(" ");
        if (!isNaN(parseInt(Process[0], 10)) && !isNaN(parseInt(Process[2], 10))) {
            console.log(Process);
            var num3 = this.calculator(Process);
            this.answer(num3);
        }
        else if (Process[0] === "send" && Process[1] === "mail") {
            SendIntentAndroid.sendMail(Process[3], "", "");
        }
       
        else if (Process[0] === "open" && Process[1] === "camera") {
            RNSendIntentAndroid.openCamera();
        }
        else if (Process[0] === "whatsapp") {
            var n = e.indexOf("to")
       
            this.loadContacts(e.slice(n + 3), "whatsapp", e.slice(9,n-1));
        }

        else if (Process[0] === "where" && Process[1] === "is") {
                RNSendIntentAndroid.openMaps(Process[2]);
        }
        else if (Process[0] === "open" && Process[1]==="") {
            SendIntentAndroid.openApp("com.google.android.youtube").then(wasOpened => { });
        }
        else if (Process[0] === "open" && Process[1] === "") {
            SendIntentAndroid.openApp("com.google.android.youtube").then(wasOpened => { });
        }
        else if (Process[0] === "open" && Process[1] === "") {
            SendIntentAndroid.openApp("com.google.android.youtube").then(wasOpened => { });
        }
        else if (Process[0] === "open" && Process[1] === "") {
            SendIntentAndroid.openApp("com.google.android.youtube").then(wasOpened => { });
        }
        else if (Process[0] === "search") {
            SendIntentAndroid.openApp("com.google.android.youtube").then(wasOpened => { });


        }
        
        else if (Process[0] === "weather") {
                fetch('http://api.weatherstack.com/current?access_key=7c11e9657a9e163c6cc6dbb189695c98&query=' + e.slice(11))
                    .then((response) => response.json()).
                    then((responseJson) => {
                        let humidity = responseJson.current.humidity;
                        let temprature = responseJson.current.temperature;
                         let weather_descriptions = responseJson.current.weather_descriptions[0]
                        this.answer("Current Weather in " + e.slice(11) + " is " + weather_descriptions + " with " + temprature + " degree temprature & " + humidity + "% humidity.");
                }).catch((error) => {
                    console.error(error);
                });
        }
        else if (Process[0] === "call") {
           this.loadContacts(e.slice(5),"call");
            this.answer("calling " + e.slice(5));
        }
        else if (Process[0] === "what" && Process[1] === "can") {
            this.answer("Here's Something I can do for you?  \n   call [Contact] \n   calculation \n   [number1] (operator) [number2] \n   send mail to [mail id] \n   open camera \n   whatsapp [message] to [contact]  \n   where is [place] \n   serch \n   weather in [place] \n");
        }
        else {
            this.answer("sorry can't get it");
        }

    }
   
    

    answer = e => {
        Tts.setDefaultRate(0.5);
        Tts.speak(e);
        let newResults = this.state.humanVoice;
        newResults[pos++] = ['alice', e];
        this.setState({ humanVoice: newResults });
    }
    calculator = e => {
        try {
            var num1 = parseInt(e[0], 10);
            var num2 = parseInt(e[2], 10);
            var symbol = e[1];
            if (symbol === "+" || symbol === "plus" || symbol === "Plus") { let num3 = num1 + num2; return num3.toString(); }
            if (symbol === "-" || symbol === "Minus" || symbol === "minus") { let num3 = num1 - num2; return num3.toString(); }
            if (symbol === "x" || symbol === "into" || symbol === "Into") { let num3 = num1 * num2; return num3.toString(); }
            if (symbol === "/" || symbol === "by" || symbol === "By") { let num3 = num1 / num2; return num3.toString(); }
        } catch (error) {
            console.log(error);
        }
        }

    onSpeechPartialResults = e => {
        this.setState({
            partialResults: e.value,
        });
    };


    _startRecognizing = async () => {
        this.setState({
            started: '',
            results: [],
            partialResults: [],
            end: '',
        });
        try {
            await Voice.start('en-US');
        } catch (e) {
            console.error(e);
        }
    };

    _stopRecognizing = async () => {
        try {
            await Voice.stop();
        } catch (e) {
            console.error(e);
        }
    };
  
    
        render() {
            if (this.state.isLoading) {
                return (
                    <View style={{ flex: 1, padding: 20 }}>
                        <ActivityIndicator />
                    </View>
                )
            }
            return (
 
                <SafeAreaView style={{ flex: 10 }}>
                   
                    <ImageBackground source={require('./images/blur3.jpg')} style={{ width: '100%', height: '100%' }}>
                       
                        <View style={{ flex: 1.5 }}>
                            
                            <View style={styles.header}>
                                <Image source={require('./images/iconHome.png')} style={styles.headerText} />
                                <View style={{ flex: 5 }}></View>
                                <TouchableOpacity 
                                    onPress={() => {
                                        this.props.navigation.push('Settings')
                                    }
                                    }>
                                    <Image source={require('./images/setting.png')} style={styles.Hbutton} />
                                </TouchableOpacity>
                            </View>
                            
                            </View>
                        
                        <View style={{ flex: 8 }}>
                            <ScrollView ref={ref => this.scrollView = ref}
                                onContentSizeChange={(contentWidth, contentHeight) => {
                                    this.scrollView.scrollToEnd({ animated: true });
                                }} style={styles.chatContainer}>
                                {this.state.humanVoice.map((result, index) => {
                                   
                                    return (
                                        <Text key={`result-${index}`} style={(result[0] === 'alice') ? styles.chat : styles.reply}  >  {result[1]}  </Text>
                                    );
                                })}
                            </ScrollView>

                        </View>

                        <View style={styles.bottom} >


                            <TextInput
                                style={styles.textBox}
                                placeholder="Type here.....!"
                                onChangeText={(text) => this.setState({ text: text })}
                                value={this.state.text}
                                onBlur={() => this.setState({ text: "", type: false })}
                                onSubmitEditing={() => { this.xyz(this.state.text)}}
                        />

                            
                            <TouchableOpacity
                                onPressIn={this._startRecognizing}
                                onPressOut={this._stopRecognizing}
                                style={
                                    styles.bottomImage
                                }>
                                
                                <Image
                                    style={
                                        styles.button
                                    }
                                    source={this.state.type ? require('./images/mike.png') : require('./images/mike1.png')}
                                />
                            </TouchableOpacity>

                        </View>

                    </ImageBackground>
                </SafeAreaView>
            );
        }
    }


   

