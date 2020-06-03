import React, { Component } from 'react';
import {
    StyleSheet,
   
} from 'react-native';
const styles = StyleSheet.create({
    button: {
        width: 45,
        height: 45,
        marginVertical:5,
    },
    chatContainer: {
        margin: 5,
        alignContent: "center"
    },
    chat: {
        alignItems: "center",
        color: 'white',
        marginTop: 5,
        padding: 10,
        paddingLeft: 10,
        paddingRight: 10,
        alignContent: "center",
        backgroundColor: "black",
        opacity:0.8,
        borderRadius: 20,
        borderTopLeftRadius: 0,
        width: "auto",
        height: "auto",
        fontSize: 15,
        alignSelf: "flex-start",
    },
    reply: {
        alignItems: "center",
        color: 'white',
        marginTop: 5,
        padding: 10,
        paddingLeft: 10,
        alignContent: "center",
        backgroundColor: "black",
        opacity:0.8,
        borderRadius: 20,
        borderTopRightRadius: 0,
        width: "auto",
        height: "auto",
        fontSize: 15,
        alignSelf: "flex-end",

    },
    textBox: {
  
        backfaceVisibility: "visible",
        paddingLeft: 20,
        marginVertical: 10,
        backgroundColor: "#002fa6",
        height: 45,
        borderRadius: 20,
        color: "white",
        fontSize: 16,
        width: '85%',
  
        left: 0
    },
    bottom: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        marginLeft: 5,
        marginRight: 10,
        alignContent: "center",
        alignItems: "center",

    },
    bottomImage: {
        width: '15%',
        height: 45,
        marginBottom:15,
        alignItems: "center",
       
        right: 0,
      
    },
    Header1: {
        color: 'blue'
    },
    headerText: {
        flex: 4,
        width: 5,
        left:0,
        height: 250,
        alignContent: "center",
        marginTop: 30,
        justifyContent: "center",
        
    },
    Hbutton: {
        width: 40,
        height:40,
        flex: 1,
        alignContent: "center",
        marginTop: 20,
        justifyContent: "center",
        
        height:'60%',
    },
    header: {
        flex: 6,
        flexDirection: 'row',
        alignContent: "center",
        alignItems: "center",
    },
    Text1: {
        backgroundColor: 'orange',
    },
    container: {

        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    action: {
        width: '100%',
        textAlign: 'center',
        color: 'white',
        paddingVertical: 8,
        marginVertical: 5,
        fontWeight: 'bold',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    stat: {
        textAlign: 'center',
        color: '#B0171F',
        marginBottom: 1,
        marginTop: 30,
    },
});
export default styles;