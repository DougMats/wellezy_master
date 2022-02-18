import React, { useState } from 'react'
import { SafeAreaView, View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next';
import { Icon } from 'react-native-eva-icons';
import Head from '../components/generic/Head';
import MenuVertical from '../components/generic/MenuVertical.js';
import Menu from '../components/generic/Menu';
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
} from '../styles/Colors'
import LinearGradient from 'react-native-linear-gradient';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function NotNetwork(props) {
  const { t, i18n } = useTranslation();
  const [vertical, setvertical] = useState(false);

  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }


  


  function goToBack() {
    props.navigation.goBack()
  }



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color_screen }}>


<LinearGradient colors={[color_screen, "#fff","#ccc","#FFF", color_screen]}
style={{
   flex: 1,
   justifyContent:"center",
   alignItems:"center", 
}}>


<TouchableOpacity
style={{
  backgroundColor:color_white,
  width:40,
  height:40,
  borderRadius:40,
  justifyContent:"center",
  alignItems:"center",
  position:"absolute",
  zIndex:1,
  top:15,
  right:15
}}

onPress={()=>setvertical(!vertical)}>
  <Icon name={"more-vertical"} width={30} height={30} fill={color_primary} />
</TouchableOpacity>


        <Image
          source={require('../images/not_network.png')}
          style={{
            width: windowWidth,
            height: windowWidth
          }}
        />

      <TouchableOpacity style={styles.btn} onPress={()=>goToBack()}>
        <Text style={styles.text}>Reintentar</Text>
      </TouchableOpacity>


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

</LinearGradient>
    </SafeAreaView>
  )
}
export default NotNetwork;

const styles = StyleSheet.create({
  btn:{
    backgroundColor:color_white,
    marginTop:20,
    borderColor: color_primary,
    borderWidth:2,
    borderRadius:12,
    width:"40%",
    paddingVertical:8
  },
  text:{
    textAlign:"center",
    color: color_primary,
    fontWeight:"bold",
    fontSize:16
  }
})