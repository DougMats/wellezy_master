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

function PreRegistration(props) {
  const [page, setpage] = useState(0);
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
          {/* <Text style={{position: "absolute",top: 5,left: 5,}}>count: {props.data.length}</Text> */}
          <TouchableOpacity
            style={{ position: "absolute", zIndex: 9, top: 5, right: 5 }}
            onPress={() => props.close(false)}>
            <Icon name={"close"} width={25} height={25} fill={color_fifth} />
          </TouchableOpacity>
          {props.data.map((i, key) => {
            if (page === i.id) {
              return (
                <Page key={key} data={i} getTypeUser={props.get} />
              )
            }
          })}
          <View style={styles.footer}>
            {props.data.map((i, key) => {
              return (
                <TouchableOpacity key={key} onPress={() => setpage(i.id)}>
                  <Icon name={page === i.id ? "radio-button-on" : "radio-button-off"} width={size} height={size} fill={color_white} style={{ marginHorizontal: 5 }} />
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
      </GestureRecognizer>
    )
  }
  if (props.status === false) { return (<></>) }
}
export default PreRegistration;


const Page = (props) => {
  return (
    <View style={styles.page}>
      <Text style={{ ...styles.title, color: props._color }}>....{props.data.name}</Text>
      <ScrollView>
        <View style={styles.imagen}>
          {/* <Image style={styles.img} source={require(`../images/${props.data.img}`)} /> */}
        </View>
        <Text style={styles.description}>
          {props.data.description}
        </Text>
      </ScrollView>
      {props.data.id === 0 ?
        <TouchableOpacity
          onPress={() => props.getTypeUser(null, null)}
          style={{ ...styles.btnRegister, backgroundColor: props._color }}>
          <Text style={styles.btnRegisterText}>Volver</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity
          onPress={() => props.getTypeUser(props.id, props.value)}
          style={{ ...styles.btnRegister, backgroundColor: props._color }}>
          <Text style={styles.btnRegisterText}>registrarme cómo {props.data.name}</Text>
        </TouchableOpacity>
      }
      <View style={{ ...styles.shadow, backgroundColor: props.data.color, height: "40%" }}></View>
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
    marginBottom: 10
  },
  description: {
    paddingBottom: 60,
    color: color_grey_dark,
    fontSize: 13,
    textAlign: "justify"
  },
  imagen: {
    alignSelf: "center",
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
    marginTop: 10,
    position: "relative",
    zIndex: 99999,
    borderColor: color_white,
    borderWidth: 1,
    borderRadius: 12,
    width: "80%",
    alignSelf: "center",
    paddingVertical: 10
  },
  btnRegisterText: {
    textTransform: "uppercase",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: color_white
  },
});