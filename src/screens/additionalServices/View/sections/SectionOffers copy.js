import React, { useState } from 'react'
import { Animated, StyleSheet, Modal, Dimensions, TouchableOpacity, Image, ScrollView, Text, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Icon } from 'react-native-eva-icons'
import { currencyFormat, letterCounter } from '../../../../components/Logic'
import CardHotelRoom from '../../../../components/cards/CardHotelRoom.js'

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
} from '../../../../styles/Colors'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function SectionOffers(props) {
  const { t, i18n } = useTranslation();
  const [zoom, setzoom] = useState(false);
  const [viewer, setviewer] = useState(null);
  const [filto, setfilto] = useState(0);
  const [rooms, setrooms] = useState(props.data.rooms);





  // const [selected, setselected] = useState(0);
  // const [open, setopen] = useState(0);
  //props.sticky


  const [listOffers, setlistOffers] = useState([
    { id: 1, price: 190000, title: "nuestro precio más economico" },
    { id: 2, price: 267676, title: "DESAYUNO GRATIS" },
    { id: 3, price: 287676, title: "CANCELACION GRATUITA" },
    { id: 4, price: 280000, title: "DESAYUNO GRATIS Y CANCELACION GRATUITA" },
    { id: 5, price: 300000, title: "DESAYUNO GRATIS" },
    { id: 5, price: 390000, title: "DESAYUNO GRATIS" },
  ]);


  // const [filtre, setfiltre] = useState([
  //   {value: false, title: "nuestro precio mas economico" },
  //   {value: true,  title: "precio recomendado DESAYUNO GRATIS" },
  //   {value: false, title: "nuestro precio mas eonomico con CANCELACION GRATUITA" },
  //   {value: false, title: "nuestro precio mas eonomico con DESAYUNO GRATIS Y CANCELACION GRATUITA" },
  //   {value: false, title: "nuestro precio mas eonomico con DESAYUNO GRATIS" }
  // ]);


  function goToScreen() {
    console.log("go.........")
  }

  return (
    <View style={{ margintop: 20 }}>


      {/* <View style={{
        backgroundColor: "blue",
        flexDirection: "row"
      }}>
        <Text style={{ paddingHorizontal: 20, marginVertical: 10, fontSize: 18, fontWeight: "bold", color: color_fifth }}>Ofertas imperdibles:</Text>
        <Icon name={"checkmark-circle-2-outline"} width={25} height={25} fill={"silver"} />
      </View> */}


      <View style={styles.wrap}>
        {listOffers.map((i, key) => {
          return (
            <Offert key={key} data={i} />
          )
        })}
      </View>

      <View style={styles.wrap}>
        {
          rooms.map((i, key) => {
            return (<CardHotelRoom key={key} data={i} goToScreen={goToScreen} />)
          })
        }
      </View>

    </View>
  )
}
export default SectionOffers;

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    width: "100%",
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
  },


  offert: {
    padding: 10,
    backgroundColor: color_white,
    width: windowWidth / 2 - 10,
    marginBottom: 10,
    borderRadius: 8,
    justifyContent: "space-between"
  },
  offertTitle: {
    fontSize: 14,
    width: "85%",
  },
  offertPrice: {
    fontWeight: "bold",
    fontSize: 20
  },
})








const Offert = (props) => {
  const [show, setshow] = useState(false);

  // function open() {
  //   setshow(!show)
  //   console.log("open")
  // }

  // function close() {
  //   //setshow(false)
  //   console.log("close")
  //}

  return (
    <TouchableOpacity
      style={{ ...styles.offert, height: 80 }}
      onPress={() => setshow(!show)}
    >
      <TouchableOpacity
        style={{
          zIndex: 999,
          position: "absolute",
          top: 5,
          right: 5
        }}
        onPress={() => console.log("............")}>
        <Icon name="checkmark-circle-2-outline" fill={color_fifth} width={30} height={30} />
      </TouchableOpacity>
      <Text style={styles.offertTitle}>

        {show ? props.data.title : letterCounter(props.data.title, 20)}
      </Text>
      <Text style={styles.offertPrice}>$.{props.data.price}</Text>
    </TouchableOpacity>
  )
}

{/* <Animated.View
style={{ ...styles.offert, height: 80 }}
onStartShouldSetResponder={() => true}
onResponderStart={open}
onResponderEnd={close}
>
</Animated.View> */}


// const Card = (props) => {
//   return (
//     <TouchableOpacity style={{
//       width: "100%",
//       borderRadius: 8,
//       alignSelf: "center",
//       backgroundColor: color_white,
//       marginBottom: 5,
//       padding: 10,
//       flexDirection: "column"
//     }}>
//       <Text style={{}}>{props.data.title}</Text>
//       <Text style={{ fontSize: 18, fontWeight: "bold" }}>{currencyFormat("$", props.data.price)}</Text>
//     </TouchableOpacity>
//   )
// }