import React, { useState, useEffect, useContext } from 'react'
import { Keyboard, StyleSheet, ScrollView, View, TextInput, Modal, TouchableOpacity, Text, Image, Dimensions, ActivityIndicator } from 'react-native'
import { useTranslation } from 'react-i18next';
import PhotoUpload from 'react-native-photo-upload'
import Toast from 'react-native-simple-toast';
import { Icon } from 'react-native-eva-icons';
import _ from 'lodash';

import UserContext from '../../../../../contexts/UserContext'
import { specials } from '../../../../services/connection.js';
import FilterByLocation from '../../../filters/FilterByLocation'
import { file_server1 } from '../../../../../Env';
import CardNurse from './SpecialCard.js';
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
} from '../../../../styles/Colors';
const windowWidth = Dimensions.get('window').width;

import { Name, zfill, currencyFormat, Offer } from '../../../Logic'


function SpecialCard(props) {
  const { t, i18n } = useTranslation();
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [successfully, setsuccessfully] = useState(false);
  const [Load, setLoad] = useState(false);
  const [Location, setLocation] = useState(false);

  const [displayDescription, setdisplayDescription] = useState(false);
  const coin = "$/."

  //   function Name(t, n, s) {
  //    return t + ". " + n.split(" ")[0] + " " + s.split(" ")[0];
  //   }

  /*
   "banner": "background-blur-clean-531880-1.jpg",
   "basedOn": 1,
   "date_limit": "02-04-2022",
   "description": "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas Letraset, las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.¿Por qué lo usamos?Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo Contenido aquí, contenido aquí. Estos textos hacen parecerlo un español que se puede leer. Muchos paquetes de autoedición y editores de páginas web usan el Lorem Ipsum como su texto por defecto, y al hacer una búsqueda de Lorem Ipsum va a dar por resultado muchos sitios web que usan este texto si se encuentran en estado de desarrollo. Muchas versiones han evolucionado a través de los años, algunas veces por accidente, otras veces a propósito (por ejemplo insertándole humor y cosas por el estilo).", "description_doctor": "Daniel Andrés Correa Posada es un referente de la cirugía plástica y estética en la ciudad de Medellín, el país y el exterior. Caracterizado por su desempeño en los procedimientos quirúrgicos, la cercanía y el carisma que ofrece a sus pacientes antes, durante y después de una cirugía.",
   "id": 25,
   "id_doctor": 1,
   "id_procedure": 27,
   "img": "IMG-20210118-WA0056.jpg",
   "name": "daniel andres",
   "name_category": "ABDOMINOPLASTIA",
   "price": 12000000,
   "price_offer": 10000000,
   "rating": 5,
   "specialName": "25 befaroplastia",
   "stars": 5,
   "status": 1,
   "surname": "correa posada",
   "title": "Dr",
   "type": "premium"
  */

  return (
    <View style={styles.contained}>

{/* 
<Icon
        name={props.data.status === 1 ? 'eye-outline' : 'eye-off-outline'}
        fill={color_grey_light}
        width={20}
        height={20}
        style={{
          position:"absolute",
          top: 2,
          left:5
        }}
      />
 */}




      <View style={styles.wrapperL}>
        <TouchableOpacity /*onPress={() => props.goToScreen("NurseView", props.data)}  */ style={styles.wrapperLBTB}><Icon name='eye-outline' fill={color_fifth} width={25} height={25} /></TouchableOpacity>
        <TouchableOpacity /*onPress={() => props.goToEdit(props.data)} */ style={styles.wrapperLBTB}><Icon name='edit-outline' fill={color_fifth} width={25} height={25} /></TouchableOpacity>
        <TouchableOpacity /*onPress={() => setdeleting(true)} */ style={styles.wrapperLBTB}><Icon name='trash-2-outline' fill={color_fifth} width={25} height={25} /></TouchableOpacity>
      </View>


      <View style={styles.wrapperR}>
      </View>

{/* 

      <View style={styles.wrap}>
        <View style={{
          width: "100%",
          flexDirection: "row",
          paddingVertical: 10,
          paddingHorizontal: 20,
          justifyContent: "space-between",
          backgroundColor: color_fifth
        }}>
          <Text style={styles.title}>{props.data.specialName}</Text>
        </View>
        <View style={styles.rowUp}>
          <View style={[styles.wrapImage,
          {
            width: windowWidth / 3 - 5,
            height: windowWidth / 3 - 5
          }]}>
            <Image
              style={styles.image}
              source={{ uri: `${file_server1}/img/wellezy/specials/${props.data.banner}` }} />
          </View>
          <View
            style={[styles.upWrapText, {
              width: (windowWidth / 3) * 2 - 5,
            }]}>
            <View style={{ position: "absolute", zIndex: 9, top: 0, right: 20 }}>
              {Offer(props.data.price, props.data.price_offer, 15)}
            </View>
            <Text style={styles.priceTotal}>{currencyFormat(coin, props.data.price)}</Text>
            <Text style={styles.priceOffer}>{currencyFormat(coin, props.data.price_offer)}</Text>
            <View style={{ flexDirection: "row" }}>
              <Icon name="person-outline" width={20} height={20} fill={"#555"} />
              <Text style={{ textTransform: "capitalize", color: "#555", marginLeft: 5 }}>{Name(props.data.title, props.data.name, props.data.surname)}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Icon name="calendar-outline" width={20} height={20} fill={"#555"} />
              <Text style={{ color: "#555", marginLeft: 5 }}>
                {props.data.date_limit} (Fecha límite)
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.body}>
          <Text style={{ textAlign: "justify" }}>
            {displayDescription === true ?
              props.data.description
              :
              props.data.description.length > 174 ?
                ((props.data.description.substring(0, 174 - 3)) + '...')
                :
                props.data.description
            }
          </Text>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.btnSmall}
              onPress={() => setdisplayDescription(!displayDescription)}>
              <Text style={styles.btnSmallText}>
                {displayDescription === true ? "ver menos" : "ver más"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.goToScreen("SpecialView", props.data)}
              style={styles.btnSmall}>
              <Text style={styles.btnSmallText}>ir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View> */}

    </View>
  )
}
export default React.memo(SpecialCard);


const styles = StyleSheet.create({

  wrapperL: {
    width: "15%",
    height: "100%",
    alignItems: "center",
    backgroundColor: color_fifth,
    justifyContent: "space-around",
    position: "absolute",
    zIndex: 999,
    top: 0,
    right: 0,
    padding: 5
  },

  wrapperLBTB: {
    backgroundColor: color_white,
    borderColor: color_grey_light,
    borderWidth: 0.5,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    marginBottom: 2
  },









/*
  contained: {
    alignItems: "center",
    width: windowWidth,
    paddingHorizontal: 5,
    paddingVertical: 10
  },


  wrap: {
    overflow: "hidden",
    flexDirection: "column",
    backgroundColor: color_white,
    borderRadius: 12,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },


  rowUp: {
    padding: 10,
    flexDirection: "row"
  },

  wrapImage: {
    overflow: "hidden",
    borderRadius: 8,
    overflow: "hidden"
  },

  image: {
    width: null,
    height: null,
    resizeMode: "cover",
    flex: 1
  },

  upWrapText: {
    paddingHorizontal: 10,
    flexDirection: "column",
    justifyContent: "space-around"
  },

  title: {
    color: color_white,
    fontWeight: "bold",
    fontSize: 18,
    width: "90%"
  },

  priceTotal: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    fontWeight: "bold",
    fontSize: 16,
    color: "red"
  },

  priceOffer: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold"
  },

  body: {
    paddingTop: 10,
    paddingHorizontal: 15,
    paddingBottom: 20,
    borderTopWidth: 0.5,
    borderTopColor: "#ccc"
  },

  footer: {
    flexDirection: "row",
    alignSelf: "flex-end",
  },

  btnSmall: {
    minWidth: "20%",
    borderRadius: 12,
    borderColor: color_primary,
    borderWidth: 1,
    marginLeft: 10
  },

  btnSmallText: {
    textAlign: "center",
    color: color_primary
  }
  */
});