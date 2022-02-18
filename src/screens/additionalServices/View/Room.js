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
import { hotels } from '../../../services/connection.js'
//import { extractDate, InitialsName, Offer, Name, GetDiference2, GetDiference, zfill, currencyFormat, globalStatusValoration, letterCounter} from '../../../components/Logic.js'
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

function Room(props) {
  const [data, setdata] = useState(props.route.params.data);
  const [father, setfather] = useState("desconocido");
  const { t, i18n } = useTranslation();
  const [vertical, setvertical] = useState(false);
  const [Load, setLoad] = useState(true);


  let randomCode
  if (props.route.params) {
    randomCode = props.route.params.randomCode
  } else {
    randomCode = 1
  }



  useEffect(() => {

    if (props.route.params.data.id_hotel) {
      setfather("hotel")
    }
    else {
      setfather("home recovery")
    }


  }, [randomCode]);


  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }

//console.log("room: ", props.route.params.data)

/*
 room:  {
  "beds": 0,
  "id": 1,
  "id_hotel": 1,
  "capacity": 4,
  "created_at": "2021-10-14 08:49:09",
  "description": "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas \"Letraset\", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.",
  "images": [{"created_at": "2021-10-14 16:43:11", "description": "soy una cama jaja", "id": 1, "id_hotel": 1, "id_room": 1, "img": "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg", "status": 1, "update_at": "2021-10-14 16:43:11"}, {"created_at": "2022-01-14 11:31:09", "description": "description default", "id": 2, "id_hotel": 1, "id_room": 1, "img": "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg", "status": 1, "update_at": "2022-01-14 11:31:09"}], "img": "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg", "name": "presidential room dreams", "price_per_night": 45000, "price_per_night_offer": 44000, "services": [{"created_at": "2021-10-14 16:51:49", "id": 1, "id_hotel": 1, "id_room": 1, "service": "cama piscina", "status": 1, "type": "comfort", "update_at": "2021-10-14 16:51:49"}, {"created_at": "2021-10-14 16:51:49", "id": 2, "id_hotel": 1, "id_room": 1, "service": "tv 50\"", "status": 1, "type": "convenience", "update_at": "2021-10-14 16:51:49"}],
  "update_at": "2021-10-14 08:49:09"}
*/




  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color_screen }}>
      <StatusBar /* translucent*/ barStyle='dark-content' backgroundColor={"transparent"} />


    

<Text>*****************</Text>

        {/*   <ScrollView>
        <Text>{father}</Text>

        <Text>{data.capacity}</Text>
        <Text>{data.created_at}</Text>
        <Text>{data.description}</Text>
        <Text>{data.id}</Text>
        <Text>{data.id_hotel}</Text>
        <Text>{data.img}</Text>
        <Text>{data.name}</Text>
        <Text>{data.price_per_night}</Text>
        <Text>{data.price_per_night_offer}</Text>
        <Text>{data.update_at}</Text>





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

 */}


    </SafeAreaView>

  )
}

export default Room