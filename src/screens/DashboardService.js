import React, { useState, useEffect, useContext } from 'react'
import { SafeAreaView, Text, View, ScrollView, Modal } from 'react-native'
import Head from '../components/generic/Head';
import MenuVertical from '../components/generic/MenuVertical.js';
import Menu from '../components/generic/Menu';
import { color_screen } from '../styles/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler';
import UserContext from '../../contexts/UserContext'
// import ProcessList from '../components/horizontalList/ProcessList.js'
// import SpecialsList from '../components/horizontalList/SpecialsList.js'
import { services } from '../services/connection'

import SelectType from '../components/dashboard/service/SelectType.js'

function DashboardService(props) {
  const { userDetails, setUserDetails } = useContext(UserContext);

  const [selectType, setselectType] = useState(false);
  const [vertical, setvertical] = useState(false);


  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }

  useEffect(() => {
    console.log("first effect screen")
    if (userDetails.service === 1) {
      setselectType(true)
    }
    else {
      getProfile(userDetails.service, userDetails.id)
    }
  }, [props]);



  async function getProfile(type, id) {
    const myProfile = await services.getProfile(type, id)
    
    if (myProfile[0] !== false) {
      console.log(userDetails.id, "___mi profile /0 : ", myProfile[0])
      console.log(userDetails.id, "___mi profile /1 : ", myProfile[1])
    }
    else {
      console.log("undefined ",userDetails.service)
      if(userDetails.service === 2){ goToScreen("CreateProfileNurse", null)}
      if(userDetails.service === 3){ goToScreen("CreateProfileDriver", null)}
    }









    // [
    //   false,
    //   "error"
    // ]

    // [
    //   false,
    //   null
    // ]


    // [
    //   "name",
    //  {}
    // ]

  }






  /*
  console.log("...... servise dashboard ...........", userDetails.service )
  {"email": "Cardenas@gmail.com",
  "id": 9,
  "language": "en",
  "name": "Carlos jose",
  "password": "e10adc3949ba59abbe56e057f20f883e",
  "phone": "315 2077862",
  "photo_profile": "85052035-ser.png",
  "rol": "service",
  "service": "not assigned",
  "surname": "Cardenas"
  }
  */
  function clear() {
    console.log("---------- ............ ,,,,,,,,,,,, ")
    setselectType(false)
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color_screen }}>
      <Head props={props} return=""
        show={vertical}
        action={setvertical}
      />

      <Text>id: {userDetails.id}</Text>
      <Text>name: {userDetails.name}</Text>
      <Text>surname: {userDetails.surname}</Text>
      <Text>phone: {userDetails.phone}</Text>
      <Text>email: {userDetails.email}</Text>
      <Text>language: {userDetails.language}</Text>
      <Text>password: {userDetails.password}</Text>
      <Text>rol: {userDetails.rol}</Text>
      <Text>service: {userDetails.service}</Text>
      <Text>photo_profile: {userDetails.photo_profile}</Text>

      <ScrollView scrollEventThrottle={16}>
        <View style={{ paddingBottom: 60 }}>
          {/* <TouchableOpacity onPress={() => goToScreen("RCU_Service", null)}>
            <Text>{userDetails.service}</Text>
          </TouchableOpacity> */}
          {/* <ProcessList goToScreen={goToScreen} />
          <SpecialsList goToScreen={goToScreen} /> */}
        </View>
      </ScrollView>

      <Menu
        props={props}
        option={1}
        alert={0}
      />
      {vertical === true &&
        <MenuVertical
          width={280}
          show={vertical}
          action={setvertical}
          goToScreen={goToScreen}
        />
      }

      <SelectType open={selectType} userDetails={userDetails} clear={clear} />

    </SafeAreaView>
  )
}

export default React.memo(DashboardService);


