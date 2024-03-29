import 'dotenv/config';

export default {
    "expo": {
      name: "SocialApp",
      android: {
        "package": "com.socialapp",
        "versionCode": 1
      },
      extra: {
        apiKey: "ENTER_YOUR_API_KEY",
        authDomain: "ENTER_YOUR_DOMAIN",
        projectId: "ENTER_YOUR_PROJECT_ID",
        storageBucket: "ENTER_YOUR_STORAGE_BUCKET",
        messagingSenderId: "ENTER_YOUR_SENDER_ID",
        appId: "ENTER_YOUR_APP_ID",
        eas: {
          projectId: "ENTER_YOUR_PROJECT_ID"
        }
      }
    }
  }