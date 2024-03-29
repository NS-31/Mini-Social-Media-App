import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Dimensions, FlatList, Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { images } from "../../theme";
import { signOut } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import moment from "moment";
import Header from "../../component/Header";
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "react-native-modal";
import handleAuthError from "../../theme/helper";

const { width } = Dimensions.get('screen');

const Feed = ({ navigation }: any) => {

    const [allMessages, setAllMessages] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false);
    const [editDetails, setEditDetails] = useState({});
    const [editedMessage, setEditedMessage] = useState('');
    const [visiblePopUp, setVisiblePopUp] = useState(false);
    const [currentUserData, setCurrentUserData] = useState<any>({});

    useEffect(() => {
        setIsLoading(true);
        // Get all the messages from user
        const collectionRef = collection(db, 'chats');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, querySnapshot => {
            const updatedData: any = querySnapshot.docs.map(doc => {
                return {
                    userId: doc?.data()?._id,
                    createdAt: doc?.data()?.createdAt,
                    text: doc?.data()?.text,
                    displayName: doc?.data()?.displayName,
                    msgId: doc?.id,
                }
            });
            setAllMessages(updatedData);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        getCurrentUser();
    }, []);

    const getCurrentUser = async () => {
        let user: any = auth.currentUser;
        if (!user) {
            const userData: any = await AsyncStorage.getItem('userInfo:key');
            user = JSON.parse(userData);
        }
        console.log("setCurrentUserData ===", user)
        setCurrentUserData(user);
    }

    const onSignOut = async () => {
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

    const deleteMessage = async (msgId: string) => {
        Alert.alert('', 'Are you sure you want to delete this message?', [
            {
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'YES', onPress: async () => {
                    try {
                        await deleteDoc(doc(db, "chats", msgId));
                        console.log('Message deleted successfully');
                    } catch (error) {
                        console.error('Error deleting message:', error);
                    }
                }
            },
        ]);
    }

    const visibleEditPopUp = (message: any) => {
        setVisiblePopUp(true);
        setEditDetails(message);
        setEditedMessage(message.text);
    }

    const updateMessageInfo = async (message: any) => {
        if (editedMessage !== "") {
            setIsUpdateLoading(true);
            // Get collection of chats
            const q = query(collection(db, "chats"));
            const querySnapshot = await getDocs(q);
            let docID = '';
            querySnapshot.docs.forEach((doc) => {
                if (doc.id === message?.msgId) {
                    docID = doc.id;
                }
            });
            const user = doc(db, "chats", docID);

            // Update message of filtered user
            updateDoc(user, {
                text: editedMessage,
            }).then(() => {
                setIsUpdateLoading(false);
                setVisiblePopUp(false);
                setEditDetails({});
            }).catch(err => { handleAuthError(err); setIsUpdateLoading(false); });
        } else {
            Alert.alert("Please fill message details")
        }
    }

    const renderFeed = ({ item }: any) => {
        const fromNowTime = moment.utc(item?.createdAt).startOf('seconds').fromNow();
        const loggedIn = item?.userId == currentUserData?.uid;
        return (
            <View>
                <View style={styles.itemContainer}>
                    <Image source={null} style={styles.placeHolderImg}></Image>
                    <View style={[styles.nameWrapper, { width: loggedIn ? (width - 144) : width - 92 }]}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt}>{item.displayName}</Text>
                        </View>
                        <Text style={styles.msgTxt}>{item.text}</Text>
                        <Text style={styles.timeTxt}>{fromNowTime}</Text>
                    </View>
                    {item?.userId == currentUserData?.uid && (
                        <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => visibleEditPopUp(item)}>
                            <Image source={images.edit_icon} style={styles.editIcon} resizeMode="contain" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deleteMessage(item?.msgId)}>
                            <Image source={images.delete_icon} style={[styles.editIcon, { marginLeft: 10 }]} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                    )}
                </View>
                <View style={styles.divider}></View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar />
            <Header title={'Feed'} onLogout={() => onSignOut()} />
            {isLoading ? (
                <View style={styles.loadingWrapper}>
                    <ActivityIndicator color={'gray'} size={"large"} />
                </View>
            ) : (
                <FlatList
                    data={allMessages}
                    renderItem={renderFeed}
                    keyExtractor={item => item?.msgId}
                />
            )}
            <Modal isVisible={visiblePopUp} onBackdropPress={() => setVisiblePopUp(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalWrapper}>
                        <Text style={styles.updateMessageTxt}>Update Message</Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                value={editedMessage}
                                onChangeText={setEditedMessage}
                                placeholder="Enter message"
                                style={{ height: 48 }}
                            />
                        </View>
                        <TouchableOpacity onPress={() => updateMessageInfo(editDetails)} style={styles.updateBtnWrapper}>
                            <View style={styles.updateBtnContainer}>
                                {isUpdateLoading ? (
                                    <ActivityIndicator color={'white'} size={"small"} />
                                ) : <Text style={styles.updateTxt}>Update</Text>}
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default Feed;

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: 'white'
    },
    loadingWrapper: {
        width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'
    },
    modalContainer: {
        flex: 1, alignItems: 'center', justifyContent: 'center'
    },
    modalWrapper: {
        backgroundColor: 'white', padding: 16, width: '100%', alignItems: 'center'
    },
    updateMessageTxt: {
        fontSize: 15, fontWeight: 'bold'
    },
    inputWrapper: {
        width: '100%', marginTop: 32, borderColor: 'gray', borderWidth: 1, marginHorizontal: 16, paddingHorizontal: 16
    },
    updateBtnWrapper: {
        width: '100%', marginTop: 32, marginHorizontal: 24
    },
    updateBtnContainer: {
        width: '100%', height: 48, backgroundColor: 'gray', justifyContent: 'center'
    },
    updateTxt: {
        textAlign: 'center', color: 'white', fontSize: 18
    },
    itemContainer: {
        flexDirection: 'row', padding: 24, justifyContent: 'space-between', alignItems: 'center'
    },
    placeHolderImg: {
        height: 36, width: 36, backgroundColor: 'gray', borderRadius: 18
    },
    nameWrapper: {
        paddingHorizontal: 16
    },
    nameContainer: {
        flexDirection: 'row', alignItems: 'center'
    },
    nameTxt: {
        color: 'black', fontSize: 13
    },
    msgTxt: {
        paddingTop: 8, color: 'gray', fontSize: 15
    },
    timeTxt: {
        color: 'gray', fontSize: 11, paddingTop: 8
    },
    editIcon: {
        width: 20, height: 20
    },
    divider: {
        width: '90%', height: 0.5, backgroundColor: 'gray', marginLeft: '5%'
    }
})