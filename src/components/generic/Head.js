import React, { useState, useContext } from 'react';
import { StatusBar, ScrollView, Text, View, TouchableOpacity, Image, StyleSheet, Modal } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import UserContext from '../../../contexts/UserContext';
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
} from '../../styles/Colors';

import CartShop from '../icons/CartShop.js'

import Alert from '../icons/Alert.js'


import { file_server1 } from '../../../Env.js';
import { InitialsName } from '../Logic.js';
import { TextInput } from 'react-native-gesture-handler';
import { touch } from 'react-native-fs';
import { useEffect } from 'react';

function Index(props) {


  const { t, i18n } = useTranslation();
  const [notificationToken, setNotificationToken] = useState('')
  const { userDetails } = React.useContext(UserContext)
  const [modal, setmodal] = useState(false)
  //const [search, setsearch] = useState({text:null})




  // useEffect(() => {
  //   if (search.text !== null) {
  //     let data = search.text
  //     console.log("data: ", data)
  //     props.props.navigation.navigate("Search", { randomCode: Math.random(), data })
  //   }
  // }, [search]);



  function goToScreen(screen) {
    props.props.navigation.navigate(screen, { randomCode: Math.random() })
  }

  let colorUser
  if (userDetails.rol === "client") { colorUser = "yellow" }
  if (userDetails.rol === "service") { colorUser = "orange" }
  if (userDetails.rol === "medic") { colorUser = "red" }




  // function onChangeText(text, key) {
  //   setsearch({
  //     ...search,
  //     [key]: text
  //   })
  // }

  function onChangeText(text, key) {
    let data = text
    props.props.navigation.navigate("Search", { randomCode: Math.random(), data })

  }

  return (
    <View style={{
      flexDirection: "column",
      backgroundColor: color_white,
      paddingBottom: 10,
      paddingTop: 20,
      // borderBottomWidth:0.5,
      // borderBottomColor:"silver",
      // height: 200
    }}>
      <StatusBar backgroundColor={color_white} barStyle='dark-content' translucent={false} />
      <View style={{ flexDirection: "row", paddingHorizontal: 20 }}>
       
       
       <View style={{ paddingVertical: 2, justifyContent: "center", alignItems: "center", width: "70%" }}>
          <TouchableOpacity onPress={() => goToScreen("Search")}
            style={{ width: "90%", height: 40, paddingHorizontal: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#F0F0F0", borderRadius: 8 }}>
            <Text style={{ color: "silver" }}>Search...</Text>
            {/* <TextInput
              placeholder='Search...'
              style={{ width: "90%" }} 
              onChangeText={text => onChangeText(text, 'text')}
              //value={search.text}
            /> */}
            <Icon name={"search-outline"} width={30} height={30} fill={"silver"} />
          </TouchableOpacity>
        </View>

<View style={{justifyContent: "center", alignItems: "center", width: "10%"}}>
  <CartShop user={userDetails.id} goToScreen={goToScreen}/>
</View>

      
<View style={{justifyContent: "center", alignItems: "center", width: "10%"}}>
  <Alert user={userDetails.id} goToScreen={goToScreen}/>
</View>


       


        



        <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", width: "10%", }} onPress={() => props.action(true)}>
          <Icon name={"menu-outline"} width={30} height={30} fill={"silver"} />
        </TouchableOpacity>
      </View>

    </View>
  )


  return (
    <View style={{
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-around",
      backgroundColor: color_white,
      paddingVertical: 10,
      paddingHorizontal: 20,
      height: 75,
      minHeight: 75,
    }}>
      <StatusBar backgroundColor={color_white} barStyle='dark-content' translucent={false} />{/*translucent 'default' 'light-content' 'dark-content'*/}
      <View style={{ width: "70%", marginTop: 10 }}>
        <Image style={{
          width: 120,
          height: 50,
        }}
          source={require("../../images/logo2.png")}
        />
      </View>
      <View style={{ justifyContent: "center", alignContent: "center", alignItems: "center", width: "30%", height: 60 }}>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => [props.action(true), console.log("press head")]}/* onPress={() => goToScreen("Profile")} */ >
          <View style={{
            width: 60,
            height: 60,
            borderRadius: 60,
            overflow: "hidden",
            borderWidth: 2,
            borderColor: colorUser,
            borderColor: userDetails.photo_profile === "" ? color_star : color_grey_light,
            backgroundColor: userDetails.photo_profile === "" ? color_star : color_white,
          }}>
            {userDetails.photo_profile !== "" && <Image style={{
              width: null,
              height: null,
              resizeMode: "cover",
              flex: 1
            }} source={{ uri: `${file_server1}/img/wellezy/users/${userDetails.photo_profile}` }} />}
            {userDetails.photo_profile === "" && <Text style={{
              textTransform: "uppercase",
              backgroundColor: color_star,
              width: 65,
              height: 60,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              lineHeight: 50,
              fontSize: 30,
              fontWeight: "bold",
            }} >{InitialsName(userDetails.name, userDetails.surname)} </Text>}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const stylesHead = StyleSheet.create({});
export default React.memo(Index);