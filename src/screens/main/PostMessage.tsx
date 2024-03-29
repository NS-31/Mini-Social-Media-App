import React, { useState } from "react";
import { ActivityIndicator, Alert, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { signOut, } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import Header from "../../component/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import handleAuthError from "../../theme/helper";

const PostMessage = ({ navigation }: any) => {

    const [message, setMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSignOut = async () => {
        // Logout current user
        signOut(auth).then(async () => {
            await AsyncStorage.clear();
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'AuthNavigatorStack' }],
                })
            );
        }).catch(error => console.log('Error logging out: ', error));
    };

    const onPostMessage = async () => {
        if (message !== "") {
            setIsLoading(true);
            let user: any = auth.currentUser;
            if (!user) {
                const userData: any = await AsyncStorage.getItem('userInfo:key');
                user = JSON.parse(userData);
            }
            // Post message with particular login user
            addDoc(collection(db, 'chats'), {
                _id: user?.uid,
                createdAt: new Date().getTime(),
                text: message,
                displayName: user?.displayName,
            }).then(() => {
                setIsLoading(false);
                setMessage('');
                Alert.alert("Message sent successfully!")
            }).catch(err => {
                setIsLoading(false);
                handleAuthError(err);
            });

        } else {
            Alert.alert("Please fill message")
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar />
            <Header title={'Post Message'} onLogout={() => onSignOut()} />
            <View style={styles.inputWrapper}>
                <TextInput
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Enter message"
                    style={{ height: 48 }}
                />
            </View>

            <TouchableOpacity onPress={onPostMessage} style={styles.sentBtnWrapper}>
                <View style={styles.sentTxtWrapper}>
                    {isLoading ? (
                        <ActivityIndicator color={'white'} size={"small"} />
                    ) : <Text style={styles.sentTxt}>Sent</Text>}
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default PostMessage;

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: 'white'
    },
    inputWrapper: {
        marginTop: 50, borderColor: 'gray', borderWidth: 1, marginHorizontal: 24, paddingHorizontal: 16
    },
    sentBtnWrapper: {
        marginTop: 32, marginHorizontal: 24
    },
    sentTxtWrapper: {
        width: '100%', height: 48, backgroundColor: 'gray', justifyContent: 'center'
    },
    sentTxt: {
        textAlign: 'center', color: 'white', fontSize: 18
    }
})