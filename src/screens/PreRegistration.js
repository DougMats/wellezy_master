import React, { useState } from 'react'
import { StyleSheet, Dimensions, View, Text, Image, TouchableOpacity, Modal } from 'react-native'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';

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
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function PreRegistration(props) {
  const [page, setpage] = useState(1);
  const { t, i18n } = useTranslation();
  const size = 20
  function onSwipeLeft(gestureState) { }
  function onSwipeRight(gestureState) { }

  function pagination(v) {
    const newpage = page + v
    if (newpage <= 0) { setpage(1) }
    else {
      if (newpage >= 4) { setpage(4) }
      else {
        setpage(newpage)
      }
    }
  }

  if (props.status === true) {
    return (
      <GestureRecognizer style={styles.wrap} onSwipeLeft={() => pagination(+1)} onSwipeRight={() => pagination(-1)}>
        <View style={styles.wrapper}>
          <TouchableOpacity
            style={{ position: "absolute", zIndex: 9, top: 5, right: 5 }}
            onPress={() => props.close(false)}>
            <Icon name={"close"} width={25} height={25} fill={color_fifth} />
          </TouchableOpacity>
          {page === 1 && <PageOne  getTypeUser={props.get} _color={"#3498DB"} id={null}      value={null} />}
          {page === 2 && <PageTwo  getTypeUser={props.get} _color={"#2ECC71"} id={"client"}  value={t("client")} />}
          {page === 3 && <PageTree getTypeUser={props.get} _color={"#F39C12"} id={"service"} value={t("service")} />}
          {page === 4 && <PageFour getTypeUser={props.get} _color={"#E74C3C"} id={"medic"}   value={t("medic")} />}
          <View style={styles.footer}>
            <TouchableOpacity onPress={() => setpage(1)}><Icon name={page === 1 ? "radio-button-on" : "radio-button-off"} width={size} height={size} fill={color_white} style={{ marginHorizontal: 5 }} /></TouchableOpacity>
            <TouchableOpacity onPress={() => setpage(2)}><Icon name={page === 2 ? "radio-button-on" : "radio-button-off"} width={size} height={size} fill={color_white} style={{ marginHorizontal: 5 }} /></TouchableOpacity>
            <TouchableOpacity onPress={() => setpage(3)}><Icon name={page === 3 ? "radio-button-on" : "radio-button-off"} width={size} height={size} fill={color_white} style={{ marginHorizontal: 5 }} /></TouchableOpacity>
            <TouchableOpacity onPress={() => setpage(4)}><Icon name={page === 4 ? "radio-button-on" : "radio-button-off"} width={size} height={size} fill={color_white} style={{ marginHorizontal: 5 }} /></TouchableOpacity>
          </View>
        </View>
      </GestureRecognizer>
    )
  }
  if (props.status === false) { return (<></>) }
}
export default PreRegistration;

const PageOne = (props) => {
  return (
    <View style={styles.page}>
    <Text style={{...styles.title, color: props._color}}>
      nuestros usuarios
      </Text>
    <ScrollView>
      <View style={styles.imagen}>
        <Image style={styles.img} source={require("../images/formZero.png")} />
      </View>
      <Text style={styles.description}>
        Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.
      </Text>
    </ScrollView>
  <TouchableOpacity
    onPress={()=>props.getTypeUser(null, null)}
    style={{...styles.btnRegister, backgroundColor: props._color}}>
      <Text style={styles.btnRegisterText}>Volver</Text>
    </TouchableOpacity>
    <View style={{ ...styles.shadow, backgroundColor: props._color, height: "40%" }}></View>
  </View>
  )
}

const PageTwo = (props) => {
  return (
    <View style={styles.page}>
    <Text style={{...styles.title, color: props._color}}>¿Qué es {props.value}?</Text>
    <ScrollView>
      <View style={styles.imagen}>
        <Image style={styles.img} source={require("../images/formOne.png")} />
      </View>
      <Text style={styles.description}>
        Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.
      </Text>
    </ScrollView>
    <TouchableOpacity
    onPress={()=>props.getTypeUser(props.id,props.value)}
    style={{...styles.btnRegister, backgroundColor: props._color}}>
      <Text style={styles.btnRegisterText}>registrarme</Text>
    </TouchableOpacity>
    <View style={{ ...styles.shadow, backgroundColor: props._color, height: "40%" }}></View>
  </View>
  )
}

const PageTree = (props) => {
  return (
    <View style={styles.page}>
      <Text style={{...styles.title, color: props._color}}>¿Qué es {props.value}?</Text>
      <ScrollView>
        <View style={styles.imagen}>
          <Image style={styles.img} source={require("../images/formTwo.png")} />
        </View>
        <Text style={styles.description}>
          Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.
        </Text>
      </ScrollView>
      <TouchableOpacity
       onPress={()=>props.getTypeUser(props.id,props.value)}
      style={{...styles.btnRegister, backgroundColor: props._color}}>
      <Text style={styles.btnRegisterText}>registrarme</Text>
    </TouchableOpacity>
    <View style={{ ...styles.shadow, backgroundColor: props._color, height: "40%" }}></View>
    </View>
  )
}

const PageFour = (props) => {
  return (
    <View style={styles.page}>
    <Text style={{...styles.title, color: props._color}}>¿Qué es {props.value}?</Text>
    <ScrollView>
      <View style={styles.imagen}>
        <Image style={styles.img} source={require("../images/formThree.png")} />
      </View>
      <Text style={styles.description}>
        Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.
      </Text>
    </ScrollView>
    <TouchableOpacity
    onPress={()=>props.getTypeUser(props.id,props.value)}
    style={{...styles.btnRegister, backgroundColor: props._color}}>
      <Text style={styles.btnRegisterText}>registrarme</Text>
    </TouchableOpacity>
    <View style={{ ...styles.shadow, backgroundColor: props._color, height: "40%" }}></View>
  </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    zIndex: 2,
    width: windowWidth,
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center"
  },
  wrapper: {
    width: "90%",
    height: "85%",
    alignSelf: "center",
    backgroundColor: color_white,
    borderRadius: 8,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    overflow: "hidden"
  },
  footer: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    justifyContent: "center",
    flexDirection: "row"
  },
  shadow: {
    position: "absolute",
    zIndex: -1,
    width: "200%",
    bottom: -90,
    transform: [{ rotateZ: "350deg" }]
  },
  page: {
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 50,
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    padding: 5
  },
  title: {
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom:10
  },
  description: {
    paddingBottom:60,
    color: color_grey_dark,
    fontSize: 13,
    textAlign: "justify"
  },
  imagen: {
    alignSelf:"center",
    width: windowWidth / 2,
    height: windowWidth / 2,
  },
  img: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: "cover"
  },
  btnRegister: {
    marginTop:10,
    position: "relative",
    zIndex: 99999,
    borderColor: color_white,
    borderWidth: 1,
    borderRadius: 12,
    width: "60%",
    alignSelf: "center",
    paddingVertical: 5
  },
  btnRegisterText: {
    textTransform: "capitalize",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: color_white
  },
});