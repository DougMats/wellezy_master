import React, { useState } from 'react'
import { Modal, Dimensions, TouchableOpacity, Image, ScrollView, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Icon } from 'react-native-eva-icons'

import {
  color_primary,
  color_secondary,
  color_tertiary,
  color_quarter,
  color_fifth,
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
} from '../../../styles/Colors'


const windowWidth = Dimensions.get('window').width;

function SectionImages(props) {
  const { t, i18n } = useTranslation();
  const [zoom, setzoom] = useState(false);
  const [viewer, setviewer] = useState(null);
  return (
    <View style={{ width: "100%", flexDirection: "column", marginTop: 10, paddingHorizontal: 20 }}>
      <View style={{ flexDirection: 'row', width: "100%", alignContent: 'center', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        {props.data.images.map((i, key) => {
          return (
            <TouchableOpacity key={key} onPress={() => [setviewer(i.img), setzoom(true)]}
              style={{ borderRadius: 8, overflow: "hidden", marginVertical: 4, width: (windowWidth / 3) - 20, height: (windowWidth / 4) - 20 }}>
              <Image
                style={{ width: null, height: null, flex: 1, resizeMode: "cover" }}
                source={{ uri: i.img }} />
            </TouchableOpacity>
          )
        })
        }
      </View>
      <Modal animationType="slide" transparent={true} visible={zoom}>
        <TouchableOpacity onPress={() => setzoom(false)} style={{ backgroundColor: "rgba(0,0,0,0.8)", width: "100%", height: "100%", justifyContent: "center", position: "absolute", zIndex: 999, flex: 1, flexDirection: "column" }}>
          <TouchableOpacity
            onPress={() => setzoom(false)}
            style={{ width: 40, height: 40, position: "absolute", zIndex: 999, top: 20, right: 10 }}>
            <Icon name={"close"} width={30} height={30} fill={color_white} />
          </TouchableOpacity>
          <View style={{ width: windowWidth, height: windowWidth / 1.5, }}>
            {viewer !== null && <Image style={{ width: null, height: null, flex: 1, resizeMode: "contain" }} source={{ uri: viewer }} />}
          </View>
          <View style={{ position: "absolute", bottom: 0, width: "100%", justifyContent: "center", alignItems: "center", }}>
            <ScrollView horizontal >
              {props.data.images.map((i, key) => {
                return (
                  <TouchableOpacity key={key}
                    onPress={() => [setviewer(i.img), setzoom(true)]}
                    style={{
                      borderRadius: 8,
                      overflow: "hidden",
                      margin: 5,
                      width: (windowWidth / 10) * 2.2,
                      height: (windowWidth / 10) * 1.8
                    }}>
                    <Image style={{ width: null, height: null, flex: 1, resizeMode: "cover" }} source={{ uri: i.img }} />
                  </TouchableOpacity>
                )
              })}
            </ScrollView>
          </View>


        </TouchableOpacity>
      </Modal>
    </View>
  )
}
export default SectionImages;