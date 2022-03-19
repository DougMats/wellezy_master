import React, { useState, useEffect } from 'react'
import { ScrollView, StatusBar, Dimensions, View, Text, TouchableOpacity } from 'react-native'
import IconSvg from '../../svg/icon_svg'
import { useTranslation } from 'react-i18next';
import { services } from '../../services/connection'
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
  color_fifth
} from '../../styles/Colors'
import { get } from 'lodash';


const windowWidth = Dimensions.get('window').width;
const Width = windowWidth / 12

function MenuServices(props) {
  const { t, i18n } = useTranslation();
  const [ourServices, setourServices] = useState([]);

  let id
  if (props.id) { id = props.id }
  else { id = 0 }

  useEffect(() => {
    get()
  }, [])

  async function get(){
    const res = await services.servicesList(i18n.language)
    setourServices(res)
  }

  return (
    <View style={{ paddingVertical: 10, paddingHorizontal: 5 }}>
      <StatusBar backgroundColor={color_screen} barStyle='dark-content' translucent={false} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {ourServices.map((i, key) => {
          return (
            <TouchableOpacity key={key} onPress={() => props.goToScreen(i.screen, i)}
              style={{
                minWidth: Width * 4,
                maxWidth: Width * 6,
                backgroundColor: color_white,
                marginHorizontal: 5,
                marginVertical: 5,
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 8,
                paddingHorizontal: 15,
                borderRadius: 5,
                borderColor: color_fifth,
                borderWidth: id === i.id ? 1.5 : 0,
                flexDirection: "row"
              }}>
              <IconSvg name={i.icon} width={30} height={30} fill={id === i.id ? color_fifth : color_grey_half} />
              <Text
                style={{
                  fontSize: 14,
                  lineHeight: 25,
                  fontWeight: "bold",
                  marginLeft: 5,
                  color: props.id === i.id ? color_fifth : color_grey_half
                }}
              >{i.name}</Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default React.memo(MenuServices);