import React, { useState, useEffect } from 'react'
import { StyleSheet, Modal, TextInput, SafeAreaView, StatusBar, Dimensions, TouchableOpacity, Image, ScrollView, View, Text, ActivityIndicator, ImageBackground, } from 'react-native'
import { useTranslation } from 'react-i18next'
import { showLocation } from 'react-native-map-link'
import { Icon } from 'react-native-eva-icons'

import Head from '../../components/generic/Head'
import Menu from '../../components/generic/Menu'
import MenuVertical from '../../components/generic/MenuVertical.js'

import Rating from '../../components/stars/Rating'
import RatingSimple from '../../components/stars/RatingSimple'
import ScoreStars from '../../components/stars/ScoreStars'
import Pagination from '../../components/filters/Pagination'

import { file_server1 } from '../../../Env'
import { hotels, nurses, specials } from '../../services/connection.js'

import {
  extractDate,
  InitialsName,
  Offer,
  Name,
  GetDiference2,
  GetDiference,
  zfill,
  currencyFormat,
  globalStatusValoration,
  letterCounter
} from '../../components/Logic.js'

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


import MenuView from '../additionalServices/sections/Menu'
import SectionGeneral from '../additionalServices/sections/SectionGeneral'
import SectionInfo from '../additionalServices/sections/SectionInfo'
import SectionImages from '../additionalServices/sections/SectionImages'
import SectionOpinions from '../additionalServices/sections/SectionOpinions.js'
import SectionOffers from '../additionalServices/sections/SectionOffers.js'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function NurseView(props) {
  const { t, i18n } = useTranslation();
  const { navigation } = props
  const [data, setdata] = useState(props.route.params.data);
  const [Load, setLoad] = useState(false);
  const [vertical, setvertical] = useState(false);

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
    setLoad(true);
    Get();
  }, [randomCode]);

  async function Get() {
    const res = await nurses.getThisNurse(props.route.params.data.id, i18n.language);
    setdata(res);
    setLoad(false);
  }


  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }



  console.log("----------------------", props.route.params.data)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color_screen }}>
      <StatusBar /* translucent*/ barStyle='dark-content' backgroundColor={"transparent"} />
      
      <ScrollView
        scrollEventThrottle={16}
        horizontal={false}
        stickyHeaderIndices={[5]}
      // onScroll={event => {
      //   const y = event.nativeEvent.contentOffset.y;
      //   if (y >= windowWidth / 1.5 + 70) {
      //     setsticky(true)
      //   }
      //   else{
      //     if (y < windowWidth / 1.5 + 70) {
      //       setsticky(false)
      //     }
      //   }
      // }}
      >

        <TouchableOpacity onPress={() => setvertical(true)}
          style={{ position: "absolute", top: 15, right: 15, zIndex: 999, backgroundColor: "rgba(255,255,255,0.2)", width: 35, height: 35, borderRadius: 35, justifyContent: "center", alignItems: "center" }}>
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

        <TouchableOpacity onPress={() => goToScreen("Reservation", data)}
          style={styles.upperBtn}>
          <Text style={styles.upperBtnText}>Reservation</Text>
        </TouchableOpacity>

        <View style={styles.banner}>
          <Image
            //source={{ uri: data.img }}
            source={{ uri: `${file_server1}/img/wellezy/nurses/${props.route.params.data.img}` }}
            style={styles.img} />
        </View>

        <View style={styles.titleWrap}>
          <Text style={styles.title}>{data.name}</Text>
        </View>

        <MenuView data={labelList} set={setlabel} value={label} />
        {Load && <ActivityIndicator size={40} color={color_fifth} />}
        {/*
          {Load === false && label === 1 && <SectionGeneral  data={data} setlabel={setlabel} />}
          {Load === false && label === 2 && <SectionInfo     data={data} setlabel={setlabel} />}
          {Load === false && label === 3 && <SectionImages   data={data} setlabel={setlabel} />}
          {Load === false && label === 4 && <SectionOpinions data={data} setlabel={setlabel} />}
          {Load === false && label === 5 && <SectionOffers   data={data} setlabel={setlabel} goToScreen={goToScreen}/>}
        */}
        <View style={{ height: 80 }}></View>
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


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color_screen }}>
      <StatusBar /* translucent*/ barStyle='dark-content' backgroundColor={"transparent"} />

      <ScrollView
        scrollEventThrottle={16}
        horizontal={false}
        //stickyHeaderIndices={[2, 4]}
        onScroll={event => {
          const y = event.nativeEvent.contentOffset.y;
          //(y)
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
        <View
          style={{
            padding: 15,
            position: "absolute",
            zIndex: 9999,
            flexDirection: "column"
          }}
        >
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
          style={{
            position: "absolute",
            zIndex: 999,
            flexDirection: "row",
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
          }}>
          <Text style={{ marginLeft: 5, color: color_white, fontWeight: "bold", fontSize: 14 }}>Add</Text>
        </TouchableOpacity>



        <View
          style={{
            zIndex: 99,
            backgroundColor: "blue",
            width: windowWidth,
            alignSelf: "center",
            height: windowWidth / 1.5,
            overflow: "hidden",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}>
          <Image
            source={{ uri: `${file_server1}/img/wellezy/nurses/${props.route.params.data.img}` }}
            style={{ width: null, height: null, flex: 1, resizeMode: "cover" }}
          />
        </View>



        <Text
          style={{
            lineHeight: 50,
            textAlign: "center",
            fontSize: 20,
            width: "100%",
            fontWeight: "bold",
            color: color_primary,
            textTransform: "capitalize"
          }}
        >{props.route.params.data.title}. {props.route.params.data.surname} {props.route.params.data.name}
        </Text>






























        {/* <LinearGradient colors={[color_secondary, color_primary]} style={{
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
}}>
  </LinearGradient> */}
        <View>

        </View>

        <View style={{
          marginTop: -90,
          paddingTop: 90,
          paddingBottom: 20,
          zIndex: -1,
          backgroundColor: color_white,
          paddingHorizontal: 20,
          marginBottom: 20
        }}>
          <Text>{props.route.params.data.adress}</Text>
          <Text>{props.route.params.data.age}</Text>
          <Text>{props.route.params.data.basedOn}</Text>
          <Text>{props.route.params.data.city}</Text>
          <Text>{props.route.params.data.city_id}</Text>
          <Text>{props.route.params.data.country}</Text>
          <Text>{props.route.params.data.country_id}</Text>
          <Text>{props.route.params.data.departament}</Text>
          <Text>{props.route.params.data.description}</Text>
          <Text>{props.route.params.data.gender}</Text>
          <Text>{props.route.params.data.id}</Text>
          <Text>{props.route.params.data.rating}</Text>
          <Text>{props.route.params.data.recommended}</Text>
          <Text>{props.route.params.data.stars}</Text>
          <Text>{props.route.params.data.type}</Text>
        </View>

        <View style={{
          height: 40,
          width: windowWidth,
          alignSelf: "center",
          backgroundColor: color_screen,
          marginVertical: 5,
          flexDirection: "row",
          overflow: "hidden",
          justifyContent: "space-between"
        }}>
          <TouchableOpacity><Text>1</Text></TouchableOpacity>
          <TouchableOpacity><Text>2</Text></TouchableOpacity>
          <TouchableOpacity><Text>3</Text></TouchableOpacity>
          <TouchableOpacity><Text>4</Text></TouchableOpacity>
        </View>

        <View style={{ height: 100, width: "90%", alignSelf: "center", backgroundColor: "yellow", marginVertical: 5 }}></View>
        <View style={{ height: 100, width: "90%", alignSelf: "center", backgroundColor: color_white, marginVertical: 5 }}></View>
        <View style={{ height: 100, width: "90%", alignSelf: "center", backgroundColor: "red", marginVertical: 5 }}></View>
        <View style={{ height: 100, width: "90%", alignSelf: "center", backgroundColor: color_white, marginVertical: 5 }}></View>
        <View style={{ height: 100, width: "90%", alignSelf: "center", backgroundColor: color_white, marginVertical: 5 }}></View>
        <View style={{ height: 100, width: "90%", alignSelf: "center", backgroundColor: "red", marginVertical: 5 }}></View>
        <View style={{ height: 100, width: "90%", alignSelf: "center", backgroundColor: color_white, marginVertical: 5 }}></View>
        <View style={{ height: 100, width: "90%", alignSelf: "center", backgroundColor: color_white, marginVertical: 5 }}></View>
        <View style={{ height: 100, width: "100%", backgroundColor: "blue", margin: 5 }}></View>

        {/* 
        <Head props={props} return={props.route.params.from} />
        <View style={styles.header}>
          <Image source={{ uri: props.route.params.data.img }} style={styles.avatar} />
        </View>
        <View style={styles.body}>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.title}>Nombres: </Text>
              <Text>{props.route.params.data.name}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.title}>Apellidos: </Text>
              <Text>{props.route.params.data.surname}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.title}>Documento: </Text>
              <Text>C.C. {props.route.params.data.document}</Text>
            </View>
            */}


        {/* <View style={styles.row}>
              <Text style={styles.title}>rating: </Text>
              <Text>{props.route.params.data.rating}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.title}>basedOn: </Text>
              <Text>{props.route.params.data.basedOn}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.title}>stars: </Text>
              <Text>{props.route.params.data.starts}</Text>
            </View>
            */}

        {/* <View style={{ width: "100%", alignContent: "center", alignItems: "center" }}>
              <ScoreStars stars={props.route.params.data.starts} size={35} color={colorAlfa} />
            </View>
          </View>
          */}

        {/*           
          {
            !Load && data !== null &&
            data.vehicles.map((i, key) => {
              return (
                <TouchableOpacity key={key} onPress={() => setvehicle(i)}
                  style={[styles.btn_car, { width: ScreenW / 2 - 30, }]}>
                  <View style={[styles.btn_car_wrap_img, { height: ScreenW / 4 }]}>
                    <Image style={styles.btn_car_img}
                      source={{ uri: i.img[0].img }}
                    />
                  </View>
                  <View style={styles.btn_car_wrap_text}>
                    <Text style={styles.btn_car_text}>{i.modelo}</Text>
                  </View>
                </TouchableOpacity>
              )
            })
          }
          {!
            Load && vehicle !== null &&
            <ViewVehicle data={vehicle} />
          }
        </View>
        <View style={{ height: 300 }}></View>
    */}

        <View style={{ height: 60 }}></View>
      </ScrollView>
      <Menu props={props} option={0} />
      {vertical === true &&
        <MenuVertical
          width={280}
          show={vertical}
          action={setvertical}
          goToScreen={goToScreen}
        />
      }
    </SafeAreaView >
  )
}

// const styles = StyleSheet.create({
//   header: {
//     width: "100%",
//     height: 300,
//     overflow: "hidden",
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20
//   },
//   avatar: {
//     width: null,
//     height: null,
//     flex: 1,
//     resizeMode: "cover"
//   },
//   body: {
//     marginTop: 10,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     alignContent: 'center',
//     alignItems: 'center',
//     justifyContent: 'space-around',
//   },
//   card: {
//     backgroundColor: color_white,
//     width: "90%",
//     marginBottom: 20,
//     padding: 20,
//     borderRadius: 12,
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 15,
//   },
//   btn_car: {
//     marginTop: 20,
//     alignItems: "center",
//     alignContent: "center",
//     shadowColor: "#000",
//     overflow: "hidden",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 15,
//     backgroundColor: color_white,
//     borderRadius: 12,
//   },
//   btn_car_wrap_img: {
//     backgroundColor: "silver",
//     width: "100%",
//     overflow: "hidden"
//   },
//   img: {
//     width: null,
//     height: null,
//     flex: 1,
//     resizeMode: "cover"
//   },
//   btn_car_wrap_text: {
//     paddingVertical: 10
//   },
//   btn_car_text: {
//     fontWeight: "bold",
//     textTransform: "capitalize"
//   },
//   row: {
//     width: "100%",
//     flexDirection: "column",
//     marginBottom: 10
//   },
//   title: {
//     //color: colorAlfa
//   },
//   text: {
//     //color: colorEpsilon
//   }
// });
// function ViewVehicle(props) {
//   const ScreenW = Dimensions.get('window').width
//   const [zoom, setzoom] = useState(null);
//   const [modalVisible, setmodalVisible] = useState(false);
//   const [learn, setlearn] = useState(false);
//   function Zoom(e) {
//     setzoom(e)
//     setmodalVisible(true)
//     // setlearn(true)
//   }
//   return (
//     <View style={styles.card}>
//       <View style={{ width: "100%", flexDirection: "row", borderBottomColor: "silver", borderBottomWidth: 0.5, paddingVertical: 15 }}>
//         <View style={{ width: "50%", alignItems: "center" }}>
//           <Text style={styles.title}>Categoria</Text>
//           <Text style={styles.text}>{props.data.category}</Text>
//         </View>
//         <View style={{ width: "50%", alignItems: "center" }}>
//           <Text style={styles.title}>Modelo</Text>
//           <Text style={styles.text}>{props.data.modelo}</Text>
//         </View>
//       </View>
//       <View style={{ width: "100%", flexDirection: "row", borderBottomColor: "silver", borderBottomWidth: 0.5 }}>
//         <View style={{ width: "50%", alignItems: "center" }}>
//           <Text style={styles.title}>Marca</Text>
//           <Text style={styles.text}>{props.data.brand}</Text>
//         </View>
//         <View style={{ width: "50%", alignItems: "center" }}>
//           <Text style={styles.title}>Placa</Text>
//           <Text style={styles.text}>{props.data.placa}</Text>
//         </View>
//       </View>
//       <View style={{
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         alignContent: 'center',
//         alignItems: 'center',
//         justifyContent: 'space-around',
//       }}>
//         {
//           props.data.img.map((i, key) => {
//             return (
//               <TouchableOpacity key={key} onPress={() => Zoom(i.img)}
//                 style={{ marginVertical: 10, borderRadius: 12, marginHorizontal: 5, height: 80, width: 80, overflow: "hidden" }}>
//                 <View style={{ opacity: 0.8, position: "absolute", zIndex: 999999, top: 25, left: 25 }}>
//                   <Icon name='search-outline' fill="white" width={30} height={30} />
//                 </View>
//                 <Image source={{ uri: i.img }} style={{ height: null, width: null, resizeMode: "cover", flex: 1 }} />
//               </TouchableOpacity>
//             );
//           })
//         }
//         {/* {showzoom &&
//           <View style={{backgroundColor:colorZeta, marginVertical: 20, borderTopColor: "silver", borderTopWidth: 0.5 }}>
//             <TouchableOpacity onPress={() => setshowzoom(false)} style={{ position: "absolute", zIndex: 999, top: 5, right: 10 }}>
//               <Icon name='close-circle-outline' fill='black' width={30} height={30} />
//             </TouchableOpacity>
//             <ImageZoom
//               cropWidth={Dimensions.get('window').width-50}
//               cropHeight={Dimensions.get('window').height - 100}
//               imageWidth={600}
//               imageHeight={400}>
//               <Image
//                 style={{ width: null, height: null, flex: 1, resizeMode: "cover" }}
//                 source={{ uri: zoom }}
//               />
//             </ImageZoom>
//           </View>
//         } */}
//       </View>
//       <View style={{ width: "100%", alignItems: "center", alignContent: "center" }}>
//         <TouchableOpacity style={{ justifyContent: "center", alignContent: "center", alignItems: "center", flexDirection: "row", marginTop: 10, backgroundColor: colorAlfa, width: "60%", padding: 10, borderRadius: 12 }}>
//           <Icon name='close-circle-outline' fill={colorZeta} width={25} height={25} />
//           <Text style={{ textTransform: "capitalize", marginLeft: 10, textAlign: "center", color: colorZeta, fontWeight: "bold" }}>añadir al carrito</Text>
//         </TouchableOpacity>
//       </View>
//       <Modal animationType="slide" transparent={true} visible={modalVisible} >
//         <View style={{ alignContent: "center", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.8)", width: "100%", height: "100%", position: "absolute", zIndex: 999 }}>
//           <TouchableOpacity onPress={() => setlearn(true)} style={{ position: "absolute", zIndex: 999, top: 10, right: 50 }}>
//             <Icon name='question-mark-circle-outline' fill='white' width={30} height={30} />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => setmodalVisible(false)} style={{ position: "absolute", zIndex: 999, top: 10, right: 10 }}>
//             <Icon name='close-circle-outline' fill='white' width={30} height={30} />
//           </TouchableOpacity>
//           <ImageZoom
//             cropWidth={Dimensions.get('window').width}
//             cropHeight={Dimensions.get('window').height - 100}
//             imageWidth={600}
//             imageHeight={400}>
//             <Image
//               style={{ width: null, height: null, flex: 1, resizeMode: "cover" }}
//               source={{ uri: zoom }}
//             />
//           </ImageZoom>
//         </View>
//       </Modal>
//       <Modal animationType="slide" transparent={true} visible={learn} >
//         <View style={{ alignContent: "center", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.8)", width: "100%", height: "100%", position: "absolute", zIndex: 999 }}>
//           <View style={{ backgroundColor: "white", width: 200, padding: 10, borderRadius: 12, position: "absolute", alignContent: "center", alignItems: "center" }}>
//             <View style={{ width: 150, height: 150 }}>
//               <Image source={require("../../../images/icon_drag.png")} style={{ width: null, height: null, flex: 1, resizeMode: "cover" }} />
//             </View>
//             <Text style={{ color: colorBetta, width: "100%", textAlign: "center" }}>
//               arastra la imagen para ver mas detalles.
//             </Text>
//             <TouchableOpacity onPress={() => setlearn(false)} style={{ marginTop: 10, backgroundColor: colorBetta, alignSelf: "center", width: "50%", borderRadius: 8, padding: 5 }}>
//               <Text style={{ color: colorZeta, width: "100%", textAlign: "center", fontWeight: "bold", textTransform: "uppercase" }}>ocultar</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }




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

export default React.memo(NurseView);