import React, { useState } from 'react'
import { SafeAreaView,Text, View, ScrollView } from 'react-native'
import Head from '../components/generic/Head';
import MenuVertical from '../components/generic/MenuVertical.js';
import Menu from '../components/generic/Menu';
import { color_screen } from '../styles/Colors'
// import ProcessList from '../components/horizontalList/ProcessList.js'
// import SpecialsList from '../components/horizontalList/SpecialsList.js'


import ValorationsListMedic from '../components/valorations/ValorationsList.js'

function DashboardMedic(props) {
  const [vertical, setvertical] = useState(false);

  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color_screen }}>
      <Head props={props} return=""
        show={vertical}
        action={setvertical}
      />
      <ScrollView scrollEventThrottle={16}>








   <ValorationsListMedic goToScreen={goToScreen}/>


      {/*
        <View style={{ paddingBottom: 60 }}>
          <ProcessList goToScreen={goToScreen} />
          <SpecialsList goToScreen={goToScreen} /> 
        </View
      */}


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
    </SafeAreaView>
  )
}
export default React.memo(DashboardMedic);


