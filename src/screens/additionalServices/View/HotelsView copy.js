import React, { useState, useEffect } from 'react'
import { StyleSheet, Modal, TextInput, SafeAreaView, StatusBar, Dimensions, TouchableOpacity, Image, ScrollView, View, Text, ActivityIndicator, ImageBackground, } from 'react-native'
import { useTranslation } from 'react-i18next'
import { showLocation } from 'react-native-map-link'
import { Icon } from 'react-native-eva-icons'

import Head from '../../../components/generic/Head'
import Menu from '../../../components/generic/Menu'
import MenuVertical from '../../../components/generic/MenuVertical.js'

import Rating from '../../../components/stars/Rating'
import RatingSimple from '../../../components/stars/RatingSimple'
import ScoreStars from '../../../components/stars/ScoreStars'
import Pagination from '../../../components/filters/Pagination'

import { file_server1 } from '../../../../Env'
import { hotels, specials  } from '../../../services/connection.js'
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
} from '../../../components/Logic.js'
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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// import HotelsReserva from './HolsReserva';
// import CardRoom from '../../../components/services/CardRoom';

function HotelsView(props) {
  const { t, i18n } = useTranslation();
  const [vertical, setvertical] = useState(false);
  const [Load, setLoad] = useState(true);
  const [data, setdata] = useState(props.route.params.data);
  const [displayDescription, setdisplayDescription] = useState(false);
  const [rooms, setrooms] = useState(false);
  const [search, setsearch] = useState(null);
  const [page, setpage] = useState(1);

  let randomCode
  if (props.route.params) {
    randomCode = props.route.params.randomCode
  } else {
    randomCode = 1
  }

  useEffect(() => {
    Get(props.route.params.data.id)
  }, [randomCode, search]);

  async function Get(id) {
    setLoad(true);
    const res = await hotels.roomsList(data.id, i18n.language, search, page);
    setrooms(res);
    setLoad(false);
  }

    function GotoMaps(lat, lon) {
      showLocation({
        latitude: lat,
        longitude: lon,
        googleForceLatLon: false,
      })
    }

  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color_screen }}>
      <StatusBar /* translucent*/ barStyle='dark-content' backgroundColor={"transparent"} />
      <ScrollView
        scrollEventThrottle={16}
        horizontal={false}
        stickyHeaderIndices={[2, 4]}
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
            position:"absolute",
            zIndex:999,
            top: windowWidth / 1.5 - 50,
            right: 10,
            justifyContent:"center",
            alignItems:"center",
            backgroundColor: color_fifth,
            borderColor: color_white,
            borderWidth: 1,
            borderRadius: 5,
            width:windowWidth/3,
            paddingVertical: 5,
            paddingHorizontal: 10,
          }}
          >
          <Text style={{marginLeft:5, color: color_white, fontWeight:"bold", fontSize:14}}>Add</Text>
        </TouchableOpacity>

        <View
          style={{
            backgroundColor: color_grey_light,
            width: windowWidth,
            alignSelf: "center",
            height: windowWidth / 1.5,
            overflow: "hidden",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        >
          <Image
            source={{ uri: data.img}}
            style={{ width: null, height: null, flex: 1, resizeMode: "cover" }} />
        </View>







<Text style={{color:"red"}}>trt</Text>

{/* 
        <Text
            style={{
              // lineHeight: 50,
              // textAlign: "center",
              // fontSize: 20,
              // width: "100%",
              // fontWeight: "bold",
              color: color_primary,
              // textTransform: "capitalize"
            }}
          >
            {data.name}
          </Text> */}












        <Text style={{ width: "100%", textAlign: "justify" }}>
          {
            displayDescription === false ?
              ((data.description).length > 115) ? (((data.description).substring(0, 115 - 3)) + '...') : data.description
              :
              data.description
          }
        </Text>
        <TouchableOpacity onPress={() => setdisplayDescription(!displayDescription)}
        style={{
          paddingHorizontal: 10,
          paddingVertical: 4,
          flexDirection: "row",
          alignSelf: "flex-end" }}>
          <Icon name={displayDescription === true ? 'arrow-ios-upward-outline' : 'arrow-ios-downward-outline'} fill={color_grey_half} width={20} height={20} />
          <Text style={{ color: color_grey_half }}> {
            displayDescription === true ? "ver menos" : "ver mas"
          }
          </Text>
        </TouchableOpacity>









        {/* <Text>{data.adress}</Text>
        <Text>{data.basedOn}</Text>
        <Text>{data.category}</Text>
        <Text>{data.city}</Text>
        <Text>{data.city_id}</Text>
        <Text>{data.country}</Text>
        <Text>{data.country_id}</Text>
        <Text>{data.created_at}</Text>
        <Text>{data.departament}</Text>
        <Text>{data.id}</Text>
        <Text>{data.rating}</Text>
        <Text>{data.recommended}</Text>
        <Text>{data.stars}</Text>
        <Text>{data.type}</Text>
        <Text>{data.updated_at}</Text>
         */}

{/* 
        {Load && <ActivityIndicator color={color_primary} size={40} />}

        {!Load && rooms!== false && rooms.data.length !== 0 && rooms.data.map((i,key)=>{
          return(
            <View style={{backgroundColor:"red"}}>
              <Text>....</Text>
            </View>
          )
        })
        }

        {!Load && rooms!== false && rooms.data.length === 0 && 
          <View style={{backgroundColor:"red"}}>
            <Text>vacio</Text>
          </View>
        } */}


{/* 
        {"current_page": 1, "data": [],
        "first_page_url": "https://pdtclientsolutions.com/wellezy/api/v2/wellezy/service/hotels/room/2/en/null?page=1",
        "from": null,
        "last_page": 1,
        "last_page_url": "https://pdtclientsolutions.com/wellezy/api/v2/wellezy/service/hotels/room/2/en/null?page=1",
        "next_page_url": null,
        "path": "https://pdtclientsolutions.com/wellezy/api/v2/wellezy/service/hotels/room/2/en/null",
        "per_page": 10,
        "prev_page_url": null,
        "to": null,
        "total": 0} */}





{/* 
<TouchableOpacity onPress={()=>

GotoMaps(data.latitud, data.longitud)}>
<Text>¿Cómo llegar?</Text>

</TouchableOpacity> */}

        {/*
    


    <View style={{
      marginTop: -30,
      backgroundColor: color_white,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      width: "100%",
      padding: 10,
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    }}>
      <Text style={{ fontSize: 26, textTransform: "uppercase", fontWeight: "bold", color: "black" }}>
        {props.route.params.data.name}
      </Text>
      <Text style={{ fontSize: 14, textTransform: "uppercase", fontWeight: "bold", color: colorAlfa }}>
        {props.route.params.data.category}
      </Text>
    </View>


    <View style={{ backgroundColor: color_white, paddingHorizontal: 10, paddingBottom:20}}>
      <View style={{ flexDirection: "column", width: "100%", marginBottom: 10, paddingHorizontal: 10 }}>
       
       
      </View>
      <View style={{ flexDirection: "row", width: "100%", marginTop: 5 }}>
        <View style={{ width: "10%", alignContent: "center", alignItems: "center", }}>
          <Icon name='pin' fill={colorAlfa} width={25} height={25} />
        </View>
        <Text style={{ lineHeight: 25, width: "30%", }}>direccion</Text>
        <Text style={{ lineHeight: 15, width: "60%", }}>
          {props.route.params.data.adress}, {props.route.params.data.city}.
        </Text>
      </View>
      <View style={{ flexDirection: "row", width: "100%", marginTop: 5 }}>
        <View style={{ width: "10%", alignContent: "center", alignItems: "center", }}>
        </View>
        <Text style={{ lineHeight: 25, width: "30%", }}></Text>
        <Text style={{ lineHeight: 15, width: "60%", }}>
          {props.route.params.data.departament}. {props.route.params.data.country}.
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => GotoMaps(props.route.params.data.latitud, props.route.params.data.longitud)}
        style={{
          marginTop: 20,
          alignSelf: "center",
          backgroundColor: colorBetta,
          paddingVertical: 10,
          paddingHorizontal: 30,
          borderRadius: 12
        }}>
        <Text style={{ color: "white", fontWeight: "bold" }}>Cómo llegar</Text>
      </TouchableOpacity>
    </View>

    {!Load &&
      <View style={{
        position: "relative",
        zIndex: 2,
        backgroundColor: color_white,
        paddingBottom: 10,
        //paddingTop: 30,
        // borderBottomColor: colorAlfa,
        // borderBottomWidth: 1,
        flexDirection: "column"
      }}>
        {/* <Text style={{ color: colorAlfa, fontWeight: "bold", fontSize: 16, textAlign: "center" }}>ROOMS LIST</Text> }
        <View style={{ alignSelf: "center", width: "90%", justifyContent: "space-around", alignItems: "center", flexDirection: "row", marginBottom: 1, borderBottomColor: "silver", borderBottomWidth: 1 }}>
          <TextInput
            value={Search}
            placeholder="Buscar..."
            placeholderTextColor="#ccc"
            style={{ color: "#777", width: "85%", left: 15, fontSize: 20 }}
            onChangeText={text => onChangeText(text)}
          />
          <Icon name='search-outline' fill="#ccc" width={30} height={30} />
        </View>

      </View>
    }

  {Load === true ?
      <View style={{ marginTop: "10%" }}>
        <ActivityIndicator color={colorAlfa} size={30} />
      </View>
      :
      print()
    } 



    {/*
      <Text style={{ width: "100%", marginBottom: 5, marginTop: 20, marginLeft: 20 }}>Galeria de imagenes</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={styles.galeryWrap} onPress={() => showScreen(props.route.params.data.img)}>
          <Image style={styles.galeryImg} source={{ uri: props.route.params.data.img }} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.galeryWrap} onPress={() => showScreen(props.route.params.data.img)}>
          <Image style={styles.galeryImg} source={{ uri: props.route.params.data.img }} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.galeryWrap} onPress={() => showScreen(props.route.params.data.img)}>
          <Image style={styles.galeryImg} source={{ uri: props.route.params.data.img }} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.galeryWrap} onPress={() => showScreen(props.route.params.data.img)}>
          <Image style={styles.galeryImg} source={{ uri: props.route.params.data.img }} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.galeryWrap} onPress={() => showScreen(props.route.params.data.img)}>
          <Image style={styles.galeryImg} source={{ uri: props.route.params.data.img }} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.galeryWrap} onPress={() => showScreen(props.route.params.data.img)}>
          <Image style={styles.galeryImg} source={{ uri: props.route.params.data.img }} />
        </TouchableOpacity>
      </ScrollView>
      {
        !reserving &&
        <TouchableOpacity onPress={() => setreserving(!reserving)} style={{ marginTop: 20, width: "70%", backgroundColor: colorAlfa, borderRadius: 15, paddingVertical: 10, paddingHorizontal: 20, flexDirection: "row", justifyContent: "center" }}>
          <Icon name='calendar-outline' fill={color_white} width={20} height={20} />
          <Text style={{ textAlign: "center", marginLeft: 5, color: "white", fontWeight: "bold", textTransform: "uppercase" }}>reservar</Text>
        </TouchableOpacity>
      }
      {/* {reserving && <HotelsReserva />} *
*}
   
     {/* 
     <Modal
       animationType="slide"
       transparent={true}
       visible={fullScreen}
     >
       <View style={styles.modalWrap}>
         <TouchableOpacity onPress={() => setfullScreen(false)} style={styles.modalIcon}>
           <Icon name='close-circle-outline' fill={color_white} width={30} height={30} />
         </TouchableOpacity>
         <View style={{ width: "100%", resizeMode: "contain" }}>
           <Image style={{ height: "100%", width: "100%", resizeMode: "contain" }} source={{ uri: fullScreenImg }} />
         </View>
       </View>
     </Modal>

*/}



<View style={{height:100}}></View>
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
  );
}

const styles = StyleSheet.create({

});
export default HotelsView;


// const styles = StyleSheet.create({
//   bannerImage: {},
//   galeryWrap: {
//     width: 110,
//     height: 90,
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
//   modalWrap: {
//     alignItems: "center",
//     alignContent: "center",
//     justifyContent: "center",
//     backgroundColor: "rgba(0,0,0,0.8)",
//     width: "100%",
//     height: "100%",
//     position: "absolute",
//     zIndex: 9999
//   },
//   modalIcon: {
//     position: "absolute",
//     right: 10,
//     top: 20,
//     zIndex: 99999
//   },
//   modalImg: {}
// });





  //   useEffect(() => {
  //     if (rooms !== false) {
  //       setLoad(false)
  //     }
  //   }, [rooms]);
  
  //   //const rooms = [
  //   //   { id: "1", id_hotel: "", description:"Mini-fridge, free breakfast, free WiFi, laptop-sized safe, work area, chair, HDTV.\n\nThis queen non-smoking room features our clean and fresh Hampton bed®, mini-fridge, comfortable soft seating, HDTV and easy-to-operate alarm clock/radio.\n\nCatch up with work at the desk using free WiFi. You'll enjoy the convenience of making freshly brewed tea and coffee in your room and having an iron/ironing board and a laptop-sized safe. Refresh in the bathroom with a full shower, fluffy towels and bath amenities.\n\nFriendly service, clean rooms, comfortable surroundings, every time.", name: "presidential rooms secret", price_per_night: 500, price_per_night_offer: 400, capacity: "6", services: [
  //   //     { service: "3 personas" },
  //   //     { service: "televisión LCD" },
  //   //     { service: " Acogedora cama Hampton" },
  //   //     { service: " Radio reloj despertador fácil de configurar" },
  //   //     { service: " Silla de escritorio ergonómica" },
  //   //     { service: " Canal de películas en la habitación" },
  //   //     { service: " Servicios de conveniencia" },
  //   //     { service: " Mini refrigerador" },
  //   //     { service: " Cafetera" },
  //   //     { service: " Secador de pelo" },
  //   //     { service: "  Plancha / tabla de planchar" },
  //   //     { service: "  Números de sala en braille" },
  //   //     { service: "  Desayuno caliente de cortesía" }
  //   //   ],
  //   //     images: [{ description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }] },
  //   //   { id: "2", id_hotel: "", description:"Mini-fridge, free breakfast, free WiFi, laptop-sized safe, work area, chair, HDTV.\n\nThis queen non-smoking room features our clean and fresh Hampton bed®, mini-fridge, comfortable soft seating, HDTV and easy-to-operate alarm clock/radio.\n\nCatch up with work at the desk using free WiFi. You'll enjoy the convenience of making freshly brewed tea and coffee in your room and having an iron/ironing board and a laptop-sized safe. Refresh in the bathroom with a full shower, fluffy towels and bath amenities.\n\nFriendly service, clean rooms, comfortable surroundings, every time.", name: "presidential", price_per_night: 100, price_per_night_offer: 50, capacity: "6", services: [{ service: "AA" }, { service: "TV" }], images: [{ description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }] },
  //   //   { id: "3", id_hotel: "", description:"Mini-fridge, free breakfast, free WiFi, laptop-sized safe, work area, chair, HDTV.\n\nThis queen non-smoking room features our clean and fresh Hampton bed®, mini-fridge, comfortable soft seating, HDTV and easy-to-operate alarm clock/radio.\n\nCatch up with work at the desk using free WiFi. You'll enjoy the convenience of making freshly brewed tea and coffee in your room and having an iron/ironing board and a laptop-sized safe. Refresh in the bathroom with a full shower, fluffy towels and bath amenities.\n\nFriendly service, clean rooms, comfortable surroundings, every time.", name: "presidential", price_per_night: 100, price_per_night_offer: 80, capacity: "6", services: [{ service: "AA" }, { service: "TV" }], images: [{ description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }] },
  //   //   { id: "4", id_hotel: "", description:"Mini-fridge, free breakfast, free WiFi, laptop-sized safe, work area, chair, HDTV.\n\nThis queen non-smoking room features our clean and fresh Hampton bed®, mini-fridge, comfortable soft seating, HDTV and easy-to-operate alarm clock/radio.\n\nCatch up with work at the desk using free WiFi. You'll enjoy the convenience of making freshly brewed tea and coffee in your room and having an iron/ironing board and a laptop-sized safe. Refresh in the bathroom with a full shower, fluffy towels and bath amenities.\n\nFriendly service, clean rooms, comfortable surroundings, every time.", name: "presidential", price_per_night: 200000, price_per_night_offer: 200500, capacity: "6", services: [{ service: "AA" }, { service: "TV" }], images: [{ description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }] },
  //   //   { id: "5", id_hotel: "", description:"Mini-fridge, free breakfast, free WiFi, laptop-sized safe, work area, chair, HDTV.\n\nThis queen non-smoking room features our clean and fresh Hampton bed®, mini-fridge, comfortable soft seating, HDTV and easy-to-operate alarm clock/radio.\n\nCatch up with work at the desk using free WiFi. You'll enjoy the convenience of making freshly brewed tea and coffee in your room and having an iron/ironing board and a laptop-sized safe. Refresh in the bathroom with a full shower, fluffy towels and bath amenities.\n\nFriendly service, clean rooms, comfortable surroundings, every time.", name: "presidential", price_per_night: 200000, price_per_night_offer: 120000, capacity: "6", services: [{ service: "AA" }, { service: "TV" }], images: [{ description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }] },
  //   //   { id: "6", id_hotel: "", description:"Mini-fridge, free breakfast, free WiFi, laptop-sized safe, work area, chair, HDTV.\n\nThis queen non-smoking room features our clean and fresh Hampton bed®, mini-fridge, comfortable soft seating, HDTV and easy-to-operate alarm clock/radio.\n\nCatch up with work at the desk using free WiFi. You'll enjoy the convenience of making freshly brewed tea and coffee in your room and having an iron/ironing board and a laptop-sized safe. Refresh in the bathroom with a full shower, fluffy towels and bath amenities.\n\nFriendly service, clean rooms, comfortable surroundings, every time.", name: "presidential", price_per_night: 200000, price_per_night_offer: 120000, capacity: "6", services: [{ service: "AA" }, { service: "TV" }], images: [{ description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }] },
  //   //   { id: "7", id_hotel: "", description:"Mini-fridge, free breakfast, free WiFi, laptop-sized safe, work area, chair, HDTV.\n\nThis queen non-smoking room features our clean and fresh Hampton bed®, mini-fridge, comfortable soft seating, HDTV and easy-to-operate alarm clock/radio.\n\nCatch up with work at the desk using free WiFi. You'll enjoy the convenience of making freshly brewed tea and coffee in your room and having an iron/ironing board and a laptop-sized safe. Refresh in the bathroom with a full shower, fluffy towels and bath amenities.\n\nFriendly service, clean rooms, comfortable surroundings, every time.", name: "presidential", price_per_night: 200000, price_per_night_offer: 120000, capacity: "6", services: [{ service: "AA" }, { service: "TV" }], images: [{ description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }] },
  //   //   { id: "8", id_hotel: "", description:"Mini-fridge, free breakfast, free WiFi, laptop-sized safe, work area, chair, HDTV.\n\nThis queen non-smoking room features our clean and fresh Hampton bed®, mini-fridge, comfortable soft seating, HDTV and easy-to-operate alarm clock/radio.\n\nCatch up with work at the desk using free WiFi. You'll enjoy the convenience of making freshly brewed tea and coffee in your room and having an iron/ironing board and a laptop-sized safe. Refresh in the bathroom with a full shower, fluffy towels and bath amenities.\n\nFriendly service, clean rooms, comfortable surroundings, every time.", name: "presidential", price_per_night: 200000, price_per_night_offer: 120000, capacity: "6", services: [{ service: "AA" }, { service: "TV" }], images: [{ description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }] },
  //   //   { id: "9", id_hotel: "", description:"Mini-fridge, free breakfast, free WiFi, laptop-sized safe, work area, chair, HDTV.\n\nThis queen non-smoking room features our clean and fresh Hampton bed®, mini-fridge, comfortable soft seating, HDTV and easy-to-operate alarm clock/radio.\n\nCatch up with work at the desk using free WiFi. You'll enjoy the convenience of making freshly brewed tea and coffee in your room and having an iron/ironing board and a laptop-sized safe. Refresh in the bathroom with a full shower, fluffy towels and bath amenities.\n\nFriendly service, clean rooms, comfortable surroundings, every time.", name: "presidential", price_per_night: 200000, price_per_night_offer: 120000, capacity: "6", services: [{ service: "AA" }, { service: "TV" }], images: [{ description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }] },
  //   //   { id: "10", id_hotel: "", description:"Mini-fridge, free breakfast, free WiFi, laptop-sized safe, work area, chair, HDTV.\n\nThis queen non-smoking room features our clean and fresh Hampton bed®, mini-fridge, comfortable soft seating, HDTV and easy-to-operate alarm clock/radio.\n\nCatch up with work at the desk using free WiFi. You'll enjoy the convenience of making freshly brewed tea and coffee in your room and having an iron/ironing board and a laptop-sized safe. Refresh in the bathroom with a full shower, fluffy towels and bath amenities.\n\nFriendly service, clean rooms, comfortable surroundings, every time.", name: "presidential", price_per_night: 200000, price_per_night_offer: 120000, capacity: "6", services: [{ service: "AA" }, { service: "TV" }], images: [{ description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }] },
  //   //   { id: "11", id_hotel: "", description:"Mini-fridge, free breakfast, free WiFi, laptop-sized safe, work area, chair, HDTV.\n\nThis queen non-smoking room features our clean and fresh Hampton bed®, mini-fridge, comfortable soft seating, HDTV and easy-to-operate alarm clock/radio.\n\nCatch up with work at the desk using free WiFi. You'll enjoy the convenience of making freshly brewed tea and coffee in your room and having an iron/ironing board and a laptop-sized safe. Refresh in the bathroom with a full shower, fluffy towels and bath amenities.\n\nFriendly service, clean rooms, comfortable surroundings, every time.", name: "presidential", price_per_night: 200000, price_per_night_offer: 120000, capacity: "6", services: [{ service: "AA" }, { service: "TV" }], images: [{ description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }] },
  //   //   { id: "12", id_hotel: "", description:"Mini-fridge, free breakfast, free WiFi, laptop-sized safe, work area, chair, HDTV.\n\nThis queen non-smoking room features our clean and fresh Hampton bed®, mini-fridge, comfortable soft seating, HDTV and easy-to-operate alarm clock/radio.\n\nCatch up with work at the desk using free WiFi. You'll enjoy the convenience of making freshly brewed tea and coffee in your room and having an iron/ironing board and a laptop-sized safe. Refresh in the bathroom with a full shower, fluffy towels and bath amenities.\n\nFriendly service, clean rooms, comfortable surroundings, every time.", name: "presidential", price_per_night: 200000, price_per_night_offer: 120000, capacity: "6", services: [{ service: "AA" }, { service: "TV" }], images: [{ description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }] },
  //   //   { id: "13", id_hotel: "", description:"Mini-fridge, free breakfast, free WiFi, laptop-sized safe, work area, chair, HDTV.\n\nThis queen non-smoking room features our clean and fresh Hampton bed®, mini-fridge, comfortable soft seating, HDTV and easy-to-operate alarm clock/radio.\n\nCatch up with work at the desk using free WiFi. You'll enjoy the convenience of making freshly brewed tea and coffee in your room and having an iron/ironing board and a laptop-sized safe. Refresh in the bathroom with a full shower, fluffy towels and bath amenities.\n\nFriendly service, clean rooms, comfortable surroundings, every time.", name: "presidential", price_per_night: 200000, price_per_night_offer: 120000, capacity: "6", services: [{ service: "AA" }, { service: "TV" }], images: [{ description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }] },
  //   //   { id: "14", id_hotel: "", description:"Mini-fridge, free breakfast, free WiFi, laptop-sized safe, work area, chair, HDTV.\n\nThis queen non-smoking room features our clean and fresh Hampton bed®, mini-fridge, comfortable soft seating, HDTV and easy-to-operate alarm clock/radio.\n\nCatch up with work at the desk using free WiFi. You'll enjoy the convenience of making freshly brewed tea and coffee in your room and having an iron/ironing board and a laptop-sized safe. Refresh in the bathroom with a full shower, fluffy towels and bath amenities.\n\nFriendly service, clean rooms, comfortable surroundings, every time.", name: "presidential", price_per_night: 200000, price_per_night_offer: 120000, capacity: "6", services: [{ service: "AA" }, { service: "TV" }], images: [{ description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }] },
  //   //   { id: "15", id_hotel: "", description:"Mini-fridge, free breakfast, free WiFi, laptop-sized safe, work area, chair, HDTV.\n\nThis queen non-smoking room features our clean and fresh Hampton bed®, mini-fridge, comfortable soft seating, HDTV and easy-to-operate alarm clock/radio.\n\nCatch up with work at the desk using free WiFi. You'll enjoy the convenience of making freshly brewed tea and coffee in your room and having an iron/ironing board and a laptop-sized safe. Refresh in the bathroom with a full shower, fluffy towels and bath amenities.\n\nFriendly service, clean rooms, comfortable surroundings, every time.", name: "presidential", price_per_night: 200000, price_per_night_offer: 120000, capacity: "6", services: [{ service: "AA" }, { service: "TV" }], images: [{ description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }] },
  //   //   { id: "16", id_hotel: "", description:"Mini-fridge, free breakfast, free WiFi, laptop-sized safe, work area, chair, HDTV.\n\nThis queen non-smoking room features our clean and fresh Hampton bed®, mini-fridge, comfortable soft seating, HDTV and easy-to-operate alarm clock/radio.\n\nCatch up with work at the desk using free WiFi. You'll enjoy the convenience of making freshly brewed tea and coffee in your room and having an iron/ironing board and a laptop-sized safe. Refresh in the bathroom with a full shower, fluffy towels and bath amenities.\n\nFriendly service, clean rooms, comfortable surroundings, every time.", name: "presidential", price_per_night: 200000, price_per_night_offer: 120000, capacity: "6", services: [{ service: "AA" }, { service: "TV" }], images: [{ description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }] },
  //   //   { id: "17", id_hotel: "", description:"Mini-fridge, free breakfast, free WiFi, laptop-sized safe, work area, chair, HDTV.\n\nThis queen non-smoking room features our clean and fresh Hampton bed®, mini-fridge, comfortable soft seating, HDTV and easy-to-operate alarm clock/radio.\n\nCatch up with work at the desk using free WiFi. You'll enjoy the convenience of making freshly brewed tea and coffee in your room and having an iron/ironing board and a laptop-sized safe. Refresh in the bathroom with a full shower, fluffy towels and bath amenities.\n\nFriendly service, clean rooms, comfortable surroundings, every time.", name: "presidential", price_per_night: 200000, price_per_night_offer: 120000, capacity: "6", services: [{ service: "AA" }, { service: "TV" }], images: [{ description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }] },
  //   //   { id: "18", id_hotel: "", description:"Mini-fridge, free breakfast, free WiFi, laptop-sized safe, work area, chair, HDTV.\n\nThis queen non-smoking room features our clean and fresh Hampton bed®, mini-fridge, comfortable soft seating, HDTV and easy-to-operate alarm clock/radio.\n\nCatch up with work at the desk using free WiFi. You'll enjoy the convenience of making freshly brewed tea and coffee in your room and having an iron/ironing board and a laptop-sized safe. Refresh in the bathroom with a full shower, fluffy towels and bath amenities.\n\nFriendly service, clean rooms, comfortable surroundings, every time.", name: "presidential", price_per_night: 200000, price_per_night_offer: 120000, capacity: "6", services: [{ service: "AA" }, { service: "TV" }], images: [{ description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }] },
  //   //   { id: "19", id_hotel: "", description:"Mini-fridge, free breakfast, free WiFi, laptop-sized safe, work area, chair, HDTV.\n\nThis queen non-smoking room features our clean and fresh Hampton bed®, mini-fridge, comfortable soft seating, HDTV and easy-to-operate alarm clock/radio.\n\nCatch up with work at the desk using free WiFi. You'll enjoy the convenience of making freshly brewed tea and coffee in your room and having an iron/ironing board and a laptop-sized safe. Refresh in the bathroom with a full shower, fluffy towels and bath amenities.\n\nFriendly service, clean rooms, comfortable surroundings, every time.", name: "presidential", price_per_night: 200000, price_per_night_offer: 120000, capacity: "6", services: [{ service: "AA" }, { service: "TV" }], images: [{ description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }] },
  //   //   { id: "20", id_hotel: "", description:"Mini-fridge, free breakfast, free WiFi, laptop-sized safe, work area, chair, HDTV.\n\nThis queen non-smoking room features our clean and fresh Hampton bed®, mini-fridge, comfortable soft seating, HDTV and easy-to-operate alarm clock/radio.\n\nCatch up with work at the desk using free WiFi. You'll enjoy the convenience of making freshly brewed tea and coffee in your room and having an iron/ironing board and a laptop-sized safe. Refresh in the bathroom with a full shower, fluffy towels and bath amenities.\n\nFriendly service, clean rooms, comfortable surroundings, every time.", name: "presidential", price_per_night: 200000, price_per_night_offer: 120000, capacity: "6", services: [{ service: "AA" }, { service: "TV" }], images: [{ description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }] },
  //   //   { id: "21", id_hotel: "", description:"Mini-fridge, free breakfast, free WiFi, laptop-sized safe, work area, chair, HDTV.\n\nThis queen non-smoking room features our clean and fresh Hampton bed®, mini-fridge, comfortable soft seating, HDTV and easy-to-operate alarm clock/radio.\n\nCatch up with work at the desk using free WiFi. You'll enjoy the convenience of making freshly brewed tea and coffee in your room and having an iron/ironing board and a laptop-sized safe. Refresh in the bathroom with a full shower, fluffy towels and bath amenities.\n\nFriendly service, clean rooms, comfortable surroundings, every time.", name: "presidential", price_per_night: 200000, price_per_night_offer: 120000, capacity: "6", services: [{ service: "AA" }, { service: "TV" }], images: [{ description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }] },
  //   //   { id: "22", id_hotel: "", description:"Mini-fridge, free breakfast, free WiFi, laptop-sized safe, work area, chair, HDTV.\n\nThis queen non-smoking room features our clean and fresh Hampton bed®, mini-fridge, comfortable soft seating, HDTV and easy-to-operate alarm clock/radio.\n\nCatch up with work at the desk using free WiFi. You'll enjoy the convenience of making freshly brewed tea and coffee in your room and having an iron/ironing board and a laptop-sized safe. Refresh in the bathroom with a full shower, fluffy towels and bath amenities.\n\nFriendly service, clean rooms, comfortable surroundings, every time.", name: "presidential", price_per_night: 200000, price_per_night_offer: 120000, capacity: "6", services: [{ service: "AA" }, { service: "TV" }], images: [{ description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }] },
  //   //   { id: "23", id_hotel: "", description:"Mini-fridge, free breakfast, free WiFi, laptop-sized safe, work area, chair, HDTV.\n\nThis queen non-smoking room features our clean and fresh Hampton bed®, mini-fridge, comfortable soft seating, HDTV and easy-to-operate alarm clock/radio.\n\nCatch up with work at the desk using free WiFi. You'll enjoy the convenience of making freshly brewed tea and coffee in your room and having an iron/ironing board and a laptop-sized safe. Refresh in the bathroom with a full shower, fluffy towels and bath amenities.\n\nFriendly service, clean rooms, comfortable surroundings, every time.", name: "presidential", price_per_night: 200000, price_per_night_offer: 120000, capacity: "6", services: [{ service: "AA" }, { service: "TV" }], images: [{ description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }] },
  //   //   { id: "24", id_hotel: "", description:"Mini-fridge, free breakfast, free WiFi, laptop-sized safe, work area, chair, HDTV.\n\nThis queen non-smoking room features our clean and fresh Hampton bed®, mini-fridge, comfortable soft seating, HDTV and easy-to-operate alarm clock/radio.\n\nCatch up with work at the desk using free WiFi. You'll enjoy the convenience of making freshly brewed tea and coffee in your room and having an iron/ironing board and a laptop-sized safe. Refresh in the bathroom with a full shower, fluffy towels and bath amenities.\n\nFriendly service, clean rooms, comfortable surroundings, every time.", name: "presidential", price_per_night: 200000, price_per_night_offer: 120000, capacity: "6", services: [{ service: "AA" }, { service: "TV" }], images: [{ description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }, { description: "descripcion de esta imagen como referencia", img: "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg" }] },
  //   //]
  //   function getPage(p) {
  // console.log("nueva pag de rooms ", p)
  //     setpage(p)
  //   }
  //   const [Search, setSearch] = useState(null);
  //   function onChangeText(text) {
  //     if (page !== 1) { setpage(1) }
  //     if (text !== "") { setSearch(text) }
  //     else {
  //       if (text === "") {
  //         setSearch(null)
  //       }
  //     }
  //   }

  //   function print() {
  //     console.log("print")
  //     try {
  //       if (rooms.data.length > 0) {
  //         return (
  //           <View style={{ position: "relative", zIndex: 1, paddingTop: 10, paddingBottom: 100 }}>
  //             {rooms.data.map((i, key) => {
  //               return (
  //                 <CardRoom key={key} data={i} goToScreen={goToScreen} />
  //               )
  //             })}
  //             <Pagination page={page} lastPage={rooms.last_page} getPage={getPage} />
  //           </View>
  //         )
  //       }
  //       else {
  //         return (<View><Text>empty</Text></View>)
  //       }
  //     } catch (error) {
  //       console.log("error al imprimir rooms", error)
  //     }
  //   }


/*
 

*/