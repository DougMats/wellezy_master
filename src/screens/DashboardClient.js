import React, { useState } from 'react'
import { SafeAreaView, View, Image, Text, TouchableOpacity, ScrollView } from 'react-native'
import Head from '../components/generic/Head';
import MenuVertical from '../components/generic/MenuVertical.js';
import Menu from '../components/generic/Menu';
import { color_screen, color_white } from '../styles/Colors'
import ProcessList from '../components/horizontalList/ProcessList.js'
import ServicesList from '../components/horizontalList/ServicesList.js'
import SpecialsList from '../components/horizontalList/SpecialsList.js'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import Logo from '../components/generic/Logo';
import IconSvg from '../svg/icon_svg.js';
import LinearGradient from 'react-native-linear-gradient';

function DashboardClient(props) {
  const [vertical, setvertical] = useState(false);

  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };

  const onSwipeLeft = () => {
    setvertical(true)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color_screen }}>
      <Logo />
      <Head alert={0} props={props} return="" show={vertical} action={setvertical} />
      <ScrollView scrollEventThrottle={16}>
        <View style={{ paddingBottom: 60, }}>
        <IconSvg name={"icono-two"} width={100} height={100} fill={"red"} gradient={true} colors={["red","yellow"]}/>
          <ServicesList goToScreen={goToScreen} />
          <SpecialsList goToScreen={goToScreen} />
          <ProcessList goToScreen={goToScreen} />
        </View>
      </ScrollView>
      <Menu
        props={props}
        option={1}
        alert={0}
      />
      <GestureRecognizer onSwipeLeft={() => onSwipeLeft()} config={config} style={{ width: 30, height: "100%", position: "absolute", zIndex: 999, top: 0, right: 0 }}></GestureRecognizer>
      {vertical === true &&
        <MenuVertical
          width={280}
          show={vertical}
          action={setvertical}
          goToScreen={goToScreen}
        />
      }



    </SafeAreaView>
  )
}
export default DashboardClient;