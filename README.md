# Mini Social Media App

Mini social medial app using firebase real time database.

## Installation

Install required things in your system to run react native expo project. 

Please check below link for the same. 

[Installation Guide Line](https://reactnative.dev/docs/environment-setup)

## Configure Project in Firebase 

Please check below guideline to create project in Firebase. 

[Create Firebase Project Guideline](https://support.google.com/appsheet/answer/10104995?hl=en)

[Get Required Things from Firebase Console](https://firebase.google.com/docs/projects/learn-more#:~:text=of%20these%20options%3A-,Using%20the%20Firebase%20console%3A%20Click%20settings%20Project%20settings.,projects%20associated%20with%20your%20account)

Open Config.js file from project and add your details. 


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


Open file firebase.ts (Mini-Social-Media-App/src/config/firebase.ts)


const firebaseConfig = {
  apiKey: "ENTER_YOUR_API_KEY",
  authDomain: "ENTER_YOUR_DOMAIN",
  projectId: "ENTER_YOUR_PROJECT_ID",
  storageBucket: "ENTER_YOUR_STORAGE_BUCKET",
  messagingSenderId: "ENTER_YOUR_SENDER_ID",
  appId: "ENTER_YOUR_APP_ID",
  measurementId: "ENTER_YOUR_MEASUREMENT_ID"
};


## How to run project

Follow below commands to run project.
 
Step 1 - Open teminal and navigate source code folder like cd PROJECT_FOLDER_NAME

Step 2 -  yarn install 

Step 3 -  npx expo start

Step 4 - Download Expo Go app and Scan QR Code, QR code you will get from step 3.


## Demo Video 

[Video](https://www.loom.com/share/44fafc1956e84cbfb3ac26c211f683d4?sid=5ec018b9-4bb8-4e0c-b38c-9cedb8341f6f)