import React, { useState } from 'react'
import { SafeAreaView, TouchableOpacity, View, ScrollView, Text } from 'react-native'
import Head from '../components/generic/Head';
import MenuVertical from '../components/generic/MenuVertical.js';
import Menu from '../components/generic/Menu';
import { color_screen } from '../styles/Colors'
import ProcessList from '../components/horizontalList/ProcessList.js'
import SpecialsList from '../components/horizontalList/SpecialsList.js'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import SVG from '../components/SVG.js'
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
    console.log("<---")
    setvertical(true)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color_screen }}>
      <Head
      alert={0}
      props={props}

      return=""
        show={vertical}
        action={setvertical}
      />
      <ScrollView scrollEventThrottle={16}>
        <View style={{ paddingBottom: 60 }}>
          {/* 
          <TouchableOpacity
            onPress={() => goToScreen("NotNetwork", null)}>
            <Text>not network</Text>
          </TouchableOpacity> */}
          <ProcessList goToScreen={goToScreen} />
          <SpecialsList goToScreen={goToScreen} />
          {/* <SVG name={'alert-circle-outline'} width={30} height={30} fill={'red'}/> */}
        </View>
      </ScrollView>
      <Menu
        props={props}
        option={1}
        alert={0}
      />
      <GestureRecognizer
        onSwipeLeft={() => onSwipeLeft()}
        config={config}
        style={{
          //backgroundColor: "red",
          width: 30,
          height: "100%",
          position: "absolute",
          zIndex: 999,
          top: 0,
          right: 0
        }}
      >
      </GestureRecognizer>
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