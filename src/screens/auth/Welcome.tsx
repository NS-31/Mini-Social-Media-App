import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { images } from "../../theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";

const Welcome = ({ navigation }: any) => {

    const [enableView, setEnableView] = useState<boolean>(false);

    useEffect(() => {
        getExisingUser();
    }, [])

    const getExisingUser = async () => {
        try {
            // Store already logged in user info on local database
            const userData = await AsyncStorage.getItem('userInfo:key');
            setEnableView(false);
            if (userData !== null) {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'MainNavigatorStack' }],
                    })
                );
            } else {
                setEnableView(true);
            }
        } catch (error) {
            setEnableView(true);
            // Error retrieving data
        }
    }

    const navigateToLogin = () => {
        navigation.navigate("Login")
    };

    const navigateToRegister = () => {
        navigation.navigate("Register");
    }

    return (
        enableView && (
            <View style={styles.container}>
                <View style={styles.iconWrapper}>
                    <Image style={styles.wlcmIcon} source={images.welcome_icon} resizeMode="contain" />
                </View>
                <View style={styles.btnWrapper}>
                    <TouchableOpacity onPress={navigateToLogin}>
                        <View style={styles.loginContainer}>
                            <Text style={styles.loginTxt}>Login</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={navigateToRegister}>
                        <View style={styles.registerWrapper}>
                            <Text style={styles.registerTxt}>Register</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    );
}

export default Welcome;

const styles = StyleSheet.create({
    container: {
        width: '100%', height: '100%'
    },
    iconWrapper: {
        flex: 0.6, justifyContent: 'center', alignItems: 'center'
    },
    wlcmIcon: {
        width: '70%', height: '70%'
    },
    btnWrapper: {
        flex: 0.4, justifyContent: 'center'
    },
    loginContainer: {
        width: '90%', height: 48, backgroundColor: 'gray', marginLeft: '5%', justifyContent: 'center'
    },
    loginTxt: {
        textAlign: 'center', color: 'white', fontSize: 18 
    },
    registerWrapper: {
        width: '90%', height: 48, borderColor: 'gray', borderWidth: 2, marginLeft: '5%', justifyContent: 'center', marginTop: 16
    },
    registerTxt: {
        textAlign: 'center', color: 'gray', fontSize: 18
    }
})