import React, { useState } from 'react'
import { Modal, Dimensions, TouchableOpacity, Text, Image, ScrollView, View } from 'react-native'
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
} from '../../../../styles/Colors'

const windowWidth = Dimensions.get('window').width;



function SectionGeneral(props) {


// {
//   "allTheServices": [{"id": 1, "id_hotel": 1, "name": "Servicios en el hotel", "name_en": "Services in the hotel", "services": [Array]}, {"id": 2, "id_hotel": 1, "name": "Servicios en la habitación", "name_en": "In-room services", "services": [Array]}, {"id": 3, "id_hotel": 1, "name": "bienestar / spa", "name_en": "bienestar / spa", "services": [Array]}, {"id": 4, "id_hotel": 1, "name": "Accesibilidad", "name_en": "accessibility", "services": [Array]}, {"id": 5, "id_hotel": 1, "name": "Viajeros con niños", "name_en": "Travelers with children", "services": [Array]}],
//   "mainServices": [{"id": 1, "id_hotel": 1, "name": "Servicios en el hotel", "name_en": "Services in the hotel", "services": [Array]}, {"id": 2, "id_hotel": 1, "name": "Servicios en la habitación", "name_en": "In-room services", "services": [Array]}, {"id": 3, "id_hotel": 1, "name": "bienestar / spa", "name_en": "bienestar / spa", "services": [Array]}, {"id": 4, "id_hotel": 1, "name": "Accesibilidad", "name_en": "accessibility", "services": [Array]}, {"id": 5, "id_hotel": 1, "name": "Viajeros con niños", "name_en": "Travelers with children", "services": [Array]}],
//   "servicesAndFacilities": [{"id": 1, "id_hotel": 1, "name": "Servicios en el hotel", "name_en": "Services in the hotel", "services": [Array]}, {"id": 2, "id_hotel": 1, "name": "Servicios en la habitación", "name_en": "In-room services", "services": [Array]}, {"id": 3, "id_hotel": 1, "name": "bienestar / spa", "name_en": "bienestar / spa", "services": [Array]}, {"id": 4, "id_hotel": 1, "name": "Accesibilidad", "name_en": "accessibility", "services": [Array]}, {"id": 5, "id_hotel": 1, "name": "Viajeros con niños", "name_en": "Travelers with children", "services": [Array]}]
// }




  return (
    <View style={{
      marginTop: 10,
      width: "100%",
      flexDirection: "column",
    }}>



      <ScrollView horizontal >
        {props.data.images.map((i, key) => {
          return (
            <TouchableOpacity onPress={() => props.setlabel(3)}
              style={{
                overflow: "hidden",
                width: 100,
                height: 80,
                borderRadius: 12,
                marginHorizontal: 5
              }}>
              <Image style={{ width: null, height: null, flex: 1, resizeMode: "cover" }} source={{ uri: i.img }} />
            </TouchableOpacity>
          )
        })}
      </ScrollView>


      <View>
        <TouchableOpacity onPress={() => props.setlabel(3)}
          style={{
            backgroundColor: color_white,
            zIndex: 999999,
            position: "absolute",
            top: 2,
            right: 5,
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 8,
            flexDirection: "row",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}>
          <Icon name="image-outline" width={18} height={18} fill={color_primary} />
          <Text style={{ marginHorizontal: 5, fontSize: 12, textTransform: "lowercase", color: color_primary }}>ver más fotos</Text>
          <Icon name="arrow-forward-outline" width={18} height={18} fill={color_primary} />
        </TouchableOpacity>
      </View>



      {/* 
      <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
        <View style={{
          borderRadius: 20,
          backgroundColor: color_fifth,
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          width: 80
        }}>
          <Text style={{ color: color_white, }}>8.4</Text>
        </View>
        <Text>muy bueno(921 opiniones)</Text>
      </View>
 */}





      <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
        <Text style={{ marginVertical: 10, fontSize: 18, fontWeight: "bold", color: color_fifth }}>Servicios e instalaciones</Text>
        {props.data.services.servicesAndFacilities.length > 0 && props.data.services.servicesAndFacilities.map((i, key) => {
          return (
            <View style={{ flexDirection: "row"}}>
              <Icon name="checkmark-outline" width={25} height={25} fill={color_grey_dark} />
              <Text style={{ marginLeft: 5, color: color_grey_dark, fontSize: 14, fontWeight: "600" }}>{i.name}</Text>
            </View>
          )
        })}
      </View> 


      
      

      

      {/* 

      
$data['servicesAndFacilities'] = [];
$data['mainServices'] = [];
$data['allTheServices'] = DB ::table('hotel_services_group')
            
            
            */}




      <TouchableOpacity
        onPress={() => props.setlabel(2)}
        style={{
          backgroundColor: color_fifth,
          alignSelf: "center",
          marginTop: 30,
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 8,
          flexDirection: "row",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
        <Icon name="pin" width={20} height={20} fill={color_white} />
        <Text style={{
          marginLeft: 5,
          fontWeight: "bold",
          textTransform: "capitalize",
          color: color_white
        }}>datos de ubicación</Text>
      </TouchableOpacity>

    </View>
  )
}
export default SectionGeneral;