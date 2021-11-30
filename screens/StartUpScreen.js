import React, { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
// import { AsyncStorage } from '@react-native-async-storage/async-storage'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from 'react-redux'
import { authenticate } from '../store/actions/auth';

export default function StartUpScreen(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if(!userData){
                props.navigation.navigate('Auth');
                return;
            }
            const transformedData = JSON.parse(userData);
            const {token, userId, expiry } = transformedData;
            console.log(expiry);
            const expirationDate = new Date(expiry);
            console.log(expirationDate);
            if(expirationDate <= new Date() || !token || !userId){
                props.navigation.navigate("Auth");
                return;
            }

            const expirationTime = expirationDate.getTime() - new Date().getTime();
            
            props.navigation.navigate("Shop");
            dispatch(authenticate(userId, token, expirationTime));
        };
        tryLogin();
    }, [dispatch])

    return (
        <View style={{flex: 1, justifyContent: "center" , alignItems: 'center'}}>
            <ActivityIndicator size="large" color="blue" />
        </View>
    )
}

const styles = StyleSheet.create({})
