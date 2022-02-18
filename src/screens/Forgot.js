import React, { useState } from 'react';
import { Dimensions, StatusBar, Image, StyleSheet, TextInput, TouchableOpacity, ImageBackground, View, Text, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import {
  color_primary,
  color_secondary,
  color_tertiary,
  color_white,
  color_white_a,
  color_black,
  color_black_a,
  color_grey_light,
  color_grey_half,
  color_grey_dark
} from '../styles/Colors';
import BTN from '../components/generic/BTN';
//import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';
import ChangeLanguage from '../../Language/ChangeLanguage.js';
import { useTranslation } from 'react-i18next';

export default function Forgot(props) {
  const { navigation } = props
  const { t, i18n } = useTranslation();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [Load, setLoad] = React.useState(false)
  const [language, setlanguage] = useState(false);
  const [formInfo, setFormInfo] = useState({ email: '' })

  function onChangeText(text, key) {
    setFormInfo({
      ...formInfo,
      [key]: text
    })
  }


  function goToScreen(screen) {
    navigation.navigate(screen)
  }



  function sendForm() { 
  //     const data = {
  //       ...formInfo
  //     }
  //     if(data.emal === ""){
  //       Toast.show('Debe ingresar su email.');
  //     }
  //     else{
  //       let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  //       if (reg.test(data.emal) === false) {
  //         Toast.show('formato de Email no válido.');
  //       } else {
  //         console.log("email correcto");
  //       }
  //     }
  //     // data.fcmToken = notificationToken
  //     // if (data.email === '' || data.password === '') {
  //     //   Toast.show("Introduce tus datos de acceso")
  //     //   return false;
  //     // }
  //     // setLoad(true)
  //     // setBtnDisable(true)
  //     // console.log(base_url(serverCrm, `wellezy/authMed`))
  //     // axios.post(base_url(serverCrm, `wellezy/authMed`), data).then(function (response) {
  //     //   console.log(response.data, "SAAS")
  //     //   _storeData(response.data)
  //     //   setLoad(false)
  //     //   setBtnDisable(false)
  //     // })
  //     //   .catch(function (error) {
  //     //setLoad(!Load)
  //     //     setBtnDisable(false)
  //     //     console.log(error, 'Error al enviar formulario')
  //     //     Toast.show("Email or password was not correct")
  //     //   })
  //     //   .then(function () { });
     }

  return (
    <ImageBackground source={require('../images/solo-fondo.png')} style={{
      position: "absolute",
      zIndex: 1,
      flex: 1,
      justifyContent: "center",
      resizeMode: "cover",
      width: "100%",
      height: "100%",
      // opacity: 0.9,
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center"
    }}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{
        position: "absolute",
        zIndex: 99,
        width: "100%",
        height: "100%",
        flex: 1,
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.2)"
      }}>
{/*
// {/* 
// <View style={{backgroundColor:"rgba(0,0,0,0.8)", width:"100%", height:"100%", position:"absolute", zIndex:999, justifyContent:"center", alignContent:"center", alignItems:"center"}}>
// <View style={{borderRadius:20, backgroundColor:"white", width:"80%", paddingHorizontal:10, paddingVertical:20, justifyContent:"center", alignContent:"center", alignItems:"center"}}>
// <>
// <ActivityIndicator color={colorBetta} size={60} />
// <Text>Solicitando...</Text>
// </> 
// <>
// <Icon name='checkmark-circle-outline' width={60} height={60} fill={colorBetta} />
// <Text style={{marginVertical:15, fontSize:14, color:"#000"}}>Su nueva contraseña es:</Text>
// <Text style={{color:colorBetta, fontWeight:"bold", fontSize:16}}>tgrqegerger</Text>
// </>
// </View>
// </View>
*/}
        <View style={{
          alignItems: "center",
          alignContent: "center",
          backgroundColor: "rgba(255,255,255,0.6)",
          flexDirection: "column",
          width: windowWidth - 40,
          maxHeight: windowHeight - 40,
          paddingHorizontal: 10,
          paddingVertical: 40,
          borderRadius: 20,
        }}>
          <View style={{ borderRadius: 12, width: "85%", marginBottom: 20, flexDirection: "row", backgroundColor: "rgba(255,255,255,1)" }}>
            <TextInput
              style={{ paddingHorizontal: 10 }}
              value={formInfo.email}
              placeholder="email"
              placeholderTextColor="#777"
              keyboardType={'email-address'}
              // editable={editable}
              onChangeText={text => onChangeText(text, 'email')}
            />
            <View style={{ position: "absolute", right: 10, top: 10 }}>
              <Icon name='email' width={25} height={25} fill={color_primary} />
            </View>
          </View>
          {Load &&
            <ActivityIndicator size={40} color={color_primary} />
          }
          {!Load &&
            <BTN icon="" text="Entrar" function={sendForm} screen="Login" data={""} w={"60%"} />
          }
          <TouchableOpacity onPress={() => setlanguage(true)} style={{ position: "absolute", bottom: 10, right: 10 }}>
            <Icon name='settings-outline' width={25} height={25} fill={color_primary} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", width: "100%", marginTop: 40, justifyContent: "space-around", }}>
          <BTN icon="" text="Iniciar" function={goToScreen} screen="Login" data={"Login"} w={"45%"} />
          <BTN icon="" text="Registrar" function={goToScreen} screen="Register" data={"Register"} w={"45%"} />
        </View>
        <View style={{ width: 250, height: 80, marginTop: 40 }}>
          <Image style={{ width: null, height: null, flex: 1, resizeMode: "cover" }} source={require("../images/logo2.png")} />
        </View>
      </View>
      {
        language &&
        <View style={{ backgroundColor: "rgba(0,0,0,0.8)", position: "absolute", zIndex: 9999, width: "100%", height: "100%", paddingHorizontal: "10%", justifyContent: "center" }}>
          <TouchableOpacity onPress={() => setlanguage(false)} style={{ position: "relative", alignSelf: "flex-end", marginBottom: -15 }}>
            <Icon name='close-circle-outline' width={25} height={25} fill="#FFF" />
          </TouchableOpacity>
          <ChangeLanguage />
        </View>
      }
    </ImageBackground>
  )
}
const styles = StyleSheet.create({});


