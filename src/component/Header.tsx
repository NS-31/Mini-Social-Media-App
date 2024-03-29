import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { images } from "../theme";
import { HeaderProps } from "./Props";

const Header = ({ title, onBack, onLogout }: HeaderProps) => {
    return (
        <View style={styles.container}>
            {typeof onBack === 'function' ? (
                <TouchableOpacity onPress={() => onBack()}>
                    <Image source={images.back_icon} style={styles.leftImg} resizeMode="contain" />
                </TouchableOpacity>
            ) : <View style={{ width: 24 }} />}
            <Text style={styles.titleTxt}>{title}</Text>
            {typeof onLogout === 'function' ? (
                <TouchableOpacity onPress={() => onLogout()}>
                    <Image source={images.logout_icon} style={styles.leftImg} resizeMode="contain" />
                </TouchableOpacity>
            ) : <View style={{ width: 24 }} />}
        </View>
    )
};

export default Header;

const styles = StyleSheet.create({
    container: {
        width: '100%', height: 54, marginTop: 24, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 24, justifyContent: 'space-between'
    },
    leftImg: {
        width: 24, height: 24, tintColor: 'gray', padding: 10
    },
    titleTxt: {
        textAlign: 'center', fontSize: 18
    }
})