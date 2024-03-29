import React, { useState } from "react";
import { ActivityIndicator, Alert, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import Header from "../../component/Header";
import { CommonActions } from "@react-navigation/native";
import handleAuthError from "../../theme/helper";

const Register = ({ navigation }: any) => {

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rePassword, setRePassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onHandleRegister = async () => {
        if (email !== "" && name !== "" && password !== "" && rePassword !== "" && (password === rePassword)) {
            try {
                setIsLoading(true);
                // Create a new user
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                const userRef = doc(db, "users", user.uid);
                // Add additional data on created user
                await setDoc(userRef, {
                    displayName: name,
                    email: password,
                    uid: user.uid,
                    photoURL: "",
                    phoneNumber: "",
                });

                // Update name and photo current added as static link
                await updateProfile(user, {
                    displayName: name, photoURL: "https://www.kasandbox.org/programming-images/avatars/leaf-blue.png"
                }).then(() => {
                    // Profile updated!
                }).catch((error) => {
                    // An error occurred
                });

                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'MainNavigatorStack' }],
                    })
                );
                setIsLoading(false);
            } catch (error: any) {
                setIsLoading(false);
                handleAuthError(error)
            }
        } else if (password !== rePassword) {
            Alert.alert("Password doesn't match")
        } else {
            Alert.alert("Please enter all details")
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar />
            <Header title={'Register'} onBack={() => navigation.goBack()} />
            <View style={styles.nameWrapper}>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter name"
                    style={{ height: 48 }}
                    keyboardType="default"
                />
            </View>

            <View style={styles.emailWrapper}>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter email"
                    style={{ height: 48 }}
                    keyboardType="email-address"
                />
            </View>

            <View style={styles.emailWrapper}>
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter password"
                    style={{ height: 48 }}
                    secureTextEntry
                />
            </View>

            <View style={styles.emailWrapper}>
                <TextInput
                    value={rePassword}
                    onChangeText={setRePassword}
                    placeholder="Re-Enter password"
                    style={{ height: 48 }}
                    secureTextEntry
                />
            </View>

            <TouchableOpacity onPress={onHandleRegister} style={styles.loginWrapper}>
                <View style={styles.loginContainer}>
                    {isLoading ? (
                        <ActivityIndicator color={'white'} size={"small"} />
                    ) : <Text style={styles.loginTxt}>Register</Text>}
                </View>
            </TouchableOpacity>
            {/* Navigation to Signup Screen */}
            <View style={styles.registerWrapper}>
                <Text style={styles.accountTxt}>
                    Already have an account?{" "}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.registerTxt}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    nameWrapper: {
        marginTop: 50, borderColor: 'gray', borderWidth: 1, marginHorizontal: 24, paddingHorizontal: 16
    },
    emailWrapper: {
        marginTop: 16, borderColor: 'gray', borderWidth: 1, marginHorizontal: 24, paddingHorizontal: 16
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