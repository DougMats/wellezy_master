import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, FlatList, TextInput, View, TouchableOpacity, Text, Image, TouchableHighlight, Dimensions } from 'react-native';
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
  color_star
} from '../../styles/Colors.js'
import { useTranslation } from 'react-i18next';
import { file_server1 } from '../../../Env'
const windowWidth = Dimensions.get('window').width / 12;

function ServicesList(props) {
  const { t, i18n } = useTranslation();
  // const list = [
  //   { id: 1, name: "Vuelos", img:"https://static.vecteezy.com/system/resources/previews/003/090/325/non_2x/airplane-and-aircraft-vector.jpg" },
  //   { id: 2, name: "Hoteles", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLl66jKdD2tV8Sw152bLuOV8FvDM46NB9cig&usqp=CAU" },
  //   { id: 3, name: "Médicos", img:"https://www.creativefabrica.com/wp-content/uploads/2020/09/03/vector-doctor-flat-illustration-concept-Graphics-5271585-2-580x386.jpg" },
  //   { id: 4, name: "Procedimientos", img:"https://img.freepik.com/vector-gratis/ilustracion-vector-concepto-abstracto-contorno-facial-escultura-facial-procedimiento-cosmetico-estetico-contorno-facial-medico-maquina-correccion-adelgazamiento-metafora-abstracta-cirugia-plastica_335657-1567.jpg?size=338&ext=jpgg" },
  //   { id: 5, name: "Transportes", img:"https://img.lovepik.com/free-png/20210918/lovepik-vector-car-png-image_400193112_wh1200.png" },
  //   { id: 6, name: "seguros", img:"https://previews.123rf.com/images/vladwel/vladwel2006/vladwel200600003/148162781-%E5%AE%B6%E6%97%8F%E3%81%AE%E5%81%A5%E5%BA%B7%E4%BF%9D%E9%99%BA%E3%83%99%E3%82%AF%E3%83%88%E3%83%AB%E3%82%B7%E3%83%BC%E3%83%AB%E3%83%89%E3%82%84%E5%8C%BB%E7%99%82%E5%8C%BB%E7%99%82%E6%B0%91%E9%96%93%E4%BF%9D%E8%AD%B7%E3%82%AC%E3%83%BC%E3%83%89%E3%83%95%E3%83%A9%E3%83%83%E3%83%88%E6%BC%AB%E7%94%BB%E3%81%AE%E3%82%A2%E3%82%A4%E3%82%B3%E3%83%B3%E3%82%B5%E3%82%A4%E3%83%B3%E3%80%81%E5%AE%B6%E5%BA%AD%E3%81%AE%E5%AE%89%E5%85%A8%E9%98%B2%E8%A1%9B%E8%A3%9C%E5%84%9F%E3%82%B7%E3%83%B3%E3%83%9C%E3%83%AB%E3%81%AE%E6%A6%82%E5%BF%B5%E3%81%BE%E3%81%9F%E3%81%AF%E3%83%AA%E3%82%B9%E3%82%AF%E6%94%AF%E6%8F%B4%E7%94%BB%E5%83%8F%E3%82%92%E6%94%AF%E6%8F%B4.jpg" },
  //   { id: 7, name: "enfermeras", img:"https://media.istockphoto.com/vectors/nurse-flat-icon-pixel-perfect-for-mobile-and-web-vector-id1149308519?b=1&k=6&m=1149308519&s=612x612&w=0&h=75ZHbcTXciRHfGIETU4Ck5TlHhsUD18r4QKbgxXJdjU="},
  //   { id: 8, name: "asesoramientos", img:"https://img.freepik.com/vector-gratis/ilustracion-concepto-consultoria_114360-2559.jpg?size=626&ext=jpg" },
  // ]

  const list = [
    { id: 1, name: "Vuelos",         img:"vuelos.png",         value:1, screen:"DashboardFly"},
    { id: 3, name: "Médicos",        img:"medicos.png",        value:null, screen:"MedicsList"},

    { id: 4, name: "Procedimientos", img:"procedimientos.png", value:1, screen:"Procedures"},

    { id: 2, name: "Hoteles",        img:"hoteles.png",        value:2, screen:"DashboardServices"},
    { id: 5, name: "Transportes",    img:"vehiculos.png",      value:1, screen:"DashboardServices"},
    { id: 7, name: "enfermeras",     img:"enfermeras.png",     value:6, screen:"DashboardServices"},

    // { id: 6, name: "seguros",        img:"seguros.png",        value:1, screen:"DashboardServices"},
    // { id: 8, name: "asesoramientos", img:"asesoramientos.png", value:1, screen:"DashboardServices"},
  ]
  return (




<View
  style={{
    backgroundColor:"#f5f5f5",
    width:windowWidth*12,
    paddingHorizontal:windowWidth/2
  }}>



<View style={styles.head}>
        <Text style={styles.title}>Our Services</Text>
        <TouchableOpacity
          onPress={() => props.goToScreen("Procedures", null)}
          style={styles.btn}>
          <Text style={styles.btnText}>ver más</Text>
        </TouchableOpacity>
      </View>



      <View
        style={{

          alignSelf:"center",
          flexDirection: 'row',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'space-around',
          flexWrap: 'wrap'
        }}>

        {list.map((i, key) => {
          return (
            <TouchableOpacity key={key}
            onPress={()=>props.goToScreen(
               i.screen, i.value
            )}
              style={{ 
                width:windowWidth*5,
                borderRadius: 8,
                paddingVertical: 3,
                backgroundColor: color_white,
                flexDirection: "row",
                marginBottom: 10,
                justifyContent:"space-between"
              }}>

              <View style={{
                width: windowWidth*1.5,
                borderRadius: 8,
                height: windowWidth*1.5,
                backgroundColor: "#F5F5F5",
                marginLeft:5,
                overflow:"hidden"
              }}>
                <Image
                 source={{ uri: `${file_server1}/img/wellezy/services/icon/${i.img}` }}
             
                 style={{ width:null, height:null, flex:1, resizeMode:"cover" }} />
              </View>

              <Text style={{
                color:"black",
                fontWeight:"bold",
                fontSize:i.name.length > 12 ? 12:14,
                alignSelf:"center",
                paddingHorizontal:5,
                lineHeight: windowWidth*1.5,
                width:windowWidth*3.4,
                textTransform:"capitalize"
              }}>

            {i.name.length > 15 ?  ((i.name.substring(0, 15 - 3)) + '...'):i.name}

          </Text>
            </TouchableOpacity>
          )
        })}


</View>
    </View>
  )
}
export default ServicesList;
const styles = StyleSheet.create({
  wrap: {
    paddingTop: 10,
    paddingBottom: 20,
    flexDirection: "column",
  },
  head: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "space-between"
  },
  title: {
    fontWeight: "700",
    fontSize: 16,
    color: color_grey_dark
  },
  btn: {
    backgroundColor: color_white,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 12
  },
  btnText: {
    textTransform:"capitalize",
    fontSize:12,
    color: color_grey_dark
  },
})