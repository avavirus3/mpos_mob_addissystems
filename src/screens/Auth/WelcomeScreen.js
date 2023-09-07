import {
  ImageBackground,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,Pressable,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import notifee from '@notifee/react-native';
// import logo from "../assets/image.png"
// import bg from "../assets/welcomebg.png"
// import fbg from "../assets/SplashScreen.png"
import {theme} from '../../styles/stylesheet';
import {LinearTextGradient} from 'react-native-text-gradient';
import {scale, verticalScale} from 'react-native-size-matters';
import { getToken } from '../../auth/token/Token';
import { fonts } from '../../styles/unistyle';
import NotificationSounds,{ playSampleSound } from 'react-native-notification-sounds';


const WelcomeScreen = ({navigation}) => {
  const [timeLeft, setTimeLeft] = useState(2);
  const intialBg = require('../../assets/images/welcomebg.png');
  const finalBg = require('../../assets/images/loginbg.png');


  const onDisplayNotification= async()=> {
    // Request permissions (required for iOS)
    //await notifee.requestPermission()

    // Create a channel (required for Android)
    let soundsList
 await NotificationSounds.getNotifications('notification').then(res=>{soundsList=res[0]}).catch(e=>console.log(e))
      // if you want to stop any playing sound just call:
      // stopSampleSound();}catch(e){console.log(e)}
    // try{const soundsList = await NotificationSounds.getNotifications('notification');}catch(e){console.log(e)}
   const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      sound: soundsList.url,
     
     
    });
    
    // Display a notification
    await notifee.displayNotification({
      title: 'Welcome to AddisSystem',
      body: 'you can sign in or sign up',
      android: {
        channelId,
        //smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
    await notifee.onBackgroundEvent(()=>(console.log("wait")));
   }
 

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(0);
    }, 2000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);
  useEffect(()=>{if(!timeLeft)onDisplayNotification()},[timeLeft])

  //console.log(timeLeft)
  return (
    <ImageBackground
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}
      source={timeLeft ? intialBg : finalBg}>
        <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0.0)" barStyle="light-content" />

        <View style={[{alignItems:'center',},timeLeft?{marginTop:verticalScale(-154)}:{}]}>
      <Image
        source={require('../../assets/images/logowithname.png')}
        resizeMode="contain"
        style={{height: 200, width: 210}}
      />
      <LinearTextGradient
        style={{fontWeight: '600', fontSize: 24}}
        locations={[0, 1]}
        colors={[theme.color.blue, theme.color.primary]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Text>M-POS</Text>
      </LinearTextGradient></View>
      {timeLeft?<View style={{alignItems: 'center', position: 'absolute', bottom: 20}}>
        <Text style={{color: 'white', fontWeight: '600'}}>
          Copyright @ 2023 addissystems
        </Text>
        <Text style={{color: 'white', fontWeight: '600'}}>Version 1.0.0</Text>
      </View>:<View style={{alignItems: 'center',width:'100%',paddingHorizontal:scale(25) }}>
      <Pressable
      onPress={()=>navigation.navigate("LogIn")}
              style={{
                width:'100%',
                borderRadius: 10,
                backgroundColor: theme.color.primary,
                paddingVertical: 18,
                alignItems: "center",
                justifyContent: "center",
                marginVertical: verticalScale(20),
                elevation:5
              }}
            >
              <Text style={[{ color: "white" },fonts.h1]}>
                Sign In
              </Text>
            </Pressable>
            <Pressable
            onPress={()=>navigation.navigate("SignUp")}
              style={{
                width:'100%',
                borderRadius: 10,
                backgroundColor: theme.color.white,
                paddingVertical: 18,
                alignItems: "center",
                justifyContent: "center",
                marginVertical: verticalScale(0),
                borderWidth:1,
                borderColor:theme.color.primary
              }}
            >
              <Text style={[{ color: theme.color.primary },fonts.h1]}>
                Sign Up
              </Text>
            </Pressable>
        
        </View>}
    </ImageBackground>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  primary: {
    backgroundColor: '#2491CB',
  },
});
