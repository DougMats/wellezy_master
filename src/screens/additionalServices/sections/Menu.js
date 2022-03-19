import React from 'react'
import { Dimensions, TouchableOpacity, ScrollView, View, Text, } from 'react-native'
import { useTranslation } from 'react-i18next'
import {
  color_fifth,
  color_white,
  color_grey_half,
  color_primary,
  color_grey_light,
} from '../../../styles/Colors'




const windowWidth = Dimensions.get('window').width;

function MenuView(props) {
  console.log("________menu")
  return (
    <View style={{
      flexDirection: "row",
      width: windowWidth,
      justifyContent: "space-around",

      }}>
      <ScrollView horizontal>
        {props.data.map((i, key) => {
          return (
            <TouchableOpacity style={{
              width:windowWidth/5,
              backgroundColor:color_white,
              paddingVertical: 5,
              paddingHorizontal: 2,
              borderBottomColor: props.value === i.id ? color_fifth : color_white,
              borderBottomWidth: 1,
            }} onPress={() => props.set(i.id)}>
              <Text style={{fontSize:12, color: props.value === i.id ? color_fifth : color_grey_half, textAlign: "center" }}>{i.name}</Text>
            </TouchableOpacity>
          )
        })
        }
      </ScrollView>
    </View>
  )
}
export default React.memo(MenuView);
