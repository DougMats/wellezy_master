import React, { useEffect, useState, useContext } from 'react';
import { ActivityIndicator, StyleSheet, SafeAreaView, Text, View, TextInput, Dimensions, TouchableOpacity, StatusBar, Image, ImageBackground, Alert } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import PhotoUpload from 'react-native-photo-upload'
import axios from 'axios'
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage'
import { serverCrm, base_url } from '../../Env'
import UserContext from '../../contexts/UserContext'
import FilterByLocation from '../components/filters/FilterByLocation.js';
import ChangeLanguage from '../../Language/ChangeLanguage.js';
import { useTranslation } from 'react-i18next';
import { session } from '../services/connection.js';
import PreRegistration from './PreRegistration.js'
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
} from '../styles/Colors.js'
import { ScrollView } from 'react-native-gesture-handler';


// import { CountryCode, Country } from '../types'
// import CountryPicker from 'react-native-country-picker-modal'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Register(props) {
  const { t, i18n } = useTranslation();
  const { navigation } = props
  const [Location, setLocation] = useState(false);
  const [language, setlanguage] = useState(false);
  const [selectingType, setselectingType] = useState(false);
  const [Load, setLoad] = useState(false);
  const [successful, setsuccessful] = useState(0);
  const [secretPassOne, setsecretPassOne] = useState(true);
  const [secretPassTwo, setsecretPassTwo] = useState(true);
  const [notificationToken, setNotificationToken] = useState('')
  const { UserDetails, setUserDetails } = useContext(UserContext)
  const [ERROR, setERROR] = useState(0);
  const [instructions, setinstructions] = useState(false);

  const [typeUser, settypeUser] = useState([
    { id: 1, value: "medic", name: "medic", color: "#F39C12", img: "formZero.png", description: "medicos"},
    { id: 2, value: "client", name: "client", color: "#3498DB", img: "formOne.png", description: "los pacientes ....." },
    { id: 3, value: "service", name: "service", color: "#2ECC71", img: "formTwo.png", description: "usuarios que prestan servicios como, enfermeras, choferes, etc" },
  ]);
  const [formInfo, setFormInfo] = useState({
    name: '',
    surname: '',
    phone: '',
    id_country: '',
    id_city: '',
    country: '',
    distric: '',
    city: '',
    adress: '',
    email: '',
    rol: '',
    rolName: '',
    password: '',
    password_repeat: '',
    avatar: '',
    language: i18n.language,
    status: 1,
    //"react-native-svg": "9.13.3",
  })

  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = 1 }
  useEffect(() => {
    setTimeout(() => {
      console.log("........")
      //setinstructions(true)
    }, 10000);
  }, [randomCode]);


  useEffect(() => {
    async function getToken() {
      const fcmToken = await messaging().getToken();
      if (fcmToken) { setNotificationToken(fcmToken) }
      else { console.log('user doesnt have a device token yet') } console.log(fcmToken, "TOKEN")
    }
    getToken()
  }, [])

  function onChangeText(text, key) {
    setFormInfo({
      ...formInfo,
      [key]: text
    })
  }

  function goToScreen(screen) {
    navigation.navigate(screen)
  }

  async function getLocation(i) {
    const res1 = i[1].name;
    const res2 = i[1].id;
    const res3 = i[2].CiudadDistrito;
    const res4 = i[2].name;
    const res5 = i[2].id;
    setFormInfo({
      ...formInfo,
      "id_country": res2,
      "id_city": res5,
      "country": res1,
      "distric": res3,
      "city": res4
    })
  }
  

  async function sendForm() {
    const data = {
      ...formInfo
    }
    if (data.name === "") { setERROR(2); Toast.show("debe ingresar su nombre"); }
    else {
      if (data.surname === "") { setERROR(3); Toast.show("Debe ingrsar su apellido"); }
      else {
        if (data.email === "") { setERROR(5); Toast.show("Debe ingresar el Email"); }
        else {
          if (data.password === "") { setERROR(6); Toast.show("Debe ingresar una lave"); }
          else {
            if (data.password_repeat === "") { setERROR(7); Toast.show("Debe confirmar la clave"); }
            else {
              if (data.rol === "") { setERROR(10); Toast.show("..."); }
              else {
                if (data.password !== data.password_repeat) { setERROR(7); Toast.show("claves no coinciden"); }
                else {
                  setLoad(true);
                  setERROR(0)
                  const res = await session.register(data)
                  if (res === true) {
                    setsuccessful(1);
                    _storeData(data.email, data.password)
                  }
                  else {
                    if (res.data === "email_used") {
                      setsuccessful(3);
                      setERROR(5)
                      setTimeout(() => {
                        setLoad(false);
                        setsuccessful(0);
                      }, 3000);
                    }
                    else {
                      setsuccessful(2)
                      setTimeout(() => {
                        setLoad(false);
                        setsuccessful(0);
                      }, 3000);
                    }
                  }
                  // axios.post(base_url(serverCrm, `wellezy/register`), data).then(function (res) {
                  //   if (res.data === true) {
                  //     setsuccessful(1);
                  //     _storeData(data.email, data.password)
                  //   }
                  //   else {
                  //     if (res.data === "email_used") {
                  //       setsuccessful(3);
                  //       setERROR(5)
                  //       setTimeout(() => {
                  //         setLoad(false);
                  //         setsuccessful(0);
                  //       }, 3000);
                  //     }
                  //     else {
                  //       console.log("error------------------>", res.data);
                  //       setsuccessful(2)
                  //       setTimeout(() => {
                  //         setLoad(false);
                  //         setsuccessful(0);
                  //       }, 3000);
                  //     }
                  //   }
                  // }).catch(function (error) {
                  //   console.log("error al registrar usuario", error.data)
                  // });
                }
              }
            }
          }
        }
      }
    }
  }

  const _storeData = async (email, password) => {
    try {
      const data = {
        "email": email,
        "password": password,
        //"fcmToken": notificationToken
      }
      axios.post(base_url(serverCrm, `wellezy/auth`), data).then(function (response) {
        _Init(response.data)
      })
        .catch(function (error) {
          console.log("error al validar datos despues de registrar")
        })
        .then(function () { });
    }
    catch (error) {
    }
  }

  const _Init = async (data) => {
    try {
      await AsyncStorage.setItem('@Passport', JSON.stringify(data));
      setLoad(false)
      setsuccessful(0)
      setUserDetails({ ...data })
      props.navigation.navigate("Home")
    }
    catch (error) { }
  }

  function getTypeUser(value, name) {
    setinstructions(false)
    setFormInfo({ ...formInfo, "rolName": name, "rol": value })
  }

  return (
    <SafeAreaView style={{ backgroundColor: color_screen, flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent" />

      <PreRegistration
        data={typeUser}
        status={instructions}
        close={setinstructions}
        get={getTypeUser}
      />

      {Load &&
        <View style={{
          position: "absolute",
          backgroundColor: "rgba(0,0,0,0.5)",
          flex: 1,
          width: "100%",
          height: "100%",
          zIndex: 999,
          justifyContent: "center"
        }}>
          <View style={{
            backgroundColor: color_white,
            alignSelf: "center",
            width: windowWidth / 2,
            minHeight: windowWidth / 4,
            borderRadius: 20,
            justifyContent: "center"
          }}>
            {successful === 0 &&
              <View style={{ justifyContent: "center", alignSelf: "center" }}>
                <ActivityIndicator color={color_primary} size={40} />
                <Text style={{ textAlign: "center", marginTop: 10, color: color_primary }}>Cargando...</Text>
              </View>
            }
            {successful === 1 &&
              <View style={{ justifyContent: "center", alignSelf: "center", alignItems: "center" }}>
                <Icon name='checkmark-circle-outline' width={80} height={80} fill='#82E0AA' />
              </View>}
            {successful === 2 &&
              <View style={{ justifyContent: "center", alignSelf: "center", alignItems: "center" }}>
                <Icon name='alert-circle-outline' width={80} height={80} fill='red' />
              </View>}
            {successful === 3 &&
              <View style={{ paddingVertical: 15, justifyContent: "center", alignSelf: "center", alignItems: "center" }}>
                <Icon name='alert-circle-outline' width={80} height={80} fill='#F5B041' />
                <Text style={{ textAlign: "center", marginTop: 10, color: '#F5B041', }}>Email ya está en uso.</Text>
              </View>}
          </View>
        </View>
      }
      <ImageBackground source={require('../images/background_register.png')} style={styles.back}>
        <View style={{ marginTop: 30, width: windowWidth, height: windowHeight }}>
          <ScrollView horizontal={false} scrollEventThrottle={16}>
            <View style={styles.card}>
              <Text style={styles.titleCard}>{t("createAnAccount")}</Text>
              {
                formInfo.avatar !== "" &&
                <TouchableOpacity onPress={() => onChangeText('', 'avatar')}
                  style={{
                    zIndex: 999,
                    backgroundColor: color_white,
                    width: 40, height: 40,
                    borderRadius: 30,
                    position: "absolute",
                    right: 15, top: 25,
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                  <Icon name={'close'} height={30} width={30} fill={"rgba(0,0,0,0.25)"} />
                </TouchableOpacity>
              }

              <View style={{
                justifyContent: "center",
                alignItems: "center",
                height: formInfo.avatar !== "" ? 200 : 105,
                marginBottom: formInfo.avatar === "" ? 20 : 80,
                marginTop: formInfo.avatar === "" ? 10 : 80,
              }}>
                <PhotoUpload
                  onPhotoSelect={avatar => {
                    if (avatar) {
                      onChangeText(avatar, 'avatar')
                    }
                  }}
                >
                  {formInfo.avatar === "" ?
                    <View style={{
                      borderColor: ERROR === 1 ? "red" : color_grey_light,
                      borderWidth: 0.5,
                      borderRadius: 12,
                      flexDirection: "column",
                      backgroundColor: ERROR === 1 ? "rgba(255,0,0,0.05)" : "rgba(255,255,255,0.1)",
                      marginBottom: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      paddingHorizontal: 50,
                      paddingVertical: 20,
                    }}>
                      <Icon name={'image-outline'} height={30} width={30} fill={color_grey_light} />
                      <Text style={{ color: color_grey_light, fontSize: 18 }}>Upload a file</Text>
                    </View>
                    :
                    <Image
                      style={{ resizeMode: 'center', marginBottom: 20, width: windowWidth, height: windowWidth }}
                      source={require('../images/flight.jpg')}
                    />
                  }
                </PhotoUpload>
              </View>
              <View style={{ ...styles.group, borderColor: ERROR === 2 ? "red" : "#EAECEE" }}>
                <TextInput
                  value={formInfo.name}
                  style={styles.input}
                  placeholder="Names"
                  placeholderTextColor="#aaa"
                  onChangeText={text => onChangeText(text, 'name')} />
                <View style={styles.icon}><Icon name='person' width={25} height={25} fill='#aaa' /></View>
              </View>
              <View style={{ ...styles.group, borderColor: ERROR === 3 ? "red" : "#EAECEE" }}>
                <TextInput
                  value={formInfo.surname}
                  style={styles.input}
                  placeholder="Surname"
                  placeholderTextColor="#aaa"
                  onChangeText={text => onChangeText(text, 'surname')} />
                <View style={styles.icon}><Icon name='person' width={25} height={25} fill='#aaa' /></View>
              </View>
              <View style={{ ...styles.group, borderColor: ERROR === 4 ? "red" : "#EAECEE" }}>
                <TextInput
                  value={formInfo.phone}
                  style={styles.input}
                  placeholder="+00 000 000 00 00"
                  placeholderTextColor="#aaa"
                  textContentType='telephoneNumber'
                  dataDetectorTypes='phoneNumber'
                  keyboardType='phone-pad'
                  onChangeText={text => onChangeText(text, 'phone')} />
                <View style={styles.icon}><Icon name='phone' width={25} height={25} fill='#aaa' /></View>
              </View>
              <View style={{ ...styles.group, borderColor: ERROR === 5 ? "red" : "#EAECEE" }}>
                <TextInput
                  value={formInfo.email}
                  style={styles.input}
                  placeholder="wellezy@wellezy"
                  placeholderTextColor="#aaa"
                  keyboardType='email-address'
                  onChangeText={text => onChangeText(text, 'email')} />
                <View style={styles.icon}><Icon name='email' width={25} height={25} fill='#aaa' /></View>
              </View>
              <View style={{ ...styles.group, borderColor: ERROR === 6 ? "red" : "#EAECEE" }}>
                <TextInput
                  secureTextEntry={secretPassOne}
                  value={formInfo.password}
                  style={styles.input}
                  placeholder="password"
                  placeholderTextColor="#aaa"
                  onChangeText={text => onChangeText(text, 'password')} />
                <TouchableOpacity style={styles.icon} onPress={() => setsecretPassOne(!secretPassOne)}>
                  <Icon name={secretPassOne ? 'eye-off-outline' : 'eye-outline'} width={25} height={25} fill='#aaa' />
                </TouchableOpacity>
              </View>
              <View style={{ ...styles.group, borderColor: ERROR === 7 ? "red" : "#EAECEE" }}>
                <TextInput
                  secureTextEntry={secretPassTwo}
                  value={formInfo.password_repeat}
                  style={styles.input}
                  placeholder="password repeat"
                  placeholderTextColor="#aaa"
                  onChangeText={text => onChangeText(text, 'password_repeat')} />
                <TouchableOpacity style={styles.icon} onPress={() => setsecretPassTwo(!secretPassTwo)}>
                  <Icon name={secretPassTwo ? 'eye-off-outline' : 'eye-outline'} width={25} height={25} fill='#aaa' />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => setLocation(!Location)} style={{ width: "100%" }}>
                {formInfo.id_country === '' ?
                  <View style={{
                    borderWidth: 1,
                    borderColor: ERROR === 8 ? "red" : "#EAECEE",
                    flexDirection: "row",
                    marginBottom: 10,
                    width: "90%",
                    alignSelf: "center",
                    backgroundColor: "#EAECEE",
                    height: 45,
                    borderRadius: 15
                  }}>
                    <Text style={{ width: "90%", lineHeight: 40, paddingHorizontal: 20, color: color_grey_half }}>Dirección</Text>
                    <View style={styles.icon}><Icon name='pin' width={25} height={25} fill='#aaa' /></View>
                  </View>
                  :
                  <View style={{ marginBottom: 10, justifyContent: "space-between", width: "90%", flexDirection: "row", alignSelf: "center" }}>
                    <Text style={{ backgroundColor: "#EAECEE", maxWidth: "33%", minWidth: "28%", height: 45, borderRadius: 15, lineHeight: 40, textAlign: "center" }}>{formInfo.country}</Text>
                    <Text style={{ backgroundColor: "#EAECEE", maxWidth: "33%", minWidth: "28%", height: 45, borderRadius: 15, lineHeight: 40, textAlign: "center" }}>{formInfo.distric}</Text>
                    <Text style={{ backgroundColor: "#EAECEE", maxWidth: "33%", minWidth: "28%", height: 45, borderRadius: 15, lineHeight: 40, textAlign: "center" }}>{formInfo.city}</Text>
                  </View>
                }
              </TouchableOpacity>
              {formInfo.id_country !== '' &&
                <View style={{ ...styles.group, borderColor: ERROR === 9 ? "red" : "#EAECEE" }}>
                  <TextInput
                    value={formInfo.adress}
                    style={styles.input}
                    placeholder="Adress"
                    placeholderTextColor="#aaa"
                    onChangeText={text => onChangeText(text, 'adress')} />
                  <View style={styles.icon}><Icon name='pin' width={25} height={25} fill='#aaa' /></View>
                </View>
              }
              <TouchableOpacity style={{ ...styles.group, borderColor: ERROR === 10 ? "red" : "#EAECEE" }} onPress={() => setselectingType(!selectingType)}>
                <Text style={styles.inputText}>{formInfo.rolName === '' ? "Select a user type" : formInfo.rolName}</Text>
                <View style={styles.icon}><Icon name='layers' width={25} height={25} fill='#aaa' /></View>
              </TouchableOpacity>


              {//{id:0, value: "medic", name: "1medic", color:"#3498DB", img:"formZero.png",  description: "1descriptionUserClient" },


                selectingType === true &&
                <View style={{ paddingTop: 25, paddingHorizontal: 25, paddingBottom: 10, borderRadius: 12, marginBottom: 15, backgroundColor: "#D5D8DC", width: "90%", position: "relative", zIndex: 1, marginTop: -35, }}>
                  {
                    typeUser.map((i, key) => {
                      return (
                        <TouchableOpacity onPress={() => [
                          setselectingType(false),
                          setFormInfo({ ...formInfo, "rolName": i.name, "rol": i.value })
                        ]}
                          style={{
                            marginTop: 8,
                            backgroundColor: "#EAECEE",
                            borderRadius: 8,
                            paddingVertical: 5,
                            flexDirection:"row",
                            justifyContent:"space-around"
                          }}
                        >
                   
                              
                            <View style={{width:40, height:40, borderRadius:40, backgroundColor:"white", overflow:"hidden" }}></View>
                      
                          <View style={{ flexDirection: "column", width:"75%"}}>
                            <Text style={{ textTransform: "capitalize", textAlign: "left", fontSize: 16, fontWeight: "bold",}}>{i.name}</Text>
                            <Text style={{ color: color_grey_half, textAlign: "justify", fontSize: 14 }}>{i.description}</Text>
                          </View>

                        </TouchableOpacity>
                      )
                    })
                  }
                </View>
              }

              <TouchableOpacity onPress={() => setinstructions(true)} style={{ position: "absolute", bottom: 20, left: 15 }}>
                <Icon name={"alert-circle"} width={30} height={30} fill="#ccc" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.BtnPrimary} onPress={() => sendForm()}>
                <Text style={styles.loginText}>SING UP</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setlanguage(true)} style={{ position: "absolute", bottom: 20, right: 15 }}>
                <Icon name='settings-outline' width={25} height={25} fill="#ccc" />
              </TouchableOpacity>
            </View>
            <View style={{ width: "90%", marginBottom: "15%", marginTop: 20, flexDirection: "row", alignSelf: "center", justifyContent: "space-around" }}>
              <TouchableOpacity style={styles.btndown} onPress={() => goToScreen('Login')}><Text style={styles.btndownText}>{t("Login")}</Text></TouchableOpacity>
              <TouchableOpacity style={styles.btndown} onPress={() => goToScreen('Forgot')}><Text style={styles.btndownText}>{t("ForgotYourPassword")}</Text></TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
      <FilterByLocation title={""} color={color_fifth} show={Location} setShow={setLocation} getInfo={getLocation} />
      {
        language &&
        <View style={{ backgroundColor: "rgba(0,0,0,0.8)", position: "absolute", width: "100%", height: "100%", paddingHorizontal: "10%", justifyContent: "center" }}>
          <TouchableOpacity onPress={() => setlanguage(false)} style={{
            position: "relative",
            alignSelf: "flex-end",
            marginBottom: 0,
            right: -10
          }}>
            <Icon name='close-circle-outline' width={30} height={30} fill="#FFF" />
          </TouchableOpacity>
          <ChangeLanguage />
        </View>
      }
    </SafeAreaView>
  )
}
export default Register;
const styles = StyleSheet.create({
  btndown: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2, },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    fontSize: 14,
    backgroundColor: color_white,
    paddingVertical: 8,
    paddingHorizontal: 20,
    minWidth: "30%",
    borderRadius: 12
  },
  btndownText: {
    color: color_primary,
    textAlign: "center"
  },
  back: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
    width: "100%",
    height: "100%"
  },
  card: {
    marginTop: "15%",
    alignSelf: "center",
    width: "90%",
    backgroundColor: color_white,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2, },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleCard: {
    textTransform: "capitalize",
    color: color_primary,
    paddingTop: 30,
    width: "100%",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  group: {
    zIndex: 9,
    backgroundColor: "#EAECEE",
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 10,
    borderWidth: 1,
  },
  input: {
    paddingHorizontal: 20,
    width: "90%",
    color: "#000",
    fontSize: 14
  },
  icon: {
    justifyContent: "center",
    width: "10%",
  },
  inputText: {
    left: 0,
    position: "relative",
    width: "90%",
    height: 45,
    lineHeight: 40,
    paddingHorizontal: 20,
    color: "#000",
    fontSize: 14
  },
  BtnPrimary: {
    width: "60%",
    backgroundColor: color_primary,
    borderRadius: 7,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 15,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7
  },
  loginText: {
    fontSize: 14,
    color: color_white,
    fontWeight: "bold"
  }
});