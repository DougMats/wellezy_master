import React from 'react'
import { ScrollView, StatusBar, Dimensions, View, Text, TouchableOpacity } from 'react-native'
import IconSvg from '../../svg/icon_svg'
import { useTranslation } from 'react-i18next';
import { color_white, color_grey_half, color_screen, color_fifth} from '../../styles/Colors'
import { connect } from 'react-redux'

const windowWidth = Dimensions.get('window').width;
const Width = windowWidth / 12

const mapStateToProps = (state) => {
  return {
    list: state.servicesReducer.list
  }
}

function MenuServices({list, idReceived, goToScreen}) {
  const { t, i18n } = useTranslation();
  
  let id
  if (idReceived) { id = idReceived }
  else { id = 0 }
  
  return (
    <View style={{ paddingVertical: 10, paddingHorizontal: 5 }}>
      <StatusBar backgroundColor={color_screen} barStyle='dark-content' translucent={false} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {list.map((i, key) => {
          return (
            <TouchableOpacity key={key} onPress={() => goToScreen(i.screen, i)}
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
                  color: id === i.id ? color_fifth : color_grey_half
                }}
              >{i.name}</Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default connect(mapStateToProps, null)(MenuServices);
//export default React.memo(MenuServices);