import React, { useState, useEffect } from 'react'
import { Keyboard, Linking, Alert, SafeAreaView, StatusBar, ScrollView, TextInput, TouchableOpacity, StyleSheet, View, Text, Modal } from 'react-native'

import { useTranslation } from 'react-i18next'
import { Icon } from 'react-native-eva-icons'
import LinearGradient from 'react-native-linear-gradient'
import md5 from 'md5'
import Toast from 'react-native-simple-toast'
import axios from 'axios'

import Head from '../../../components/generic/Head'
import Menu from '../../../components/generic/Menu'
import MenuVertical from '../../../components/generic/MenuVertical'
import ChangeLanguage from '../../../../Language/ChangeLanguage'
import {
  color_primary,
  color_secondary,
  color_tertiary,
  color_quarter,
  color_fifth,
  color_white,
  color_white_a,
  color_black,
  color_black_a,
  color_grey_light,
  color_grey_half,
  color_grey_dark,
  color_transparent,
  color_screen,
  color_star

} from '../../../styles/Colors'
//import { serverCrm, base_url } from '../../../Env'

function ProfileConfig(props) {
  const { t, i18n } = useTranslation();
  const [vertical, setvertical] = useState(false);
  const [data, setdata] = useState(props.data);

  const [EditPasword, setEditPasword] = useState(false);
  const [passWord, setpassWord] = useState("");
  const [ViewKey, setViewKey] = useState(true);


  const [modal, setmodal] = useState(false);
  const [message, setmessage] = useState("");



  // const [nowOK, setnowOK] = useState(null);
  // const [newPass1, setnewPass1] = useState("");
  // const [newPass2, setnewPass2] = useState("");




  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }




  function onChangeText(text) { setpassWord(text); }
  function onChangeText1(text) { setnewPass1(text); }
  function onChangeText2(text) { setnewPass2(text); }


  useEffect(() => {
    console.log("teclado abajo...")
    if (keyboardStatus === false && EditPasword === true && passWord !== "") { MyPass() }

  }, [keyboardStatus]);




  //console.log("config data: ", props.data)
  //config data:  {"adress": null, "date_of_birth": null, "email": "dougrafic.art@gmail.com", "email_verified_at": "2021-12-02 16:34:21", "facebook": null, "id": 1, "id_city": null, "id_country": null, "id_perfil": 1, "identificacion": "1123009452", "instagram": null, "language": "en", "name": "angie katherine", "password": "e10adc3949ba59abbe56e057f20f883e", "phone": "3127023197", "photo_profile": "default-user.png", "rol": "client", "status": 1, "surname": "acosta henao", "twitter": null, "youtube": null}






  function MyPass() {
    console.log("MyPass()")

    let actualPasword = props.data.password
    let passwordEncrypted = md5(passWord)
    console.log("actualPasword: ", actualPasword)
    console.log("passwordEncry: ", passwordEncrypted)

    if (passwordEncrypted === actualPasword) {
      console.log("iguales")
      //   setnowOK(true)
    }
    else {
      console.log("diferenets")
      setmessage(t("incorrectPassword"));
      setmodal(true);
      Toast.show(t("incorrectPassword"));
    }
  }





  /*
  
  
  
  
    function update() {
      let actualPasword = props.data.password
      let passwordEncrypted = md5(newPass1);
      if (newPass1 !== newPass2) {
        setmessage(t("notEquals"));
        setmodal(true);
        Toast.show(t("notEquals"));
      }
      else {
        if (newPass1 !== actualPasword) { let data = { 'id': props.data.id, 'password': passwordEncrypted }; updating(data); }
        else {
          setmessage(t("enterDifferentPassword"));
          setmodal(true);
          Toast.show(t("enterDifferentPassword"));
        }
      }
    }
  
    async function updating(data) {
      let msj
      await axios.post(base_url(serverCrm, `change/password/medic`), data).then(function (response) {
        msj = response.data
      })
        .catch(function (error) { msj = error.data })
        .then(function () { });
      console.log("update? ", msj);
      if (msj === true) {
        Toast.show(t("updatedPassword"));
        setEditPasword(false);
        setpassWord("");
        setnowOK(null);
        setnewPass1("");
        setnewPass2("");
      }
      return msj;
    }
  
    useEffect(() => {
      if (modal === true) {
        setTimeout(() => {
          setmodal(false);
          setmessage("")
        }, 5000);
      }
    }, [modal]);
  
  */










  const [keyboardStatus, setKeyboardStatus] = useState(false);
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <View style={{
      flex: 1,
      backgroundColor: color_screen,
      paddingBottom: 420,
      alignItems: "center"

    }}>


      {/*
      <ScrollView
        scrollEventThrottle={16}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
      >
      </ScrollView>
      */}


      <ChangeLanguage />








      <TouchableOpacity
        onPress={() => setEditPasword(!EditPasword)}
        style={{
          backgroundColor: color_white,
          width: "90%",
          overflow: "hidden",
          borderRadius: 12,
          justifyContent: "space-between",
          flexDirection: "row",
          marginVertical: 10,
          borderBottomLeftRadius: EditPasword ? 0 : 12,
          borderBottomRightRadius: EditPasword ? 0 : 12,
        }}>
        <View style={{ position: "relative", left: 0, }}>
          <LinearGradient style={{
            height: 50,
            width: 80,
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center"
          }} colors={[
            color_secondary, color_primary, color_primary
          ]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} >
            <Icon name={EditPasword ? 'close-square-outline' : 'lock-outline'} width={30} height={30} fill={color_white} />
          </LinearGradient>
        </View>
        <Text style={{
          textTransform: "capitalize",
          lineHeight: 45,
          textAlign: "left",
          width: "80%",
          paddingHorizontal: 15,
          fontSize: 14,
          fontWeight: "bold",
          color: color_primary
        }}>{t("changePassword")}</Text>
      </TouchableOpacity>




      {EditPasword &&
        <View style={{ alignItems: "center", alignContent: "center", backgroundColor: color_white, width: "90%", marginTop: -10, borderTopColor: color_grey_light, borderTopWidth: 0.5, borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
          <View style={{ flexDirection: "column", marginVertical: 10, width: "90%" }}>
            <Text style={{ fontSize: 14, color: color_primary, textTransform: "capitalize", textAlign: "center", fontWeight: "bold" }}>{t("enterYourCurrentPassword")}</Text>
            <TextInput secureTextEntry={ViewKey} onChangeText={text => onChangeText(text)} style={{ borderColor: color_primary, borderWidth: 1, borderRadius: 12, paddingHorizontal: 15, height: 50 }} value={passWord} />
            <TouchableOpacity onPress={() => setViewKey(!ViewKey)} style={{ right: 5, top: 30, position: "absolute", zIndex: 999, }}>
              <Icon name={ViewKey ? "eye-outline" : "eye-off-outline"} fill='silver' height={30} width={30} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => MyPass()} style={{ width: "80%", marginVertical: 10, borderRadius: 12, overflow: "hidden", backgroundColor: "red" }}>
            <LinearGradient style={{ flexDirection: "row", padding: 10, justifyContent: "space-around", alignContent: "center", alignItems: "center", justifyContent: "center" }} colors={[color_fifth, color_primary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} >
              <Icon name='lock-outline' width={30} height={30} fill={color_white} />
              <Text style={{ color: color_white, fontWeight: "bold", textTransform: "capitalize", marginLeft: 10, lineHeight: 30, fontSize: 14 }}>{t("check")}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      }









      {/* 
     

          {nowOK === true &&
            <>
              <View style={{ flexDirection: "column", marginVertical: 10, width: "90%" }}>
                <Text style={{ fontSize: 14, color: color_primary, textTransform: "capitalize", textAlign: "center", fontWeight: "bold" }}>{t("enterYourNewPassword")}</Text>
                <TextInput  secureTextEntry={ViewKey} onChangeText={text => onChangeText1(text)} style={{ borderColor: color_primary, borderWidth: 1, borderRadius: 12, paddingHorizontal: 15, height: 50 }} value={newPass1} />
                <TouchableOpacity onPress={() => setViewKey(!ViewKey)} style={{ right: 5, top: 30, position: "absolute", zIndex: 999, }}>
                <Icon name={ViewKey ? "eye-outline" : "eye-off-outline"} fill='silver' height={30} width={30} />
              </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "column", marginVertical: 10, width: "90%" }}>
                <Text style={{ fontSize: 14, color: color_primary, textTransform: "capitalize", textAlign: "center", fontWeight: "bold" }}>{t("confirmPassword")}</Text>
                <TextInput  secureTextEntry={ViewKey} onChangeText={text => onChangeText2(text)} style={{ borderColor: color_primary, borderWidth: 1, borderRadius: 12, paddingHorizontal: 15, height: 50 }} value={newPass2} />
                <TouchableOpacity onPress={() => setViewKey(!ViewKey)} style={{ right: 5, top: 30, position: "absolute", zIndex: 999, }}>
                <Icon name={ViewKey ? "eye-outline" : "eye-off-outline"} fill='silver' height={30} width={30} />
              </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => update()} style={{ width: "80%", marginVertical: 10, borderRadius: 12, overflow: "hidden", backgroundColor: "red" }}>
                <LinearGradient style={{ flexDirection: "row", padding: 10, justifyContent: "space-around", alignContent: "center", alignItems: "center", justifyContent: "center" }} colors={[color_fifth, color_primary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} >
                  <Icon name='lock-outline' width={30} height={30} fill={color_white} />
                  <Text style={{ color: color_white, fontWeight: "bold", textTransform: "capitalize", marginLeft: 10, lineHeight: 30, fontSize: 14 }}>{t("toUpdate")}</Text>
                </LinearGradient>
              </TouchableOpacity>
               
            </>
          }
        </View>
      } */}








      <Modal animationType="slide" transparent={true} visible={modal} >
        <View style={{ backgroundColor: "rgba(0,0,0,0.8)", width: "100%", height: "100%", position: "absolute", zIndex: 999, alignContent: "center", alignItems: "center", }}>
          <View style={{ top: "20%" }}>
            <TouchableOpacity
              onPress={() => setmodal(!modal)}
              style={{
                position: "absolute", right: -10, top: 10
              }}>
              <Icon name="close-circle-outline" fill={color_white} width={40} height={40} />
            </TouchableOpacity>
            <View style={{ backgroundColor: color_white, marginTop: "15%", padding: "10%", borderRadius: 20, width: 300, justifyContent: "center", alignContent: "center", alignItems: "center" }}>
              <Icon name={"alert-triangle-outline"} width={60} height={60} fill={color_star} />
              <Text style={{ fontSize: 18, color: color_star, fontWeight: "bold", textAlign: "center" }}>{message}</Text>
            </View>
          </View>
        </View>
      </Modal>







    </View>
  )
}
export default ProfileConfig;
/*
function Index(props) {

 






  return (
    <View style={styles.page}>

      <TouchableOpacity onPress={() => props.editProfile()}
        style={{ backgroundColor: color_white, width: "90%", overflow: "hidden", borderRadius: 12, justifyContent: "space-between", flexDirection: "row", marginVertical: 10 }}>
        <View style={{ position: "relative", left: 0, }}>
          <LinearGradient style={{ height: 50, width: 80, alignContent: "center", alignItems: "center", justifyContent: "center" }} colors={[color_fifth, color_primary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} >
            <Icon name='edit-outline' width={30} height={30} fill={color_white} />
          </LinearGradient>
        </View>
        <Text style={{ textTransform: "capitalize", lineHeight: 45, textAlign: "left", width: "80%", paddingHorizontal: 15, fontSize: 14, fontWeight: "bold", color: colorBetta }}>{t("editProfile")}</Text>
      </TouchableOpacity>


      <TouchableOpacity onPress={() => props.logOut()}
        style={{ backgroundColor: color_white, width: "90%", overflow: "hidden", borderRadius: 12, justifyContent: "space-between", flexDirection: "row", marginVertical: 10 }}>
        <View style={{ position: "relative", left: 0, }}>
          <LinearGradient style={{ height: 50, width: 80, alignContent: "center", alignItems: "center", justifyContent: "center" }} colors={[color_fifth, color_primary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} >
            <Icon name='power-outline' width={30} height={30} fill={color_white} />
          </LinearGradient>
        </View>
        <Text style={{ textTransform: "capitalize", lineHeight: 45, textAlign: "left", width: "80%", paddingHorizontal: 15, fontSize: 14, fontWeight: "bold", color: colorBetta }}>{t("SignOff")}</Text>
      </TouchableOpacity>









      <View style={styles.card}>
        <Text style={{ color: "#000" }}>
          {t("version")}: 1.0.0.1
        </Text>
        <Text style={{ color: "#000" }}>
          Wellezy © by PDT,  2021.
        </Text>
      </View>
      <View style={{ height: 50 }}></View>



     
    </View>
  );
}
const styles = StyleSheet.create({
  page: {
    height: "100%",
    width: "100%",
    alignContent: "center",
    alignItems: "center"
  },
  card: {
    marginTop: 20,
    backgroundColor: color_white,
    padding: 10,
    width: "90%",
    borderRadius: 8,
    alignContent: "center",
    alignItems: "center"
  }
});
export default Index;

*/