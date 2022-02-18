import React, { useState } from 'react'
import { Modal, Dimensions, TouchableOpacity, Image, ScrollView, Text, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Icon } from 'react-native-eva-icons'
import { GotoMaps } from '../../../../components/Logic.js'
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
} from '../../../../styles/Colors'

function SectionInfo(props) {
  const { t, i18n } = useTranslation();
  const [zoom, setzoom] = useState(false);
  const [viewer, setviewer] = useState(null);

  return (
    <View style={{
      width: "100%",
      flexDirection: "column",
      marginTop: 20,
      paddingHorizontal: 20
    }}>
      <View style={{ marginTop: 20 }}>
        <Text style={{
          marginVertical: 10, fontSize: 18, fontWeight: "bold", color: color_fifth
        }}>Ubicación</Text>
        <View>
          <Text style={{ color: color_grey_dark, fontSize: 14 }}>{props.data.adress}</Text>
          <Text style={{ color: color_grey_dark, fontSize: 14 }}>{props.data.city}. {props.data.district}. {props.data.country}. </Text>
        </View>
        {props.data.latitud !== "" && props.data.longitud !== "" &&
          <TouchableOpacity
            style={{
              marginTop: 20,
              alignSelf: "center",
              backgroundColor: color_fifth,
              paddingVertical: 8,
              paddingHorizontal: 40,
              borderRadius: 8,
              flexDirection: "row"
            }}
            onPress={() => GotoMaps(props.data.latitud, props.data.longitud)}>
            <Icon name="pin-outline" width={20} height={20} fill={color_white} />
            <Text style={{ lineHeight: 20, marginLeft: 10, color: color_white, fontWeight: "bold", fontSize: 14 }}>Cómo llegar</Text>
          </TouchableOpacity>
        }
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{
          marginVertical: 10, fontSize: 18, fontWeight: "bold", color: color_fifth
        }}>Description:</Text>
        <Text style={{
          color: color_grey_dark,
          textAlign: "justify"
        }}> {props.data.description}</Text>
      </View>
      {props.data.services.mainServices.length !== 0 &&
        <View style={{ marginTop: 20 }}>
          <Text style={{ marginVertical: 10, fontSize: 18, fontWeight: "bold", color: color_fifth }}>Servicios principales</Text>
          <View>
            {props.data.services.mainServices.map((i, key) => {
              return (
                <View key={key} style={{ flexDirection: "row" }}>
                  <Icon name="checkmark-outline" width={25} height={25} fill={color_grey_dark} />
                  <Text style={{ marginLeft: 5, color: color_grey_dark, fontSize: 14, fontWeight: "600" }}>{i.name}</Text>
                </View>
              )
            })}
          </View>
        </View>
      }
      {props.data.services.allTheServices.length !== 0 &&
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: color_fifth }}>Todos los servicios </Text>
          {props.data.services.allTheServices.map((i, key) => {
            return (<AllServices key={key} data={i} />)
          })}
        </View>
      }
      {props.data.cleaning !== null &&
        <View style={{ borderTopColor: color_white, borderTopWidth: 2, borderRadius: 8, marginTop: 20, backgroundColor: "rgba(255,255,255,0.5)", padding: 10 }}>
          <Text style={{ marginVertical: 10, fontSize: 18, fontWeight: "bold", color: color_fifth }}>Políticas de limpieza</Text>
          <Text style={{ color: color_grey_dark }}>{props.data.cleaning.title}</Text>
          <View style={{ marginTop: 20 }}>
            {props.data.cleaning_tips.map((i, key) => {
              return (<Tips key={key} data={i} />)
            })}
          </View>
        </View>
      }
    </View>
  )
}
export default SectionInfo;



const AllServices = (props) => {
  const [viewAll, setviewAll] = useState(false);
  return (
    <View style={{ marginTop: 10, borderRadius: 8, backgroundColor: color_white, paddingVertical: 10 }}>
      <View style={{
        flexDirection: "row",
        marginBottom: 5,
        paddingHorizontal: 10,
      }}>
        <Text style={{
          textTransform: "capitalize",
          color: color_grey_dark,
          fontSize: 16,
          fontWeight: "bold",
          marginRight: 10
        }}>{props.data.name}</Text>
        {props.data.services.length > 4 &&
          <TouchableOpacity onPress={() => setviewAll(!viewAll)}>
            <Icon name={viewAll ? "arrow-ios-downward-outline" : "arrow-ios-forward-outline"} width={25} height={25} fill={color_grey_dark} />
          </TouchableOpacity>
        }
      </View>
      {props.data.services.map((i, key) => {
        if (viewAll === true) {
          return (
            <View key={key} style={{
              paddingLeft: 20,
              flexDirection: "row",
            }}>
              <Icon name="checkmark-circle-2-outline" width={25} height={25} fill={color_fifth} />
              <Text style={{
                marginLeft: 10,
                color: color_grey_dark,
                fontSize: 14,
                fontWeight: "600",
              }}>{i.name}</Text>
            </View>
          )
        }
        else {
          if (key < 5) {
            return (
              <View key={key} style={{
                paddingLeft: 20,
                flexDirection: "row",
              }}>
                <Icon name="checkmark-circle-2-outline" width={25} height={25} fill={color_fifth} />
                <Text style={{
                  marginLeft: 10,
                  color: color_grey_dark,
                  fontSize: 14,
                  fontWeight: "600",
                }}>{i.name}</Text>
              </View>
            )
          }
        }
      })}
    </View>
  )
}

const Tips = (props) => {
  const [open, setopen] = useState(false);
  return (
    <View style={{
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
      backgroundColor: color_white,
      marginVertical: 5,
      padding: 10,
      borderRadius: 8,
    }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row" }}>
          <Icon name="bulb-outline" width={25} height={25} fill={color_fifth} />
          <Text style={{ color: color_fifth, fontSize: 16, fontWeight: "bold", lineHeight: 25, marginLeft: 15 }}>{props.data.title}</Text>
        </View>
        <TouchableOpacity onPress={() => setopen(!open)}>
          <Icon name={open ? "arrow-ios-downward-outline" : "arrow-ios-forward-outline"} width={25} height={25} fill={color_fifth} />
        </TouchableOpacity>
      </View>
      {open &&
        <Text style={{ marginTop: 10, textAlign: "justify", color: color_grey_dark, fontSize: 14, paddingHorizontal: 20 }}>{props.data.description}</Text>
      }
    </View>
  )
}