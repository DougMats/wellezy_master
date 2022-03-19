import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, ImageBackground, ActivityIndicator } from 'react-native';
import Toast from 'react-native-simple-toast';
import ChangeLanguage from '../../Language/ChangeLanguage.js';
import { Icon } from 'react-native-eva-icons';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage'
import UserContext from '../../contexts/UserContext'
import {session } from '../services/connection.js'
import { useTranslation } from 'react-i18next';
import { color_primary, color_white, color_black_a, color_grey_light, color_grey_half } from '../styles/Colors.js'

function Index(props) {
  const { t, i18n } = useTranslation();
  const { navigation } = props
  const [language, setlanguage] = useState(false);
  const [notificationToken, setNotificationToken] = useState('')
  const { UserDetails, setUserDetails } = useContext(UserContext)
  const [editable, setEditable] = useState(false)
  const [Load, setLoad] = useState(false)
  const [BtnDisable, setBtnDisable] = useState(false)
  const [formInfo, setFormInfo] = useState({ email: '', password: ''})

  useEffect(() => {
    setTimeout(() => {
      setEditable(true)
    }, 100)
  }, [])

  useEffect(() => {
    async function getToken() {
      const fcmToken = await messaging().getToken();
      if (fcmToken) { setNotificationToken(fcmToken) }
      else { console.log('user doesnt have a device token yet') }
      console.log(fcmToken, "TOKEN")
    }
    getToken()
  }, [])

  function onChangeText(text, key) {
    setFormInfo({
      ...formInfo,
      [key]: text
    })
  }

  async function sendForm() {
    const data = {
      ...formInfo
    }

    data.fcmToken = notificationToken
    if (data.email === '' || data.password === '') {
      Toast.show("Introduce tus datos de acceso")
      return false;
    }
    setLoad(true)
    setBtnDisable(true)
    const res = await session.login(data)

    if(res === false){
      setLoad(false)
      setBtnDisable(false)
      console.log('***** ',error)
      Toast.show("Email or password was not correct")
    }
    else{ 
      console.log(res, "SAAS")
      _storeData(res)
      setLoad(false)
      setBtnDisable(false)
    }
  }

  

  const _storeData = async (data) => {
    try {
      console.log("here async")
      await AsyncStorage.setItem('@Passport', JSON.stringify(data));
      console.log("esto es lo que obtengo....");
      console.log(data);
      console.log('Authentication successfully')
      setUserDetails({ ...data })
      console.log("successfully")
      props.navigation.navigate("Home")
    }
    catch (error) { }
  }

  function goToScreen(screen) {
    navigation.navigate(screen)
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground source={require('../images/solo-fondo.png')} style={{ flex: 1, justifyContent: "center", resizeMode: "cover", width: "100%", height: "100%" }}>
        <View style={styles.cardLogin}>
          <View style={{ alignItems: "center", marginTop: 30 }}>
            <View style={{ width: "85%", flexDirection: "row" }}>
              <View style={{ ...styles.inputView, width: "100%" }} >
                <TextInput
                  style={{ ...styles.inputText }}
                  value={formInfo.email}
                  placeholder={t("email")}
                  placeholderTextColor={color_grey_half}
                  keyboardType={'email-address'}
                  editable={editable}
                  onChangeText={text => onChangeText(text, 'email')} />
                <View style={{ position: "absolute", right: 10 }}>
                  <Icon name='email' width={25} height={25} fill={color_grey_half} />
                </View>
              </View>
            </View>
            <View style={{ width: "85%", flexDirection: "row" }}>
              <View style={{ ...styles.inputView, width: "100%" }} >
                <TextInput
                  secureTextEntry
                  style={styles.inputText}
                  value={formInfo.password}
                  placeholder={t("password")}
                  placeholderTextColor={color_grey_half}
                  onChangeText={text => onChangeText(text, 'password')} />
                <View style={{ position: "absolute", right: 10 }}>
                  <Icon name='lock' width={25} height={25} fill={color_grey_half} />
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.BtnPrimary} onPress={() => sendForm()} disabled={BtnDisable}>
              {Load &&
                <ActivityIndicator size="small" color={color_white} />
              }
              {!Load &&
                <Text style={styles.loginText}>{t("access")}</Text>
              }
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goToScreen('RecoveryAccount')}>
              <Text style={styles.forgot}>{t("ForgotYourPassword")}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goToScreen('Register')} style={{
              paddingTop: 10,
              marginBottom: 10
            }}>
              <Text style={styles.forgot}>{t("createANewAccount")}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setlanguage(true)} style={{ position: "absolute", bottom: 10, right: 10 }}>
              <Icon name='settings-outline' width={25} height={25} fill={color_grey_light} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      {
        language &&
        <View style={{ backgroundColor: color_black_a, position: "absolute", width: "100%", height: "100%", justifyContent:"center" }}>
           <TouchableOpacity onPress={() => setlanguage(false)} style={{ position: "absolute", top:40, right:20 }}>
            <Icon name='close' width={30} height={30} fill={color_white} />
          </TouchableOpacity>
          <ChangeLanguage />
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color_white,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  inputView: {
    width: "85%",
    borderColor: color_grey_half,
    borderWidth: 1,
    color: color_grey_light,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    paddingLeft: 5,
    borderRadius: 10,
  },
  inputText: {
    height: 50,
    color: color_grey_light,
  },
  forgot: {
    color: color_primary,
    fontSize: 15,
    marginBottom: 10
  },
  loginText: {
    color: color_white
  },
  register: {
    marginTop: 20,
    color: color_white
  },
  icon: {
    width: 200,
    height: 100,
    resizeMode: "contain",
    marginBottom: 10
  },
  loginHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },
  btnSign: {
    backgroundColor: color_primary,
    padding: 15,
    width: "50%",
    borderTopEndRadius: 25,
    borderBottomRightRadius: 25,
    borderTopLeftRadius: 20,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7
  },
  btnLogin: {
    backgroundColor: color_white,
    padding: 10,
    width: "50%",
    borderTopEndRadius: 20
  },
  cardLogin: {
    width: "90%",
    backgroundColor: color_white,
    borderRadius: 20,
    alignSelf: "center",
    position: "absolute",
    top: "15%"
  },
  TittleRegister: {
    fontSize: 20,
    fontWeight: "bold"
  },
  BtnPrimary: {
    width: "80%",
    backgroundColor: color_primary,
    borderRadius: 7,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7
  },
})

export default Index;