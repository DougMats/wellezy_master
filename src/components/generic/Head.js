import React, { useState, useContext } from 'react';
import { StatusBar, Text, View, TouchableOpacity, Image, StyleSheet, Modal } from 'react-native';
import IconSvg from '../../svg/icon_svg.js'
import UserContext from '../../../contexts/UserContext';
import { useTranslation } from 'react-i18next';

import CartShop from '../icons/CartShop.js'
import Alert from '../icons/Alert.js'

import { file_server1 } from '../../../Env.js';
import { InitialsName } from '../Logic.js';

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
} from '../../styles/Colors';

function Index(props) {
  const { t, i18n } = useTranslation();
  const [notificationToken, setNotificationToken] = useState('')
  const { userDetails } = useContext(UserContext)
  const [modal, setmodal] = useState(false)

  function goToScreen(screen, data) {
    props.props.navigation.navigate(screen, { randomCode: Math.random(),data })
  }

  let colorUser
  if (userDetails.rol === "client") { colorUser = "yellow" }
  if (userDetails.rol === "service") { colorUser = "orange" }
  if (userDetails.rol === "medic") { colorUser = "red" }

  function onChangeText(text, key) {
    let data = text
    props.props.navigation.navigate("Search", { randomCode: Math.random(), data })
  }

  return (
    <View style={{ flexDirection: "column", backgroundColor: color_white, paddingBottom: 10, paddingTop: 20 }}>
      <StatusBar backgroundColor={color_white} barStyle='dark-content' translucent={false} />
      <View style={{ flexDirection: "row", paddingHorizontal: 20 }}>
        <View style={{ paddingVertical: 2, justifyContent: "center", alignItems: "center", width: "70%" }}>
          <TouchableOpacity onPress={() => goToScreen("Search")}
            style={{ width: "90%", height: 40, paddingHorizontal: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#F0F0F0", borderRadius: 8 }}>
            <Text style={{ color: "silver" }}>Search...</Text>
            <IconSvg name={"search-outline"} width={30} height={30} fill={"silver"} />
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent:"space-around", width:"30%", flexDirection:"row"}}>   
        {userDetails.rol === "client" &&
          <View style={{ justifyContent: "center", alignItems: "center", width: "33%" }}>
            <CartShop user={userDetails.id} goToScreen={goToScreen} />
          </View>
        }
        <View style={{ justifyContent: "center", alignItems: "center", width: "33%" }}>
          <Alert user={userDetails.id} rol={userDetails.rol} lang={i18n.language} goToScreen={goToScreen} />
        </View>

        <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", width: "33%", }} onPress={() => props.action(true)}>
         <IconSvg name={"menu-outline"} width={30} height={30} fill={"silver"} />
        </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
const stylesHead = StyleSheet.create({});
export default React.memo(Index);