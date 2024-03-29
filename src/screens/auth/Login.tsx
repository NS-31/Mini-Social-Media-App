import React, { useState } from "react";
import { ActivityIndicator, Alert, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import Header from "../../component/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import handleAuthError from "../../theme/helper";

const Login = ({ navigation }: any) => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onHandleLogin = () => {
        if (email !== "" && password !== "") {
            setIsLoading(true);
            // Firebase sign in with email and password
            signInWithEmailAndPassword(auth, email, password)
                .then(async () => {
                    const user = auth.currentUser;
                    try {
                        await AsyncStorage.setItem(
                            'userInfo:key',
                            JSON.stringify(user),
                        );
                    } catch (error) {
                        // Error saving data
                    }
                    setIsLoading(false);
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'MainNavigatorStack' }],
                        })
                    );
                })
                .catch((err) => { setIsLoading(false); handleAuthError(err) });
        } else {
            Alert.alert("Please enter all details")
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar />
            <Header title={'Login'} onBack={() => navigation.goBack()} />
            <View style={styles.emailWrapper}>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter email"
                    style={{ height: 48 }}
                />
            </View>
            <View style={styles.pwdWrapper}>
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter password"
                    style={{ height: 48 }}
                    secureTextEntry
                />
            </View>
            <TouchableOpacity onPress={onHandleLogin} style={styles.loginWrapper}>
                <View style={styles.loginContainer}>
                    {isLoading ? (
                        <ActivityIndicator color={'white'} size={"small"} />
                    ) : <Text style={styles.loginTxt}>Login</Text>}
                </View>
            </TouchableOpacity>
            {/* Navigation to Signup Screen */}
            <View style={styles.registerWrapper}>
                <Text style={styles.accountTxt}>
                    Don't have an account?{" "}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                    <Text style={styles.registerTxt}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    emailWrapper: {
        marginTop: 50, borderColor: 'gray', borderWidth: 1, marginHorizontal: 24, paddingHorizontal: 16
    },
    pwdWrapper: {
        marginTop: 32, borderColor: 'gray', borderWidth: 1, marginHorizontal: 24, paddingHorizontal: 16
    },
    loginWrapper: {
        marginTop: 32, marginHorizontal: 24
    },
    loginContainer: {
        width: '100%', height: 48, backgroundColor: 'gray', justifyContent: 'center'
    },
    loginTxt: {
        textAlign: 'center', color: 'white', fontSize: 18
    },
    registerWrapper: {
        marginTop: 20, flexDirection: "row", alignItems: "center", alignSelf: "center",
    },
    accountTxt: {
        color: "gray", fontWeight: "600", fontSize: 14
    },
    registerTxt: {
        color: "#f57c00", fontWeight: "600", fontSize: 14
    }
})