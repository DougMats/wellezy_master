import React, { useState } from 'react'
import { Animated, StyleSheet, Modal, Dimensions, TouchableOpacity, Image, ScrollView, Text, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Icon } from 'react-native-eva-icons'
import { currencyFormat, letterCounter } from '../../../components/Logic'
import CardHotelRoom from '../../../components/cards/CardHotelRoom.js'

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

function SectionOffers(props) {
  const { t, i18n } = useTranslation();
  const [zoom, setzoom] = useState(false);
  const [rooms, setrooms] = useState(props.data.rooms);

  const [listOffers, setlistOffers] = useState([
    { id: 1, price: 267676, title: "MÁS ECONOMICO" },
    { id: 2, price: 267676, title: "DESAYUNO GRATIS" },
    { id: 3, price: 287676, title: "CANCELACION GRATUITA" },
    { id: 4, price: 280000, title: "DESAYUNO GRATIS Y CANCELACION GRATUITA" },
    { id: 5, price: 280000, title: "DESAYUNO GRATIS Y CANCELACION GRATUITA" },
    { id: 6, price: 280000, title: "DESAYUNO GRATIS Y CANCELACION GRATUITA" }
  ]);

  const [filtro, setfiltro] = useState(1);


  // const [viewer, setviewer] = useState(null);
  // 
  // const [selected, setselected] = useState(0);
  // const [open, setopen] = useState(0);
  //props.sticky
  // const [filtre, setfiltre] = useState([
  //   {value: true,  title: "DESAYUNO GRATIS" },
  //   {value: false, title: "CANCELACION GRATUITA" },
  //   {value: false, title: "DESAYUNO GRATIS Y CANCELACION GRATUITA" },
  // ]);


  return (
    <View style={{ margintop: 20, position: "relative", zIndex: -1 }}>





      <View style={{
        backgroundColor: "rgba(0,0,0,0.05)",
        paddingHorizontal:10,
        paddingVertical:20,
        ...styles.wrap
      }}>
        {listOffers.map((i, key) => {
          return (
            <Offert key={key} data={i} active={filtro} select={setfiltro} />
          )
        })}
      </View>






      {/*

    <View style={{ backgroundColor:"red", width:"80%"}}>
      <Text style={{}}>ergertetyerty ergertetyerty</Text>
      </View>
      <TouchableOpacity style={{ backgroundColor:"yellow", width:"20%"}}>
      
      </TouchableOpacity>
    </View>
    <Text style={{ paddingHorizontal: 20, marginVertical: 10, fontSize: 18, fontWeight: "bold", color: color_fifth }}>Ofertas imperdibles:</Text>
    <Icon name={"checkmark-circle-2-outline"} width={25} height={25} fill={"silver"} />
  </View> 
  <View style={styles.wrap}>
    {listOffers.map((i, key) => {
    return (
    <Offert key={key} data={i} />
    )
    })}
  </View> 
  */}

      <View style={styles.wrap}>
        {rooms.map((i, key) => {
          return (<CardHotelRoom key={key} data={i} goToScreen={props.goToScreen} />)
        })}
      </View>


    </View>
  )
}
export default SectionOffers;

//3002102001 yennifer alvarez

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    width: "100%",
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
  },
})

const Offert = (props) => {
  const [open, setopen] = useState(false);
  return (
    <View style={{
      backgroundColor: "white",
      padding: 5,
      justifyContent:"space-around",
      minHeight:60,
      width: windowWidth/3-10,
      marginBottom: 5,
      borderRadius: 8
    }}>
      <TouchableOpacity onPress={() => props.select(props.data.id)}
        style={{
          position: "absolute",
          top: 2.5,
          right: 2.5,
          zIndex: 999
        }}>
        <Icon width={20} height={20}
          name={props.data.id === props.active ? "checkmark-circle-2-outline" : "radio-button-off-outline"}
          fill={props.data.id === props.active ? color_star : color_grey_half}
        />
      </TouchableOpacity>
      <Text style={{ fontWeight: "bold", fontSize: 14 }}>{currencyFormat("$", props.data.price)}</Text>
      <Text style={{fontSize:14}}>
        {open? props.data.title: letterCounter(props.data.title, 20)}  
      </Text>
      {props.data.title.length > 20 &&
       <TouchableOpacity onPress={()=>setopen(!open)}
          style={{ position: "absolute", bottom: 2.5, right: 2.5, zIndex: 999 }}>
          <Icon width={20} height={20}
            name={open ? "arrow-ios-downward-outline" : "arrow-ios-forward-outline"}
            fill={color_grey_half}
          />
        </TouchableOpacity>
      }
    </View>
  )
}