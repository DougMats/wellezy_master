import React, { useState } from 'react'
import { SafeAreaView, View, ScrollView } from 'react-native'
import Head from '../components/generic/Head';
import MenuVertical from '../components/generic/MenuVertical.js';
import Menu from '../components/generic/Menu';
import { color_screen } from '../styles/Colors'
import ProcessList from '../components/horizontalList/ProcessList.js'
import SpecialsList from '../components/horizontalList/SpecialsList.js'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

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
      <Head alert={0} props={props} return="" show={vertical} action={setvertical}/>
      <ScrollView scrollEventThrottle={16}>
        <View style={{ paddingBottom: 60,}}>
          <ProcessList goToScreen={goToScreen} />
          <SpecialsList goToScreen={goToScreen} />
        </View>
      </ScrollView>
      <Menu
        props={props}
        option={1}
        alert={0}
      />
      <GestureRecognizer onSwipeLeft={() => onSwipeLeft()} config={config} style={{width: 30,height: "100%",position: "absolute",zIndex: 999,top: 0,right: 0}}></GestureRecognizer>
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