import React, { useState, useEffect } from 'react'
import { StyleSheet, Modal, TextInput, SafeAreaView, StatusBar, Dimensions, TouchableOpacity, Image, ScrollView, View, Text, ActivityIndicator, ImageBackground, } from 'react-native'
import { useTranslation } from 'react-i18next'
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


import MenuView from './sections/Menu'
import SectionGeneral from './sections/SectionGeneral'
import SectionInfo from './sections/SectionInfo'
import SectionImages from './sections/SectionImages'
import SectionOpinions from './sections/SectionOpinions.js'
import SectionOffers from './sections/SectionOffers.js'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function HotelsView(props) {
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
    const res = await hotels.hotelInfo(data.id, i18n.language);
    setdata({ ...data, ...res });
    setLoad(false);
  }


  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }


  /*
  "id": 1,
  "category": "Hotel",
  "name": "bahia paraiso",
  "latitud": "",
  "longitud": "",
  "img": "https://cdn.forbes.co/2020/02/sofitel-legend-santa-clara-outdoor-pool.jpg",
  "description": "We're 11 minutes from El Dorado International Airport, just off Avenida Calle 26 – we'll pick you up in our free airport shuttle. Visit the Museum of Modern Art and the Colombian National Museum in downtown Bogota, just 20 minutes away. Enjoy free WiFi and free hot breakfast.",
  "country": "",
  "country_id": "COL",
  "district": "0",
  "city": "",
  "city_id": "2259",
  "adress": "",
  "basedOn": 5,
  "stars": 5,
  "status": 1,
  "type": "default",
  "recommended": 5,
  "created_at": "2021-06-05 11:06:26",
  "updated_at": "2021-06-05 11:06:26"

  "cleaning": {
    "id": 1,
    "id_hotel": 1,
    "title": "En este establecimiento, se toman las siguientes medidas para proteger la salud y la seguridad de los huéspedes y del personal."
  },
  
  "cleaning_tips": [
  {"description": "Estos protocolos se establecieron para reducir el riesgo de infecciones de acuerdo con los requisitos de las autoridades externas.", "id": 1, "id_hotel": 1, "title": "Nuevos protocolos de seguridad"},
  {"description": "Las habitaciones (o todo el establecimiento) se desinfectan de forma periódica.", "id": 2, "id_hotel": 1, "title": "Desinfección periódica"},
  {"description": "Se han tomado medidas para que los huéspedes y el personal puedan mantener el distanciamiento social.", "id": 3, "id_hotel": 1, "title": "Distanciamiento social"},
  {"description": "Hay desinfectante para manos en las zonas comunes y las habitaciones de huéspedes.", "id": 4, "id_hotel": 1, "title": "Desinfectante para manos"},
  {"description": "Como parte del protocolo de seguridad de este establecimiento, se les toma la temperatura a los huéspedes y al personal.", "id": 5, "id_hotel": 1, "title": "Toma de temperatura"},
  {"description": "Los huéspedes pueden pagar con métodos diferentes al efectivo.", "id": 6, "id_hotel": 1, "title": "Pago sin efectivo"},
  {"description": "Las comidas del establecimiento se pueden llevar a las habitaciones de los huéspedes.", "id": 7, "id_hotel": 1, "title": "Servicio a la habitación"},
  {"description": "El personal está capacitado sobre el protocolo que debe seguir si se informa que hay una infección.", "id": 8, "id_hotel": 1, "title": "Protocolo de respuesta"}
],

"images": [
  {"created_at": "2021-10-14 16:43:11", "description": "soy una cama jaja", "id": 1, "id_hotel": 1, "id_room": 1, "img": "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg", "status": 1, "update_at": "2021-10-14 16:43:11"},
  {"created_at": "2022-01-14 11:31:09", "description": "description default", "id": 2, "id_hotel": 1, "id_room": 1, "img": "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg", "status": 1, "update_at": "2022-01-14 11:31:09"},
  {"created_at": "2022-01-14 11:31:09", "description": "description default", "id": 3, "id_hotel": 1, "id_room": 2, "img": "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg", "status": 1, "update_at": "2022-01-14 11:31:09"}
],

"rating": [
  {"bedrooms": 8, "breakfast": 8, "cleaning": 8, "comfort": 8, "create_at": "2022-01-14 14:24:32", "edifice": 8, "facilities": 8, "id": 1, "id_bill": "wellezy_123", "id_client": 1, "id_hotel": 1, "location": 8, "meal": 8, "opinion": "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas \"Letraset\", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.", "price_quality": 8, "service": 8, "update_at": "2022-01-14 14:24:32"},
  {"bedrooms": 5.5, "breakfast": 5.5, "cleaning": 5.5, "comfort": 5.5, "create_at": "2022-01-14 14:33:03", "edifice": 5.5, "facilities": 5.5, "id": 2, "id_bill": "rererer", "id_client": 2, "id_hotel": 1, "location": 8.5, "meal": 5.5, "opinion": "", "price_quality": 5.5, "service": 5.5, "update_at": "2022-01-14 14:33:03"},
  {"bedrooms": 8.5, "breakfast": 5.5, "cleaning": 5.5, "comfort": 5.5, "create_at": "2022-01-14 14:33:03", "edifice": 8.5, "facilities": 3.5, "id": 3, "id_bill": "rererer", "id_client": 3, "id_hotel": 1, "location": 9.5, "meal": 5.5, "opinion": "", "price_quality": 5.5, "service": 5.5, "update_at": "2022-01-14 14:33:03"},
  {"bedrooms": 6.5, "breakfast": 5.5, "cleaning": 5.5, "comfort": 4.5, "create_at": "2022-01-14 14:33:03", "edifice": 7.5, "facilities": 5.5, "id": 4, "id_bill": "rererer", "id_client": 4, "id_hotel": 1, "location": 9, "meal": 5.5, "opinion": "", "price_quality": 5.5, "service": 5.5, "update_at": "2022-01-14 14:33:03"},
  {"bedrooms": 5.5, "breakfast": 6, "cleaning": 5.5, "comfort": 2.5, "create_at": "2022-01-14 14:33:03", "edifice": 5.5, "facilities": 5.5, "id": 5, "id_bill": "rererer", "id_client": 5, "id_hotel": 1, "location": 7.5, "meal": 5.5, "opinion": "", "price_quality": 2.5, "service": 9.5, "update_at": "2022-01-14 14:33:03"},
  {"bedrooms": 5.5, "breakfast": 5.5, "cleaning": 5.5, "comfort": 5.5, "create_at": "2022-01-14 14:33:17", "edifice": 5.5, "facilities": 5.5, "id": 6, "id_bill": "rererer", "id_client": 6, "id_hotel": 1, "location": 8.5, "meal": 5.5, "opinion": "", "price_quality": 5.5, "service": 5.5, "update_at": "2022-01-14 14:33:17"},
  {"bedrooms": 8.5, "breakfast": 5.5, "cleaning": 5.5, "comfort": 5.5, "create_at": "2022-01-14 14:33:17", "edifice": 8.5, "facilities": 3.5, "id": 7, "id_bill": "rererer", "id_client": 7, "id_hotel": 1, "location": 10, "meal": 5.5, "opinion": "", "price_quality": 5.5, "service": 5.5, "update_at": "2022-01-14 14:33:17"},
  {"bedrooms": 6.5, "breakfast": 5.5, "cleaning": 5.5, "comfort": 4.5, "create_at": "2022-01-14 14:33:17", "edifice": 7.5, "facilities": 5.5, "id": 8, "id_bill": "rererer", "id_client": 8, "id_hotel": 1, "location": 9.5, "meal": 5.5, "opinion": "", "price_quality": 5.5, "service": 5.5, "update_at": "2022-01-14 14:33:17"},
  {"bedrooms": 5.5, "breakfast": 6, "cleaning": 5.5, "comfort": 2.5, "create_at": "2022-01-14 14:33:17", "edifice": 5.5, "facilities": 5.5, "id": 9, "id_bill": "rererer", "id_client": 9, "id_hotel": 1, "location": 9.5, "meal": 5.5, "opinion": "", "price_quality": 2.5, "service": 9.5, "update_at": "2022-01-14 14:33:17"}
],

"rooms": [
  {"beds": 0, "capacity": 4, "created_at": "2021-10-14 08:49:09", "description": "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas \"Letraset\", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.", "id": 1, "id_hotel": 1,"images": [Array], "img": "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg", "name": "presidential room dreams", "price_per_night": 45000, "price_per_night_offer": 44000, "services": [Array], "update_at": "2021-10-14 08:49:09"},
  {"beds": 0, "capacity": 8, "created_at": "2021-10-14 08:49:09", "description": "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas \"Letraset\", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.", "id": 2, "id_hotel": 1, "images": [Array], "img": "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg", "name": "moon night", "price_per_night": 45000, "price_per_night_offer": 44000, "services": [Array], "update_at": "2021-10-14 08:49:09"},
  {"beds": 0, "capacity": 12, "created_at": "2021-10-14 12:26:31", "description": "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas \"Letraset\", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.", "id": 3, "id_hotel": 1, "images": [Array], "img": "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg", "name": "wqerty", "price_per_night": 45000, "price_per_night_offer": 0, "services": [Array], "update_at": "2021-10-14 12:26:31"},
  {"beds": 0, "capacity": 2, "created_at": "2021-10-14 12:26:31", "description": "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas \"Letraset\", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.", "id": 4, "id_hotel": 1, "images": [Array], "img": "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg", "name": "1234 qwer", "price_per_night": 234567, "price_per_night_offer": 123456, "services": [Array], "update_at": "2021-10-14 12:26:31"},
  {"beds": 0, "capacity": 4, "created_at": "2021-10-14 13:49:09", "description": "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas \"Letraset\", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.", "id": 5, "id_hotel": 1, "images": [Array], "img": "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg", "name": "ewert", "price_per_night": 45000, "price_per_night_offer": 43000, "services": [Array], "update_at": "2021-10-14 13:49:09"},
  {"beds": 0, "capacity": 8, "created_at": "2021-10-14 13:49:09", "description": "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas \"Letraset\", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.", "id": 6, "id_hotel": 1, "images": [Array], "img": "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg", "name": "moon night", "price_per_night": 45000, "price_per_night_offer": 44000, "services": [Array], "update_at": "2021-10-14 13:49:09"},
  {"beds": 0, "capacity": 12, "created_at": "2021-10-14 17:26:31", "description": "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas \"Letraset\", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.", "id": 7, "id_hotel": 1, "images": [Array], "img": "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg", "name": "wqerty", "price_per_night": 45000, "price_per_night_offer": 550000, "services": [Array], "update_at": "2021-10-14 17:26:31"},
  {"beds": 0, "capacity": 2, "created_at": "2021-10-14 17:26:31", "description": "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas \"Letraset\", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.", "id": 8, "id_hotel": 1, "images": [Array], "img": "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg", "name": "1234 qwer", "price_per_night": 234567, "price_per_night_offer": 123456, "services": [Array], "update_at": "2021-10-14 17:26:31"}, 
  {"beds": 0, "capacity": 4, "created_at": "2021-10-14 13:49:09", "description": "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas \"Letraset\", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.", "id": 9, "id_hotel": 1, "images": [Array], "img": "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg", "name": "43t3t", "price_per_night": 45000, "price_per_night_offer": 43000, "services": [Array], "update_at": "2021-10-14 13:49:09"}, 
  {"beds": 0, "capacity": 8, "created_at": "2021-10-14 13:49:09", "description": "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas \"Letraset\", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.", "id": 10, "id_hotel": 1, "images": [Array], "img": "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg", "name": "moon night", "price_per_night": 45000, "price_per_night_offer": 44000, "services": [Array], "update_at": "2021-10-14 13:49:09"}, 
  {"beds": 0, "capacity": 12, "created_at": "2021-10-14 17:26:31", "description": "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas \"Letraset\", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.", "id": 11, "id_hotel": 1, "images": [Array], "img": "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg", "name": "wqerty", "price_per_night": 45000, "price_per_night_offer": 550000, "services": [Array], "update_at": "2021-10-14 17:26:31"}, 
  {"beds": 0, "capacity": 2, "created_at": "2021-10-14 17:26:31", "description": "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas \"Letraset\", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.", "id": 12, "id_hotel": 1, "images": [Array], "img": "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg", "name": "1234 qwer", "price_per_night": 234567, "price_per_night_offer": 123456, "services": [Array], "update_at": "2021-10-14 17:26:31"}, 
  {"beds": 0, "capacity": 4, "created_at": "2021-10-14 13:49:09", "description": "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas \"Letraset\", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.", "id": 13, "id_hotel": 1, "images": [Array], "img": "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg", "name": "34tt3 t3qt", "price_per_night": 45000, "price_per_night_offer": 43000, "services": [Array], "update_at": "2021-10-14 13:49:09"}, 
  {"beds": 0, "capacity": 8, "created_at": "2021-10-14 13:49:09", "description": "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas \"Letraset\", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.", "id": 14, "id_hotel": 1, "images": [Array], "img": "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg", "name": "moon night", "price_per_night": 45000, "price_per_night_offer": 44000, "services": [Array], "update_at": "2021-10-14 13:49:09"}, 
  {"beds": 0, "capacity": 12, "created_at": "2021-10-14 17:26:31", "description": "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas \"Letraset\", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.", "id": 15, "id_hotel": 1, "images": [Array], "img": "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg", "name": "wqerty", "price_per_night": 45000, "price_per_night_offer": 550000, "services": [Array], "update_at": "2021-10-14 17:26:31"}, 
  {"beds": 0, "capacity": 2, "created_at": "2021-10-14 17:26:31", "description": "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas \"Letraset\", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.", "id": 16, "id_hotel": 1, "images": [Array], "img": "https://imagenescityexpress.scdn6.secure.raxcdn.com/sites/default/files/2019-07/hotel-innovador-servicio-cliente.jpg", "name": "1234 qwer", "price_per_night": 234567, "price_per_night_offer": 123456, "services": [Array], "update_at": "2021-10-14 17:26:31"}
],

"services": {
  "mainServices": [[Object], [Object], [Object], [Object], [Object]],
  "allTheServices": [[Object], [Object], [Object], [Object], [Object]],
  "servicesAndFacilities": [[Object], [Object], [Object], [Object], [Object]]
},
*/





  return (
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
            source={{ uri: data.img }}
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
        {Load === false && label === 5 && <SectionOffers   data={data} setlabel={setlabel} goToScreen={goToScreen}/>}

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
  );
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
export default HotelsView;
