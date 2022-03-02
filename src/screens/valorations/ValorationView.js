import { get } from 'lodash'
import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, Text } from 'react-native'

function ValorationView(props) {


  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = 1 }

  useEffect(() => {
    get()
  }, [randomCode]);

  // else{screen = 'Home';}
  // // let key_conference = data.key_generated;
  // // if (data.status === 0) { screen = 'HistoryClinicForm'; }
  // // if (data.status === 1) { screen = 'UploadPictures'; }
  // // if (data.status === 2) { screen = 'Sala'; }
  // props.navigation.navigate(screen, { randomCode: Math.random(), data, key_conference })

  async function get() {

  }


  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }


  return (
    <SafeAreaView>
      <Text>rterte</Text>
    </SafeAreaView>
  )
}
export default ValorationView;
