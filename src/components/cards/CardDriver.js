import React, { useState, useEffect } from 'react';
import { Dimensions, ActivityIndicator, SafeAreaView, StatusBar, ScrollView, View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import ScoreStars from '../stars/ScoreStars.js';
import { file_server1 } from '../../../Env'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import {
  color_primary,
  color_fifth,
  color_white,
  color_black,
  color_grey_half,
  color_transparent,
  color_star
} from '../../styles/Colors.js';



function CardDriver(props) {
  const { t, i18n } = useTranslation();
  const [viewDescription, setviewDescription] = useState(false);
/*
  {
    "adress": "sabaneta",
    "age": 34,
    "basedOn": 2,
    "city": "Medellín",
    "city_id": "2259",
    "country": "Colombia",
    "country_id": "COL",
    "created_at": "2021-10-11 16:26:19",
    "departament": "Antioquia",
    "description": "",
    "gender": 1,
    "id": 3,
    "img": "https://cdn2.atraccion360.com/media/aa/styles/xlarge/public/images/2019/05/chofer01.jpg",
    "name": "Hildemaro",
    "rating": 4,
    "recommended": 34,
    "stars": 4.5,
    "surname": "james",
    "title": "",
    "type": "",
    "updated_at": "2021-10-11 16:26:19"
  }
*/


  return (




    <TouchableOpacity
      style={[styles.Card]}
      onPress={() => props.goToScreen("DriversView", props.data)}
    >
      <View style={styles.wrap}>
        <View style={styles.wrapL}>
          {
            props.data.type === 'premium' &&
            <View style={styles.type}>
              <Icon name='award' fill={color_fifth} width={20} height={20} style={{ right: 5, top: 0 }} />
              <Text style={styles.typeText}>Premium</Text>
            </View>
          }
          <Image
            style={[styles.img, {
              borderWidth: props.data.type === 'premium' ? 4 : 0,
              borderColor: props.data.type === 'premium' ? color_primary : color_transparent
            }]}
            source={{ uri: `${file_server1}/img/wellezy/viaticos/users/${props.data.img}` }}
          />
        </View>
        <View style={styles.wrapR}>
          <Text style={styles.name}>{props.data.name} {props.data.surname}</Text>
          <Text style={styles.address}>
            {props.data.city} - {props.data.country}.</Text>
          <View style={{ flexDirection: "row" }}>
            <Icon name="smiling-face-outline" width={25} height={25} fill={color_fifth} />
            <Text style={{ lineHeight: 25, fontSize: 14, marginLeft: 5 }}>{props.data.recommended} personas recomiendan</Text>
          </View>
          <ScoreStars stars={props.data.stars} size={25} color={color_star} />
        </View>
      </View>
      <View style={styles.foot}>
        <Text style={[styles.description]}>
          {viewDescription === true ?
            props.data.description
            :
            props.data.description.length > 147 ?
              ((props.data.description.substring(0, 147 - 3)) + '...')
              :
              props.data.description
          }
        </Text>
        {
          props.data.description.length > 147 &&
          <TouchableOpacity
            style={styles.btnFoot}
            onPress={() => setviewDescription(!viewDescription)}>
            <Text style={styles.btnFootText}>{viewDescription === true ? 'ver menos' : 'ver más'}</Text>
          </TouchableOpacity>
        }
      </View>


{/*
//     <TouchableOpacity style={[styles.Card, { minWidth: windowWidth / 2  - 20, height: windowWidth / 2-20, }]} onPress={() => props.goToScreen(props.screen, props.data)}>
//       <View style={{ overflow: "hidden", backgroundColor: "#E9E9E9", width: "100%", height: 100, }}>
//         <Image style={{
//           flex: 1, width: null, height: null, resizeMode: 'cover',
//         }} source={{ uri: props.data.img }} />
//       </View>
//       {
//       props.data.type === 1 &&
//         <View style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10, paddingLeft: 10, position: "absolute", right: -4, top: 85, width: windowWidth / 4, height: 25, backgroundColor: "white", flexDirection: "row", borderColor: "#00A7B4", borderWidth: 2 }}>
//           <Icon name='award' fill="#00A7B4" width={15} height={15} style={{ right: 5, top: 3 }} />
//           <Text style={{ color: "#00A7B4", lineHeight: 20 }}>Premium</Text>
//         </View>
//       }
// <View style={{ flexDirection: "column", marginTop: 5,  width: "100%", alignContent: "center", alignItems: "center" }}>
//         <Text style={{ color: '#00a7b4', fontSize: 18, textTransform: "capitalize" }}>{props.data.category}</Text>
//         <Text style={{ marginBottom: 3, fontWeight: "bold", fontSize: 16, textTransform: "uppercase" }}>{props.data.name}</Text>
//          <ScoreStars stars={props.data.stars} size={25} color='#ffd900' />
//       </View>
//     </TouchableOpacity>
*/}


</TouchableOpacity>
  )
}

export default React.memo(CardDriver);

const styles = StyleSheet.create({
  // Card: {
  //   backgroundColor: "white",
  //   alignItems: "center",
  //   alignContent: "center",
  //   borderRadius: 8,
  //   margin: 8,
  //   overflow: "hidden"
  // }
  Card: {
    overflow: "hidden",
    flexDirection: "column",
    alignSelf: "center",
    width: "90%",
    backgroundColor: color_white,
    shadowColor: color_black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 12,
    marginBottom: 10
  },
  wrap: {
    width: "100%",
    flexDirection: "row",
    borderBottomColor: color_grey_half,
    borderBottomWidth: 0.5
  },
  wrapL: {
    flexDirection: "column",
    width: "35%",
    padding: 10,
    alignItems: "center",
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 100,
    resizeMode: "cover"
  },
  type: {
    position: "absolute",
    zIndex: 999,
    bottom: 5,
    height: 25,
    backgroundColor: color_white,
    flexDirection: "row",
    borderColor: color_fifth,
    borderWidth: 2,
    paddingHorizontal: 15,
    left: 5,
    borderRadius: 10
  },
  typeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: color_fifth,
    lineHeight: 20
  },
  wrapR: {
    justifyContent: "space-around",
    padding: 10,
    width: "65%",
    flexDirection: "column"
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "uppercase"
  },
  address: {
    fontSize: 14,
  },
  foot: {
    padding: 10,
    flexDirection: "column"
  },
  description: {
    fontSize: 14,
    textAlign: "justify"
  },
  btnFoot: {
    marginTop: 10,
    alignSelf: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 8,
    borderColor: color_grey_half,
    borderWidth: 0.5
  },
  btnFootText: {
    textAlign: "center",
    fontSize: 12,
    color: color_grey_half
  }
})