# Mini Social Media App

Mini social medial app using firebase real time database.

## Installation

Install required things in your system to run react native expo project. 

Please check below link for the same. 

Installation Guide Line

## Configure Project in Firebase 

Please check below guideline to create project in Firebase. 

Create Firebase Project Guideline

Get Required Things from Firebase Console

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

Video