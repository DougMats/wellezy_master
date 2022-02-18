import React, { useState, useEffect } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Dimensions, Image, Modal, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import Head from '../../components/generic/Head';
import MenuVertical from '../../components/generic/MenuVertical.js';
import Menu from '../../components/generic/Menu';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
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
} from '../../styles/Colors'

function CreateProfileDriver(props) {
  const { t, i18n } = useTranslation();
  const [page, setpage] = useState(1);
  const [vertical, setvertical] = useState(false);
  const config = { velocityThreshold: 0.3, directionalOffsetThreshold: 80 };

  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = 1 }

  useEffect(() => {
    console.log("first time at screen driver")
    //get()
  }, [randomCode]);

  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }
  function pagination(value) {
    const newPosition = page + value
    if (newPosition >= 0) {
      setpage(1)
    }
    else {
      setpage(newPosition)
    }
  }
  const bottom = 60
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color_screen }}>
      <Head props={props} return=""
        show={vertical}
        action={setvertical}
      />
      <GestureRecognizer
        onSwipeLeft={(state) => setpage(page - 1)}
        onSwipeRight={(state) => setpage(page + 1)}
        config={config}
        style={{
          backgroundColor: "pink",
          flex: 1,
          height: "100%"
        }}>
        <ScrollView scrollEventThrottle={16}>
          <View style={{
            padding: 10, backgroundColor: "red", paddingBottom: bottom + 40,
          }}>
            {page === 1 && <PageOne />}
            {page === 2 && <PageTwo />}
            {page === 3 && <PageThree />}
          </View>
        </ScrollView>



        <View style={{
          flexDirection: "row",
          backgroundColor: "black", position: "absolute", bottom: bottom
        }}>
          <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={() => setpage(1)}>
            <Icon name={page === 1 ? "radio-button-on" : "radio-button-off"} width={25} height={25} fill={color_primary} />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={() => setpage(2)}>
            <Icon name={page === 2 ? "radio-button-on" : "radio-button-off"} width={25} height={25} fill={color_primary} />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={() => setpage(3)}>
            <Icon name={page === 3 ? "radio-button-on" : "radio-button-off"} width={25} height={25} fill={color_primary} />
          </TouchableOpacity>
        </View>
      </GestureRecognizer>

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
export default CreateProfileDriver;
const styles = StyleSheet.create({
})

const PageOne = (props) => {
  return (
    <View style={{
      backgroundColor: "blue",
      height: 400
    }}>
      <Text>page one</Text>
    </View>
  )
}

const PageTwo = (props) => {
  return (
    <View style={{
      backgroundColor: "red",
      height: 200
    }}>
      <Text>page two</Text>
    </View>
  )
}

const PageThree = (props) => {
  return (
    <View style={{
      backgroundColor: "orange",
      height: 800,
      justifyContent: "space-between"
    }}>
      <Text>page init</Text>
      <Text>page end</Text>
    </View>
  )
}