import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';


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
} from '../../styles/Colors.js'


function Horizon(props) {
  const { t, i18n } = useTranslation();
  //console.log("Menu horizontal");
  return (
    <ScrollView
      scrollEventThrottle={16}
      horizontal={true}
      showsHorizontalScrollIndicator={true}
      style={{ marginBottom: 20 }}>
      <TouchableOpacity
        onPress={() => props.ViewTips("Home")}
        style={{
          marginVertical: 5, borderBottomColor: props.TIP == 0 ? "#00A7B4" : "#00A7B4",
          borderBottomWidth: props.TIP == "Home" ? 2 : 0, flexDirection: "row", paddingVertical: 5, paddingHorizontal: 5, marginHorizontal: 5, justifyContent: "space-around", minWidth: 40, height: 30
        }}>
        <Icon name='home-outline' width={20} height={20} fill={props.TIP == "Home" ? "#00A7B4" : "#ccc"} style={{ marginRight: 5 }} />
      </TouchableOpacity>
      {
        props.data.map((i, key) => {
          return (
            <TouchableOpacity key={key}
              onPress={() => props.ViewTips(i.name)}
              style={{
                borderBottomColor: i.name == props.TIP ? "#00A7B4" : "#00A7B4",
                borderBottomWidth: i.name == props.TIP ? 2 : 0,
                marginVertical: 5, flexDirection: "row", paddingVertical: 5, paddingHorizontal: 5, marginHorizontal: 5, justifyContent: "space-around", minWidth: 80, height: 30
              }}>
              <Text style={{ color: "#ccc", textTransform: "capitalize" }}>{i.name}</Text>
              <Text style={{
                color: "#FFF", marginHorizontal: 5,
                backgroundColor: i.name == props.TIP ? "#00A7B4" : "#ccc",
                width: 30, textAlign: "center", borderRadius: 10
              }}>{i.value}</Text>
            </TouchableOpacity>
          )
        })
      }
    </ScrollView>
  );
}
export default Horizon;