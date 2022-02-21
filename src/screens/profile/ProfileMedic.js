
import React, { useState, useContext, useEffect } from 'react'
import { Image, SafeAreaView, ScrollView, Text, View, TouchableOpacity, Dimensions, StatusBar, ActivityIndicator, StyleSheet, ListViewBase } from 'react-native'
import UserContext from '../../../contexts/UserContext'
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
} from '../../styles/Colors'
import { useTranslation } from 'react-i18next';
import { Icon } from 'react-native-eva-icons';
import LinearGradient from 'react-native-linear-gradient';
import MenuVertical from '../../components/generic/MenuVertical.js';
import { file_server1 } from '../../../Env'





import MyServices from '../../components/profile/med/MyServices.js'



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const fixed = (Dimensions.get('window').width / 2) - 50;

function ProfileMedic(props) {
  const { t, i18n } = useTranslation();
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [vertical, setvertical] = useState(false);
  const [Page, setPage] = useState(1);
  const [headColor, setheadColor] = useState(color_primary);
  const ListProfile = [
    { value: 1, status: 1, icon: 'person-outline' },
    { value: 2, status: 1, icon: 'activity'/*'message-circle-outline'*/ },
    { value: 3, status: 1, icon: 'folder-add-outline' },
    { value: 4, status: 1, icon: 'bell-outline' },
    { value: 5, status: 1, icon: 'settings-outline' },
  ];



  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = 1 }

  //console.log("userDetails: ", userDetails)
  /*
   {
     "city": "Medellín",
     "country": "COLombia",
     "email": "maxuel@gmail.com",
     "id": "1",
     "id_user": 43,
     "language": "ru",
     "mensagge": "Ha iniciado sesion exitosamente",
     "name": "daniel andres",
     "photo_profile": "IMG-20210118-WA0056.jpg",
     "rol": "client",
     "surname": "correa posada",
     "telefono": "3124348384"}
  */





  function sticker(y) {
    // console.log("fixed", fixed)
    // console.log("y", y)
    if (y >= 310) { setheadColor(color_fifth) }
    else {
      if (y < 310) {
        setheadColor(color_primary)
      }
    }
  }




  function goToScreen(screen, data) {
console.log("douglas matos")
props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }





  {/*
<Text>{userDetails.city}</Text>
<Text>{userDetails.country}</Text>
<Text>{userDetails.email}</Text>
<Text>{userDetails.id}</Text>
<Text>{userDetails.id_user}</Text>
<Text>{userDetails.language}</Text>
<Text>{userDetails.mensagge}</Text>
<Text>{userDetails.rol}</Text>
<Text>{userDetails.photo_profile}</Text>
<Text>{userDetails.telefono}</Text>
*/}

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color_screen }}>
      <StatusBar backgroundColor={color_fifth} barStyle='light-content' />
      <View style={{ paddingBottom: 60 }}>
        
        <ScrollView
        scrollEventThrottle={16}
        stickyHeaderIndices={[1]}
          onScroll={event => {
            const y = event.nativeEvent.contentOffset.y;
            sticker(y)
          }}>

          <LinearGradient
            colors={[color_fifth, color_fifth, color_fifth, color_primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{ width: windowWidth, height: windowWidth - 100, justifyContent: "center", alignItems: "center" }}
          >
            <TouchableOpacity onPress={() => setvertical(true)}
              style={{ position: "absolute", top: 20, right: 20 }}>
              <Icon name='more-vertical' fill={color_white} width={30} height={30} />
            </TouchableOpacity>
            <View style={{
              width: fixed,
              height: fixed,
              borderRadius: fixed,
              borderWidth: 2,
              borderColor: "white",
              overflow: "hidden"
            }}>
              <Image source={{ uri: `${file_server1}/img/wellezy/users/${userDetails.photo_profile}` }} style={{ flex: 1, resizeMode: "cover" }} />
            </View>
            <Text style={{ marginTop: 10, color: color_white, fontSize: 18, fontWeight: "bold", textTransform: "capitalize" }}>{userDetails.surname} {userDetails.name}</Text>
            <View style={{ flexDirection: "row" }}>
              <Icon name='email-outline' fill={color_white} width={18} height={18} />
              <Text style={{ lineHeight: 17, marginLeft: 10, color: color_white, fontSize: 14 }}>{userDetails.email}</Text>
            </View>
          </LinearGradient>




          <View style={[{elevation: 6, flexDirection: "row", width: "100%", padding: 5, backgroundColor: headColor }]}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {ListProfile.map((i, key) => {
                return (
                  <TouchableOpacity key={key} onPress={() => setPage(i.value)}
                    style={{ width: windowWidth / ListProfile.length, height: 35, borderBottomColor: Page === i.value ? color_white : '', borderBottomWidth: Page === i.value ? 1 : 0, alignItems: "center", }}>
                    <Icon name={i.icon} height={25} width={25} fill={Page === i.value ? color_white : 'rgba(255,255,255,0.3)'} />
                  </TouchableOpacity>
                )
              })}
            </ScrollView>
          </View>






          
          
          {/*
          {Page === 1 && <User data={data} />}
          {Page === 2 && <Statistics data={data} Load={Load} />}
          */}
          {Page === 3 && <MyServices /*data={data}*/ /*Load={Load}*/ userDetails={userDetails} goToScreen={goToScreen} />}
          {/*
          {Page === 5 && <Setting data={data} Load={Load} />}          
          */}

        </ScrollView>
      </View>



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
export default ProfileMedic;






// import { doctors } from '../../services/connection'
// import Setting from '../../components/profileSettings/Setting.js'
// import MyServices from '../../components/profileMyServices/MyServices.js'
// import Statistics from '../../components/profileStatistics/Statistics.js'

// function Profile(props) {

//   const [data, setdata] = useState(null);
//   const [Load, setLoad] = useState(true);
//   



//   useEffect(() => {
//     Get()
//   }, [randomCode]);

//   async function Get() {
//     let res = await doctors.thisDoctor(userDetails.id, i18n.language)
//     setdata(res)
//   }

//   useEffect(() => {
//     if (data !== null) (
//       setLoad(false)
//     )
//   }, [data]);




// const styles = StyleSheet.create({
//   head: {
//     paddingVertical: 20,
//     alignContent: "center",
//     alignItems: "center",
//     width: "100%",
//     backgroundColor: color_white,
//     flexDirection: "column",
//     overflow: "hidden",
//     borderBottomLeftRadius: 100,
//     borderBottomRightRadius: 100
//   },
//   headleft: {
//     width: "50%",
//     justifyContent: "center",
//     alignItems: "center",
//     alignContent: "center",
//   },
//   wrapImg: {
//     height: 100,
//     width: 100,
//     borderRadius: 50,
//     margin: 20,
//     flex: 1,
//     overflow: "hidden",
//     borderWidth: 2,
//     borderColor: "#f1f1f1",
//   },
//   img: {
//     height: null,
//     width: null,
//     resizeMode: "cover",
//     flex: 1
//   },
//   initials: {
//     textTransform: "uppercase",
//     fontSize: 50,
//     textAlign: "center",
//     lineHeight: 100,
//     fontWeight: "bold"
//   },
//   info: {
//     justifyContent: "center",
//     marginTop: -10,
//     alignItems: "center",
//     alignContent: "center",
//     width: "100%"
//   },
//   name: {
//     textAlign: "center",
//     width: "100%",
//     color: "#000",
//     fontWeight: "bold",
//     fontSize: 16,
//     textTransform: "capitalize"
//   },
//   name2: {
//     textAlign: "center",
//     width: "100%",
//     color: "#000",
//     fontSize: 12,
//     top: 5
//   },
//   menu: {

//     flexDirection: "row",
//     width: "100%",
//     padding: 5,
//   },
// });
// export default Profile;