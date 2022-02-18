import React, { useState, useEffect } from 'react';
import { ActivityIndicator, SafeAreaView, StatusBar, ScrollView, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import Head from '../../components/generic/Head';
import Menu from '../../components/generic/Menu';
import { colorAlfa } from '../../styles/Colors';
import { services } from '../../services/connection.js';

import Hotels from './Hotels'
import Specials from './Specials'
import Nurses from './Nurses'
import HomeRecovery from './HomeRecovery.js';


// import Driver from './Driver'

// import WellezyInfo from '../../components/WellezyInfo.js';
// import Vuelos from './Vuelos.js';


function MoreServices(props) {
  const { t, i18n } = useTranslation();
  const { navigation } = props
  const [TIP, setTIP] = useState(7); 2 //vista 
  const [Load, setLoad] = useState(false);
  const [horizonOptions, sethorizonOptions] = useState([]);//opciones horizontales

  let randomCode
  if (props.route.params) {
    randomCode = props.route.params.randomCode
  } else {
    randomCode = 1
  }

  useEffect(() => {
    //setTIP(2);
    Get();
  }, [randomCode]);

  async function Get() {
    const servicesList = await services.servicesList(i18n.language)
    sethorizonOptions(servicesList);
  }

  function goToScreen(screen, data) {
    let from = 'MoreServices'
    props.navigation.navigate(screen, { randomCode: Math.random(), data, from })
  }

console.log("TIP: ", TIP)



  function Horizon(data) {
    try {
      if (data !== null) {
        return (
          <View>
          <ScrollView scrollEventThrottle={16} horizontal={true} showsHorizontalScrollIndicator={false} style={{
            borderTopColor: "#eee",
            borderTopWidth: 0.5, backgroundColor: "white", paddingVertical: 5
          }}>
            {
              data.map((i, key) => {
                return (
                  <TouchableOpacity key={key}
                    onPress={() => setTIP(i.id)}
                    style={[styles.optionHorizon, { borderBottomColor: TIP == i.id ? "#00AFE8" : "#00AFE8", borderBottomWidth: TIP == i.id ? 1 : 0, }]}>
                    <Text style={[styles.nameOptHorizon, { color: TIP == i.id ? "#00AFE8" : "#ccc" }]}>{i.name}</Text>
                  </TouchableOpacity>
                )
              })
            }
          </ScrollView>
          </View>
        );
      }
    } catch (error) { }
  }

  return (
    <SafeAreaView style={{ flex: 1, }}>
      <StatusBar backgroundColor="white" barStyle='dark-content' />
      {/* <ScrollView scrollEventThrottle={16} horizontal={false}> */}
        <Head props={props} />
        {Load &&
          <View style={{ height: "100%", justifyContent: "center" }}>
            <ActivityIndicator color={colorAlfa} size='large' />
          </View>
        }
        {!Load && Horizon(horizonOptions)}
        <View style={styles.wrap}>

          {TIP === 2 && <Hotels props={props} goToScreen={goToScreen} />}
          {TIP === 6 && <Nurses props={props} goToScreen={goToScreen} />}
          {TIP === 7 && <HomeRecovery props={props} goToScreen={goToScreen} />}
          {TIP === 8 && <Specials props={props} goToScreen={goToScreen} />}

        </View>
      {/* </ScrollView> */}
      <Menu props={props} option={3} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  optionHorizon: {
    flexDirection: "column",
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    alignContent: "center",
    alignItems: "center"
  },
  nameOptHorizon: {
    textAlign: "center",
    lineHeight: 20,
    fontSize: 12,
    color: "#ccc"
  },
  wrap: {
    flexDirection: "column",
    justifyContent: 'center',
    paddingBottom: 60
  },
});

export default MoreServices;