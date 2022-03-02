import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView, Text, View, StyleSheet, BackHandler, Alert } from "react-native";
import JitsiMeet, { JitsiMeetView } from 'react-native-jitsi-meet';
import UserContext from '../../../contexts/UserContext'
//import SideBar from '../../components/SideBar/SideBar.js';
import SideBarClient from './SideBarClient.js';
import SideBarMedic from './SideBarMedic.js';

const App = (props) => {

  const [data, setdata] = useState(props.route.params.data);
  const [HistoriClinica, setHistoriClinica] = useState(props.route.params.data.historyClinic);
  const [listadoDeImagenes, setlistadoDeImagenes] = useState(props.route.params.data.photos);
  const { userDetails } = useContext(UserContext);
  const url = `https://meet.jit.si/${props.route.params.key_conference}`;

  const userInfo = {
    displayName: userDetails.name + " " + userDetails.surname,
    email: userDetails.email,
    avatar: userDetails.photo_profile,
  };

  let randomCode
  if (props.route.params) {
    randomCode = props.route.params.randomCode
  } else {
    randomCode = 1
  }


  useEffect(() => {
    // console.log("first time")
    // JitsiMeet.endCall();

    setTimeout(() => {
      JitsiMeet.call(url, userInfo);
      console.log("init call")
    }, 1000);


  }, [randomCode])







  const backAction = () => {
    Alert.alert(
      "Atención!", "Desea salir de la video llamada?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => endCalling() }
      //{ text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };






  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);


  function endCalling() {
    console.log("-> my destroyer, proceso para salir de la video llamada")
    JitsiMeet.endCall();
    goToScreen("Sala");
  }

  function goToScreen(screen) {
    JitsiMeet.endCall();
    console.log("--> go to screen")
    props.navigation.navigate(screen, { randomCode: Math.random() })
  }

  function Call() {
    return <JitsiMeetView
      onConferenceTerminated={e => onConferenceTerminated(e)}
      onConferenceJoined={e => onConferenceJoined(e)}
      onConferenceWillJoin={e => onConferenceWillJoin(e)}
      style={{
        marginBottom: 0,
        height: '100%',
        width: '100%',
      }}
    />
  }




  function onConferenceTerminated(nativeEvent) {
    console.log("terminated local");
    //   endCalling()
    //   // console.log("onConferenceTerminated ")
    //  // JitsiMeet.endCall();
    goToScreen("Sala");
  }
  function onConferenceJoined(nativeEvent) {
    console.log("onConferenceJoined ")
  }
  function onConferenceWillJoin(nativeEvent) {
    console.log("onConferenceWillJoin ")
  }







  return (
    <SafeAreaView style={{ flex: 1 }}>

      {
        userDetails.rol === "client" &&
        <SideBarClient data={data}
          //HistoriClinica={HistoriClinica}
          //listadoDeImagenes={listadoDeImagenes}
          userDetails={userDetails}
        />
      }



      {
        userDetails.rol === "medic" &&
        <SideBarMedic
          data={data}
          //HistoriClinica={HistoriClinica}
          //listadoDeImagenes={listadoDeImagenes}
          userDetails={userDetails}
        />

      }


      <Call />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
export default App;