import React, { useState, useContext, useEffect } from 'react'
import { Image, SafeAreaView, ScrollView, Text, View, Dimensions, TouchableOpacity, StatusBar, ActivityIndicator, StyleSheet } from 'react-native'
import UserContext from '../../../contexts/UserContext'
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-community/async-storage'
import { Icon } from 'react-native-eva-icons';
import Toast from 'react-native-simple-toast';
import LinearGradient from 'react-native-linear-gradient';
//import NetInfo from "@react-native-community/netinfo";
import MenuVertical from '../../components/generic/MenuVertical';
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
  color_grey_dark,
  color_transparent,
  color_screen,
} from '../../styles/Colors'

import { profile } from '../../services/connection.js';
import { file_server1 } from '.././../../Env.js'

// import { MyValorationScheduled, getMyProfile, updateMyProfile, mySharedExperiences, MyProceduresPerformed } from '../../src/api/https.js'
// import { NotNetwork } from '../components/generic/NotNetwork';

import ProfileHeader from './ProfileHeader.js';

import ProfileInfo from './pages/ProfileInfo.js';
import ProfileConfig from './pages/ProfileConfig.js';
import ProfileFavorites from './pages/ProfileFavorites.js';
import ProfileNotifications from './pages/ProfileNotifications.js';
import ProfileShares from './pages/ProfileShares.js'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function ProfileClient(props) {
  //const { userDetails, setUserDetails } = React.useContext(UserContext);

  const { t, i18n } = useTranslation();
  const { UserDetails, setUserDetails } = useContext(UserContext);
  const { userDetails } = useContext(UserContext);
  const [Load, setLoad] = useState(true);
  const [Data, setData] = useState(false);
  const [vertical, setvertical] = useState(false);

  // const [menu, setmenu] = useState(false);
  // const [Editing, setEditing] = useState(false);
  const [Page, setPage] = useState(1);
  // const [connet, setconnet] = useState(null);
  // const [myData, setmyData] = useState(null)
  // const [Valoraciones, setValoraciones] = useState(null);
  // const [MyShared, setMyShared] = useState(null);
  // const [ProceduresPerformed, setProceduresPerformed] = useState(null);
  // const [country, setcountry] = useState("");
  // const [city, setcity] = useState("");
  // const [dateBirthDay, setdateBirthDay] = useState("");




  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = 1 }

  useEffect(() => {


    if (randomCode = props.route.params.page) {
      console.log("not page")
      //setPage(1)
    }
    else {
      console.log("....")
      //setPage(1)
    }


    get()
  }, [randomCode]);

  async function get() {
    const res = await profile.getProfile(userDetails.id, userDetails.rol)
    setData(res)
    setLoad(false)
  }



  const [colorStickerMenu, setcolorStickerMenu] = useState(color_primary);

  // {
  // "adress": null,
  // "date_of_birth": null,
  // "email": "dougrafic.art@gmail.com",
  // "email_verified_at": "2021-12-02 16:34:21",
  // "facebook": null,
  // "id": 1,
  // "id_city": null,
  // "id_country": null,
  // "id_perfil": 1,
  // "identificacion": "1123009452",
  // "photo_profile": "default-user.png",
  // "instagram": null,
  // "language": "en",
  // "name": "angie katherine",
  // "password": "e10adc3949ba59abbe56e057f20f883e",
  // "phone": "3127023197",
  // "rol": "client",
  // "status": 1,
  // "surname": "acosta henao",
  // "twitter": null,
  // "youtube": null
  // }

  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }



  function goToScreenData(data) {
    let status = data.status;
    let screen
    let key_conference = data.key_generated;
    screen = 'HistoryClinicForm';


    // if (status === 0) { screen = 'HistoryClinicForm'; }
    // if (status === 1) { screen = 'UploadPictures'; }
    // if (status === 2) { screen = 'Sala'; }
    props.navigation.navigate(screen, { randomCode: Math.random(), data, key_conference })
  }




  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color_white }}>
      <StatusBar backgroundColor={color_secondary} barStyle='light-content' />
      <ScrollView
        scrollEventThrottle={16}
        stickyHeaderIndices={[1]}
        onScroll={event => {
          const y = event.nativeEvent.contentOffset.y;
          if (y >= windowWidth / 1.3) { setcolorStickerMenu(color_secondary) }
          else { setcolorStickerMenu(color_primary) }
        }}>




        {/* <ProfileHeader /> */}



        <LinearGradient style={styles.header} colors={[color_secondary, color_primary, color_primary]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
          <TouchableOpacity onPress={() => setvertical(!vertical)} style={{ position: "absolute", zIndex: 99, top: 20, right: 20 }}>
            <Icon name="more-vertical" width={30} height={30} fill={color_white} />
          </TouchableOpacity>
          <View style={styles.wrapAvatar}>
            <Image style={styles.img} source={{ uri: `${file_server1}/img/wellezy/users/${userDetails.photo_profile}` }} />
          </View>
          <View style={styles.wrapInfo}>
            <Text style={styles.headerTextBig}>{userDetails.name} {userDetails.surname}</Text>
            <Text style={styles.headerTextSmall}>{userDetails.email}</Text>
          </View>
        </LinearGradient>





        {!Load &&
          <View>
            <View style={{ ...styles.scrollpage, backgroundColor: colorStickerMenu }}>
              <TouchableOpacity onPress={() => setPage(1)} style={{ width: "24%", alignItems: "center", borderBottomColor: Page === 1 ? color_white : '', borderBottomWidth: Page === 1 ? 1 : 0 }}>
                <Icon name='person-outline' height={25} width={25} fill={Page === 1 ? color_white : 'rgba(255,255,255,0.3)'} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setPage(3)} style={{ width: "24%", alignItems: "center", borderBottomColor: Page === 3 ? color_white : '', borderBottomWidth: Page === 3 ? 1 : 0 }}>
                <Icon name='message-circle-outline' height={25} width={25} fill={Page === 3 ? color_white : 'rgba(255,255,255,0.3)'} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setPage(4)} style={{ width: "24%", alignItems: "center", borderBottomColor: Page === 4 ? color_white : '', borderBottomWidth: Page === 4 ? 1 : 0 }}>
                <Icon name='folder-add-outline' height={25} width={25} fill={Page === 4 ? color_white : 'rgba(255,255,255,0.3)'} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setPage(5)} style={{ width: "24%", alignItems: "center", borderBottomColor: Page === 5 ? color_white : '', borderBottomWidth: Page === 5 ? 1 : 0 }}>
                <Icon name='bell-outline' height={25} width={25} fill={Page === 5 ? color_white : 'rgba(255,255,255,0.3)'} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setPage(6)} style={{ width: "24%", alignItems: "center", borderBottomColor: Page === 6 ? color_white : '', borderBottomWidth: Page === 6 ? 1 : 0 }}>
                <Icon name='heart' height={25} width={25} fill={Page === 6 ? color_white : 'rgba(255,255,255,0.3)'} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setPage(2)} style={{ width: "24%", alignItems: "center", borderBottomColor: Page === 2 ? color_white : '', borderBottomWidth: Page === 2 ? 1 : 0 }}>
                <Icon name='settings-outline' height={25} width={25} fill={Page === 2 ? color_white : 'rgba(255,255,255,0.3)'} />
              </TouchableOpacity>
            </View>
          </View>
        }



        {Load && <View style={{ marginTop: 80 }}><ActivityIndicator color={color_primary} size={40} /></View>}
        {!Load && Page === 1 && <ProfileInfo data={Data} goToScreen={goToScreen} />}
        {!Load && Page === 2 && <ProfileConfig data={Data} goToScreen={goToScreen} />}

        {!Load && Page === 3 && <ProfileShares data={Data} goToScreen={goToScreen} />}

        {!Load && Page === 5 && <ProfileNotifications data={Data} goToScreen={goToScreenData} />}
        {!Load && Page === 6 && <ProfileFavorites data={Data} goToScreen={goToScreen} />}

        <View style={{ height: 60 }}></View>
      </ScrollView>
      {vertical === true &&
        <MenuVertical
          width={280}
          show={vertical}
          action={setvertical}
          goToScreen={goToScreen}
        />
      }
    </SafeAreaView>
  )
}
export default ProfileClient;


const styles = StyleSheet.create({
  header: {
    flexDirection: "column",
    width: "100%",
    height: windowWidth / 1.3,
    alignItems: "center",
    justifyContent: "center"
  },
  wrapAvatar: {
    backgroundColor: "red",
    marginTop: 20,
    borderWidth: 3,
    borderColor: color_white,
    overflow: "hidden",
    width: windowWidth / 2.5,
    height: windowWidth / 2.5,
    borderRadius: windowWidth / 2.5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  img: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: "cover"
  },
  wrapInfo: {
    flexDirection: "column",
    marginTop: 20,
    width: "100%"
  },
  headerTextBig: {
    textTransform: "capitalize",
    color: color_white,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "700"
  },
  headerTextSmall: {
    color: color_white,
    fontSize: 14,
    textAlign: "center",
    fontWeight: "400"
  },




  scrollpage: {

    flexDirection: "row",
    width: "100%",
    height: 40,
    padding: 5,
    paddingTop: 8,
    justifyContent: "space-around"
  },
})




//   useEffect(() => {
//     // const unsubscribe = NetInfo.addEventListener(state => {
//     //   console.log("getting connection....");
//     //   console.log("Is connected?", state.isConnected, " / Connection type", state.type);
//     //   if (state.isConnected === true) {
//     //     setconnet(true);
//     //     Get();
//     //   }
//     //   else {
//     //     setconnet(false);
//     //   }
//     // });
//     // unsubscribe();
//     Get()
//   }, [randomCode]);



//   async function Get() {
//     setLoad(true)
//     //mi perfil completo -> page 1
//     const response1 = await getMyProfile(userDetails.id, i18n.language);
//     setmyData(response1)

//     //experiencias compartidas -> page 3
//     mySharedExperiences
//     const response2 = await mySharedExperiences(userDetails.id, i18n.language);
//     setMyShared(response2)

//     //procedimientos realizados -> page 3
//     const response3 = await MyProceduresPerformed(userDetails.id, i18n.language);
//     setProceduresPerformed(response3)

//     //mis valoraciones programadas -> page 5
//     const valorations = await MyValorationScheduled(userDetails.id);
//     setValoraciones(valorations);
//     setLoad(false)
//   }


//   function Names() {
//     let Name = "";
//     if (userDetails.name !== null || userDetails.name !== "") {
//       Name = userDetails.name.split(" ")
//       let Names = Name[0].charAt(0) + "" + Name[1].charAt(0);
//       return Names;
//     }
//     else {
//       return Name;
//     }
//   }

//   function ToEdit() {
//     console.log("toEdit")
//     setEditing(!Editing);
//     setmenu(false);
//     setPage(1);
//   }

//   function onChangeTex(text, key) {
//     setmyData({
//       ...myData,
//       [key]: text
//     })
//   }

//   const logOut = async () => {
//     try {
//       await AsyncStorage.removeItem('@Passport');
//       console.log('logout')
//       setUserDetails({})
//       goToScreen("Login", 1)
//     } catch (error) {
//       console.log(error.message);
//     }
//   }

//   function editProfile() {
//     setPage(1);
//     setEditing(true);
//   }

//   async function saveInfo() {
//     setEditing(false);
//     let response
//     let array = {
//       'id': myData.id,
//       'title': myData.title,
//       'name': myData.name,
//       'surname': myData.surname,
//       'identification': myData.identification,
//       'email': myData.email,
//       'phone': myData.phone,
//       'dateOfBirth': myData.dateOfBirth,
//       'country': myData.country,
//       'city': myData.city,
//       'adress': myData.adress,
//       'facebook': myData.facebook,
//       'instagram': myData.instagram,
//       'twitter': myData.twitter,
//       'youtube': myData.youtube,
//       'img_profil': myData.img_profil
//     }
//     response = await updateMyProfile(array);
//     if (response === true) { Toast.show(t("updateSuccessfully")); }
//     //else { Toast.show(t("updateError")); }
//   }

//   function solicitudnew() {
//     let from = "Profile";
//     let screen = "SolicitudNew"
//     props.navigation.navigate(screen, { randomCode: Math.random(), from })
//   }

//   function goToScreen(screen) {
//     props.navigation.navigate(screen, { randomCode: Math.random() })
//   }

//   function goToScreenData(data,) {
//     let status = data.status;
//     let screen
//     let from = "Profile";
//     let key_conference = data.key_generated;
//     if (status === 0) { screen = 'HistoriaClinica'; }
//     if (status === 1) { screen = 'UploadPictures'; }
//     if (status === 2) { screen = 'Sala'; key_conference }
//     props.navigation.navigate(screen, { randomCode: Math.random(), data, from, key_conference })
//   }
// function getCamera(){}
// function uploadFromStorage(){}

// {!Load && Page === 1 && myData !== null && <Page1 porps={props} myData={myData} Editing={Editing} ChangeText={onChangeTex} saveInfo={saveInfo} />}
// {!Load && Page === 2 && <Page2 porps={props} myData={myData} editProfile={editProfile} logOut={logOut} />}
// {!Load && Page === 3 && MyShared !== null && ProceduresPerformed !== null && <Page3 porps={props} MyShared={MyShared} ProceduresPerformed={ProceduresPerformed} userDetails={userDetails} />}
// {!Load && Page === 4 && <Page4 porps={props} />}
// {!Load && Page === 5 && Valoraciones !== null && <Page5 porps={props} Valoraciones={Valoraciones} goToScreen={goToScreenData} />}
// {!Load && Page === 6 && Valoraciones !== null && <Text> mys favoritos</Text>}

//           {!Load &&
//             <View style={{ width: "100%", alignItems: "center", alignContent: "center" }}>
//               <TouchableOpacity style={styles.btnPrimary} onPress={() => solicitudnew()}>
//                 <Icon name='checkmark-circle-2-outline' width={25} height={25} fill='#FFF' />
//                 <Text style={styles.textPrimary}>{t("applyFor")}</Text>
//               </TouchableOpacity>
//             </View>
//           } 

//       {menu &&
//         <TouchableOpacity onPress={() => setmenu(false)} style={{ width: "100%", height: "100%", position: "absolute", backgroundColor: "rgba(0,0,0,0.2)" }}>
//           <View style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, padding: 10, borderRadius: 8, elevation: 5, width: "50%", position: "absolute", zIndex: 999, top: 70, right: 20, backgroundColor: color_white }}>
//             <TouchableOpacity style={{ height: 30, flexDirection: "row" }} onPress={() => ToEdit()}>
//               <Icon name={Editing ? 'close-circle-outline' : 'edit-outline'} width={20} height={20} fill='#555' />
//               <Text style={{ marginLeft: 5 }}>{t("Edit")}</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={{ height: 30, flexDirection: "row" }} onPress={() => logOut(99)}>
//               <Icon name='power-outline' width={20} height={20} fill='#555' />
//               <Text style={{ marginLeft: 5 }}>{t("SignOff")}</Text>
//             </TouchableOpacity>
//           </View>
//         </TouchableOpacity>
//       }
//     </SafeAreaView>
//   );
// }
