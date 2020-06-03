// JavaScript source code
import React, { Component } from 'react';
import { View, Text, StatusBar, SafeAreaView, Image, useState, ActivityIndicator, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import Login from './Login';
import Register from './Register';
import Home from './Home';

import Setting from './Setting';
import Permission from './Permission';
const AppDrawer = createStackNavigator();
const AppDrawerScreen = () => (
    <AppDrawer.Navigator>
        <AppDrawer.Screen name="Home" component={Home} options={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }} />
        <AppDrawer.Screen name="Settings" component={Setting} options={{
            headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, 
        }} />
        <AppDrawer.Screen name="AuthStack" component={AuthStackScreen} options={{ headerShown: false }} />
    </AppDrawer.Navigator>
);

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
    <AuthStack.Navigator>
        
        <AuthStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <AuthStack.Screen name="Permission" component={Permission} options={{ headerShown: false }} />
        <AuthStack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <AuthStack.Screen name="AppDrawer" component={AppDrawerScreen} options={{ headerShown: false }} />

    </AuthStack.Navigator>
)
var isLoggedIn = null;
export default class navigator extends React.Component {
    state = {
        isLoading: true,
        screen:false
    }
    
    constructor(props) {
        super(props);
        
        this.retrieveData("");
    }

    retrieveData = async (x) => {
        try {


            isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
            this.setState({
                isLoading:false
            })
            
            
        } catch (error) { }
    }
    start = (x) => {
       
    }
    
    render() {
        if (this.state.isLoading) {
            return (
                <SafeAreaView>
                    <Image source={require('./images/wallpaper3.jpg')} style={{ width: '100%', height: '100%' }}/>
                        
                        
                    </SafeAreaView>
            )
        }
        return (
            <NavigationContainer>
                { isLoggedIn !== null ? (<AppDrawerScreen />) : (<AuthStackScreen />)}
            </NavigationContainer>
        );
    }
}
