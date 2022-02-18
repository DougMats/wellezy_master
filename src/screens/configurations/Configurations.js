import React, { useState, useContext } from 'react'
import { SafeAreaView, View, Text, ScrollView } from 'react-native'
import ChangeLanguage from '../../../Language/ChangeLanguage.js'
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import Head from '../../components/generic/Head';
import MenuVertical from '../../components/generic/MenuVertical.js';
import Menu from '../../components/generic/Menu';
import {
  color_primary,
  color_secondary,
  color_tertiary,
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
} from '../../styles/Colors'
import UserContext from '../../../contexts/UserContext'





function Configurations(props) {
  const { t, i18n } = useTranslation();
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [vertical, setvertical] = useState(false);

  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = 1 }

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

<View style={{height:40}}></View>

        <ChangeLanguage />

      </ScrollView>
      <Menu props={props} option={2} />
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

export default Configurations;