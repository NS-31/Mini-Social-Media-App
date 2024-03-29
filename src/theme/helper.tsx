import { Alert } from "react-native";

const handleAuthError = (error: any) => {
    // Check the error code to determine the type of error that occurred.
    const errorCode = error.code;

    // Show a user-friendly error message to the user.
    switch (errorCode) {
        case "auth/invalid-email":
            Alert.alert("The email address you entered is invalid.");
            break;
        case "auth/wrong-password":
            Alert.alert("The password you entered is incorrect.");
            break;
        case "auth/invalid-credential":
            Alert.alert("The credential you entered is invalid.");
            break;
        case "auth/email-already-in-use":
            Alert.alert("The email address you entered is already in use.");
            break;
        default:
            Alert.alert(error?.message);
            break;
    }
};

export default handleAuthError;
