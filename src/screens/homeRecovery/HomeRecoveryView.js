import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Dimensions, TouchableOpacity, Image, ScrollView, View, Text, ActivityIndicator, } from 'react-native';
import { useTranslation } from 'react-i18next'
import { Icon } from 'react-native-eva-icons';

import Head from '../../components/generic/Head';
import Menu from '../../components/generic/Menu';
import MenuVertical from '../../components/generic/MenuVertical.js';

import Rating from '../../components/stars/Rating'
import RatingSimple from '../../components/stars/RatingSimple'
import ScoreStars from '../../components/stars/ScoreStars'
import Pagination from '../../components/filters/Pagination'

import { file_server1 } from '../../../Env'
import { homeRecovery } from '../../services/connection.js'


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
} from '../../styles/Colors.js';



import MenuView from '../additionalServices/sections/Menu'
import SectionGeneral from '../additionalServices/sections/SectionGeneral'
import SectionInfo from '../additionalServices/sections/SectionInfo'
import SectionImages from '../additionalServices/sections/SectionImages'
import SectionOpinions from '../additionalServices/sections/SectionOpinions.js'
import SectionOffers from '../additionalServices/sections/SectionOffers.js'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function HomeRecoveryView(props) {
  const { t, i18n } = useTranslation();
  const [vertical, setvertical] = useState(false);
  const [Load, setLoad] = useState(true);
  const [data, setdata] = useState(props.route.params.data);
  const [sticky, setsticky] = useState(false);
  const [label, setlabel] = useState(1);

  const [labelList, setlabelList] = useState([
    { id: 1, name: "General" },
    { id: 2, name: "Info" },
    { id: 3, name: "Fotos" },
    { id: 4, name: "Opiniones" },
    { id: 5, name: "Ofertas" },
    //{ id: 6, name: "Habitaiones" }
  ]);




  let randomCode
  if (props.route.params) {
    randomCode = props.route.params.randomCode
  } else {
    randomCode = 1
  }

  useEffect(() => {
    Get(props.route.params.data.id)
  }, [randomCode]);



  async function Get(id) {
    setLoad(true);
    const res = await homeRecovery.getHomeRecovery(data.id, i18n.language);
    setdata({ ...data, ...res });
    setLoad(false);
  }

  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }


  console.log("----------", data)

/*

  {
    "adress": "av 47 sur  # 56, Valle maria, San juan bautista",
    "basedOn": 0,
    "category": "",
    "city": "Cali",
    "city_id": "2258", 
    "country": "Colombia",
    "country_id": "COL",
    "created_at": "2021-11-02 14:26:47",
    "description": "ven y relajate, sana tu cuerpo, mente y alma, tenemos la mejor atención, servicios y calidad de latinoamerica",
    "distric": "Valle",
    "id": 1,
    "id_medic": 1,
    "img": "60276416-WHR.png",
    "latitud": "",
    "longitud": "",
    "name": "casa de reposo luna dorada",
    "recommended": 0,
    "stars": 0,
    "status": 0,
    "type": "premium",
    "update_at": "2021-11-02 14:26:47"
    cleaning": null,
    "cleaning_tips": [],
    "images": [
      {"created_at": "2021-11-02 14:45:54", "description": "11212", "id": 33, "id_home": 1, "id_room": 9, "img": "63587647-WHR.png", "status": 1, "update_at": "2021-11-02 14:45:54"},
      {"created_at": "2021-11-02 14:45:54", "description": "2222", "id": 34, "id_home": 1, "id_room": 9, "img": "86439700-WHR.png", "status": 1, "update_at": "2021-11-02 14:45:54"},
      {"created_at": "2021-11-02 14:45:54", "description": null, "id": 35, "id_home": 1, "id_room": 9, "img": "40275522-WHR.png", "status": 1, "update_at": "2021-11-02 14:45:54"}
    ],
    "rating": [],
    "rooms": [{"beds": 0, "capacity": 0, "created_at": "2021-11-02 14:28:38", "description": "habitacion para dos", "id": 1, "id_home": 1, "images": [Array], "img": "", "name": "silver room", "price_per_night": 0, "price_per_night_offer": 0, "services": [Array], "status": 0, "update_at": "2021-11-02 14:28:38"}],
    "services": {
      "allTheServices": [], 
      "mainServices": [], 
      "servicesAndFacilities": []
    },
  }

*/

  return(
    <SafeAreaView style={{ flex: 1, backgroundColor: color_screen }}>
      <StatusBar /* translucent*/ barStyle='dark-content' backgroundColor={"transparent"} />
      <ScrollView
        scrollEventThrottle={16}
        horizontal={false}
        stickyHeaderIndices={[5]}
        onScroll={event => {
          const y = event.nativeEvent.contentOffset.y;
          if (y >= windowWidth / 1.5 + 70) {
            setsticky(true)
          }
          else{
            if (y < windowWidth / 1.5 + 70) {
              setsticky(false)
            }
          }
        }}
      >
        <TouchableOpacity
          onPress={() => setvertical(true)}
          style={{
            position: "absolute",
            top: 15,
            right: 15,
            zIndex: 999,
            backgroundColor: "rgba(255,255,255,0.2)",
            width: 35,
            height: 35,
            borderRadius: 35,
            justifyContent: "center",
            alignItems: "center"
          }}>
          <Icon name="more-vertical-outline" width={30} height={30} fill={color_white} />
        </TouchableOpacity>

        <View style={styles.upperOptionsWrapLeft}>
          <TouchableOpacity style={{ marginVertical: 10 }}>
            <Icon name={"star-outline"} width={25} height={25} fill={color_white} />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginVertical: 10 }}>
            <Icon name={"heart-outline"} width={25} height={25} fill={color_white} />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginVertical: 10 }}>
            <Icon name={"smiling-face-outline"} width={25} height={25} fill={color_white} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => goToScreen("Reservation", data)}
          style={styles.upperBtn}>
          <Text style={styles.upperBtnText}>Reservation</Text>
        </TouchableOpacity>
        <View style={styles.banner}>
          <Image
         
            source={{ 
              
              uri: `${file_server1}/img/wellezy/home_recovery/${data.img}`}}
            style={styles.img} />
        </View>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>{data.name}</Text>
        </View>
        <MenuView data={labelList} set={setlabel} value={label} />
        {Load && <ActivityIndicator size={40} color={color_fifth} />}
        {Load === false && label === 1 && <SectionGeneral  data={data} setlabel={setlabel} />}
        {Load === false && label === 2 && <SectionInfo     data={data} setlabel={setlabel} />}
        {Load === false && label === 3 && <SectionImages   data={data} setlabel={setlabel} />}
        {Load === false && label === 4 && <SectionOpinions data={data} setlabel={setlabel} />}
        {/* 
       
       
        {Load === false && label === 5 && <SectionOffers   data={data} setlabel={setlabel} goToScreen={goToScreen}/>} */}
        <View style={{ height: 100 }}></View>
      </ScrollView> 
      <Menu props={props} option={7} />
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
const styles = StyleSheet.create({
  upperOptionsWrapLeft: {
    padding: 15,
    position: "absolute",
    zIndex: 9999,
    flexDirection: "column"
  },
  upperBtn: {
    position: "absolute",
    zIndex: 999,
    top: windowWidth / 1.5 - 50,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color_fifth,
    borderColor: color_white,
    borderWidth: 1,
    borderRadius: 5,
    width: windowWidth / 3,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  upperBtnText: {
    marginLeft: 5,
    color: color_white,
    fontWeight: "bold",
    fontSize: 14
  },
  banner: {
    backgroundColor: color_grey_light,
    width: windowWidth,
    alignSelf: "center",
    height: windowWidth / 1.5,
    overflow: "hidden",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  img: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: "cover"
  },
  titleWrap: {
    backgroundColor: color_white,
    height: 80,
    justifyContent: "flex-end",
    marginTop: -25,
    zIndex: -1,
  },
  title: {
    lineHeight: 50,
    textAlign: "center",
    fontSize: 24,
    width: "100%",
    fontWeight: "bold",
    color: color_primary,
    textTransform: "capitalize"
  },
});
export default HomeRecoveryView;

// // import { Offer, zfill, currencyFormat } from '../../../components/Logic.js';
// // import Head from '../../../components/generic/Head';
// // import Menu from '../../../components/generic/Menu';
// // import MenuVertical from '../../../components/generic/MenuVertical.js';
// // import { file_server1 } from '../../../../Env'
// // import Rating from '../../../components/stars/Rating'
// // import RatingSimple from '../../../components/stars/RatingSimple'
// // import ScoreStars from '../../../components/stars/ScoreStars'
// // import { showLocation } from 'react-native-map-link';

//
//   const { t, i18n } = useTranslation();
//   const [vertical, setvertical] = useState(false);
//   const [Load, setLoad] = useState(true);
//   const [data, setdata] = useState(props.route.params.data);
//   const [rooms, setrooms] = useState([]);

//   let randomCode
//   if (props.route.params) {
//     randomCode = props.route.params.randomCode
//   } else {
//     randomCode = 1
//   }

//   useEffect(() => {
//     GetRooms(props.route.params.data.id)
//   }, [randomCode]);

//   async function GetRooms(id) {
//     setLoad(true);
//     const res = await homeRecovery.room(id, i18n.language)
//     setrooms(res)
//     setLoad(false);
//   }

//   function goToScreen(screen, data) {
//     props.navigation.navigate(screen, { randomCode: Math.random(), data })
//   }

//   /*
//     {
//       "description": "ven y relajate, sana tu cuerpo, mente y alma, tenemos la mejor atención, servicios y calidad de latinoamerica",
//       "name": "casa de reposo luna dorada"
//     }
//     res rooms [{"created_at": "2021-11-02 14:28:38", "description": "habitacion para dos", "id": 1, "id_doctor": 1, "id_home": 1, "imagenes": [], "name": "silver room", "services": [[Object], [Object], [Object], [Object]], "status": 0, "update_at": "2021-11-02 14:28:38"}]
//  */

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: color_screen }}>
//       <StatusBar backgroundColor={color_white} />

//       <Head props={props} return=""
//         show={vertical}
//         action={setvertical}
//       />
//       <ScrollView
//         scrollEventThrottle={16}
//       //stickyHeaderIndices={[4]}
//       >
//         <Image
//           source={{ uri: `${file_server1}/img/wellezy/home_recovery/${data.banner}` }}
//           style={{ width: "100%", height: 250, resizeMode: "cover", backgroundColor: "silver" }}
//         />
//         <Text style={{ fontSize: 26, textTransform: "uppercase", fontWeight: "bold", color: "black" }}>
//           {data.name}
//         </Text>

//         <Text style={{ fontSize: 14, textTransform: "uppercase", fontWeight: "bold", color: color_primary }}>
//           {props.route.params.data.category}
//         </Text>
//         <Text>{data.description}</Text>
//         <Text>{data.country}</Text>
//         <Text>{data.distrito}</Text>
//         <Text>{data.adress}</Text>



//         {!Load && rooms.length !== 0 &&
//           <View>
//             <Text style={{ width: "100%", marginBottom: 5, marginTop: 20, marginLeft: 20 }}>Rooms</Text>
//             <View>
//               {rooms.map((i, key) => {
//                 return (
//                   <Rooms key={key} data={i} />
//                 )
//               })
//               }
//             </View>
//           </View>
//         }




//         <View style={{ height: 60 }}></View>
//       </ScrollView>
//       <Menu props={props} option={3} />
//       {vertical === true &&
//         <MenuVertical
//           width={280}
//           show={vertical}
//           action={setvertical}
//           goToScreen={goToScreen}
//         />
//       }
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   galeryWrap: {
//     width: 110,
//     height: 110,
//     margin: 2,
//     borderRadius: 8,
//     overflow: "hidden"
//   },
//   galeryImg: {
//     width: null,
//     height: null,
//     resizeMode: "cover",
//     flex: 1
//   },

//   //   bannerImage: {},
//   //   modalWrap: {
//   //     alignItems: "center",
//   //     alignContent: "center",
//   //     justifyContent: "center",
//   //     backgroundColor: "rgba(0,0,0,0.8)",
//   //     width: "100%",
//   //     height: "100%",
//   //     position: "absolute",
//   //     zIndex: 9999
//   //   },
//   //   modalIcon: {
//   //     position: "absolute",
//   //     right: 10,
//   //     top: 20,
//   //     zIndex: 99999
//   //   },
//   //   modalImg: {}
// });

// 


// const Rooms = (props) => {

//   const imagenes = [1, 2, 3, 4, 5]

//   return (
//     <View>
//       <Text>{props.data.name}</Text>
//       <Text>{props.data.description}</Text>

//       <View>
//         <Text>imagenes</Text>
//         <View>
//           {// props.data.imagenes.map((i, key) => {
//             imagenes.map((i, key) => {
//               return (
//                 <View>
//                   <Text>...</Text>
//                 </View>
//               )
//             })}
//         </View>
//       </View>


//       <View>
//         <Text>servicios</Text>
//         <View>
//           {props.data.services.map((i, key) => {
//             return (
//               <View style={{
//               }}>
//                 <Text>{i.name}</Text>
//                 <Text>{i.description}</Text>
//               </View>
//             )
//           })}
//         </View>
//       </View>

//     </View>
//   )
// }








// {/* 
//         <Text style={{ width: "100%", marginBottom: 5, marginTop: 20, marginLeft: 20 }}>Galeria de imagenes</Text>
//         <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
//           <TouchableOpacity style={styles.galeryWrap} onPress={() => showScreen(props.route.params.data.img)}>
//             <Image style={styles.galeryImg} source={{ uri: `${file_server1}/img/wellezy/home_recovery/${data.banner}` }} />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.galeryWrap} onPress={() => showScreen(`${file_server1}/img/wellezy/home_recovery/${data.banner}`)}>
//             <Image style={styles.galeryImg} source={{ uri: `${file_server1}/img/wellezy/home_recovery/${data.banner}` }} />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.galeryWrap} onPress={() => showScreen(`${file_server1}/img/wellezy/home_recovery/${data.banner}`)}>
//             <Image style={styles.galeryImg} source={{ uri: `${file_server1}/img/wellezy/home_recovery/${data.banner}` }} />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.galeryWrap} onPress={() => showScreen(`${file_server1}/img/wellezy/home_recovery/${data.banner}`)}>
//             <Image style={styles.galeryImg} source={{ uri: `${file_server1}/img/wellezy/home_recovery/${data.banner}` }} />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.galeryWrap} onPress={() => showScreen(`${file_server1}/img/wellezy/home_recovery/${data.banner}`)}>
//             <Image style={styles.galeryImg} source={{ uri: `${file_server1}/img/wellezy/home_recovery/${data.banner}` }} />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.galeryWrap} onPress={() => showScreen(`${file_server1}/img/wellezy/home_recovery/${data.banner}`)}>
//             <Image style={styles.galeryImg} source={{ uri: `${file_server1}/img/wellezy/home_recovery/${data.banner}` }} />
//           </TouchableOpacity>
//         </ScrollView> */}




// {/*
//       <View style={{
//         marginTop: -30,
//         backgroundColor: color_white,
//         borderTopLeftRadius: 20,
//         borderTopRightRadius: 20,
//         width: "100%",
//         padding: 10,
//         alignContent: "center",
//         alignItems: "center",
//         justifyContent: "center",
//         flexDirection: "column",
//       }}>
      

      
//       </View>
//       <View style={{ backgroundColor: color_white, paddingHorizontal: 10, paddingBottom:20}}>
//         <View style={{ flexDirection: "column", width: "100%", marginBottom: 10, paddingHorizontal: 10 }}>
//           <Text style={{ width: "100%", textAlign: "justify" }}>
//             {
//               displayDescription === false ?
//                 ((props.route.params.data.description).length > 115) ? (((props.route.params.data.description).substring(0, 115 - 3)) + '...') : props.route.params.data.description
//                 :
//                 props.route.params.data.description
//             }
//           </Text>
//           <TouchableOpacity onPress={() => setdisplayDescription(!displayDescription)} style={{ paddingHorizontal: 10, paddingVertical: 4, flexDirection: "row", alignSelf: "flex-end" }}>
//             <Icon name={displayDescription === true ? 'arrow-ios-upward-outline' : 'arrow-ios-downward-outline'} fill={colorEpsilon} width={20} height={20} />
//             <Text style={{ color: colorEpsilon }}> {
//               displayDescription === true ? "ver menos" : "ver mas"
//             }
//             </Text>
//           </TouchableOpacity>
//         </View>
//         <View style={{ flexDirection: "row", width: "100%", marginTop: 5 }}>
//           <View style={{ width: "10%", alignContent: "center", alignItems: "center", }}>
//             <Icon name='pin' fill={colorAlfa} width={25} height={25} />
//           </View>
//           <Text style={{ lineHeight: 25, width: "30%", }}>direccion</Text>
//           <Text style={{ lineHeight: 15, width: "60%", }}>
//             {props.route.params.data.adress}, {props.route.params.data.city}.
//           </Text>
//         </View>
//         <View style={{ flexDirection: "row", width: "100%", marginTop: 5 }}>
//           <View style={{ width: "10%", alignContent: "center", alignItems: "center", }}>
//           </View>
//           <Text style={{ lineHeight: 25, width: "30%", }}></Text>
//           <Text style={{ lineHeight: 15, width: "60%", }}>
//             {props.route.params.data.departament}. {props.route.params.data.country}.
//           </Text>
//         </View>
//         <TouchableOpacity
//           onPress={() => GotoMaps(props.route.params.data.latitud, props.route.params.data.longitud)}
//           style={{
//             marginTop: 20,
//             alignSelf: "center",
//             backgroundColor: colorBetta,
//             paddingVertical: 10,
//             paddingHorizontal: 30,
//             borderRadius: 12
//           }}>
//           <Text style={{ color: "white", fontWeight: "bold" }}>Cómo llegar</Text>
//         </TouchableOpacity>
//       </View>

//       {!Load &&
//         <View style={{
//           position: "relative",
//           zIndex: 2,
//           backgroundColor: color_white,
//           paddingBottom: 10,
//           //paddingTop: 30,
//           // borderBottomColor: colorAlfa,
//           // borderBottomWidth: 1,
//           flexDirection: "column"
//         }}>
//           {/* <Text style={{ color: colorAlfa, fontWeight: "bold", fontSize: 16, textAlign: "center" }}>ROOMS LIST</Text> }
//           <View style={{ alignSelf: "center", width: "90%", justifyContent: "space-around", alignItems: "center", flexDirection: "row", marginBottom: 1, borderBottomColor: "silver", borderBottomWidth: 1 }}>
//             <TextInput
//               value={Search}
//               placeholder="Buscar..."
//               placeholderTextColor="#ccc"
//               style={{ color: "#777", width: "85%", left: 15, fontSize: 20 }}
//               onChangeText={text => onChangeText(text)}
//             />
//             <Icon name='search-outline' fill="#ccc" width={30} height={30} />
//           </View>

//         </View>
//       }

//     {Load === true ?
//         <View style={{ marginTop: "10%" }}>
//           <ActivityIndicator color={colorAlfa} size={30} />
//         </View>
//         :
//         print()
//       } 
//       {/*
       
//          {
//            !reserving &&
//            <TouchableOpacity onPress={() => setreserving(!reserving)} style={{ marginTop: 20, width: "70%", backgroundColor: colorAlfa, borderRadius: 15, paddingVertical: 10, paddingHorizontal: 20, flexDirection: "row", justifyContent: "center" }}>
//              <Icon name='calendar-outline' fill={color_white} width={20} height={20} />
//              <Text style={{ textAlign: "center", marginLeft: 5, color: "white", fontWeight: "bold", textTransform: "uppercase" }}>reservar</Text>
//            </TouchableOpacity>
//          }
//          {/* {reserving && <HotelsReserva />} *
//          *}
//      </ScrollView>
//      <Menu props={props} option={7} />
//      {/* 
//      <Modal
//        animationType="slide"
//        transparent={true}
//        visible={fullScreen}
//      >
//        <View style={styles.modalWrap}>
//          <TouchableOpacity onPress={() => setfullScreen(false)} style={styles.modalIcon}>
//            <Icon name='close-circle-outline' fill={color_white} width={30} height={30} />
//          </TouchableOpacity>
//          <View style={{ width: "100%", resizeMode: "contain" }}>
//            <Image style={{ height: "100%", width: "100%", resizeMode: "contain" }} source={{ uri: fullScreenImg }} />
//          </View>
//        </View>
//      </Modal>
// */}
