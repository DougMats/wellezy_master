import React from 'react';
import { Dimensions, View, Image, TouchableOpacity, Text} from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import ScoreStars from '../../components/stars/ScoreStars.js';
import { file_server1 } from '../../../Env'

import {
  color_fifth,
  color_white,
  color_transparent,
  color_star
} from '../../styles/Colors.js';

const windowWidth = Dimensions.get('window').width;

function CardNurse(props) {
  const { t, i18n } = useTranslation();
  return (
    <TouchableOpacity
      style={{
        alignSelf: "center",
        backgroundColor: color_white,
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        borderRadius: 8,
        marginBottom: 30,
        flexDirection: "column",
        width: windowWidth / 2 - 15,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
      onPress={() => props.goToScreen("NurseView", props.data)}
    >
      <View style={{
        marginTop: -20,
        alignItems: "center",
        justifyContent: "center",
        width: windowWidth / 2 - 15,
        height: windowWidth / 3 - 15,
      }}>
        {
          props.data.type === 'premium' &&
          <View style={{
            alignSelf:"center",
            position: "absolute",
            zIndex: 999,
            bottom: 5,
            height: 25,
            backgroundColor: color_white,
            flexDirection: "row",
            borderColor: color_fifth,
            borderWidth: 1.5,
            paddingHorizontal: 15,
            borderRadius: 10

          }}>
            <Icon name='award' fill={color_fifth} width={20} height={20} style={{ right: 5, top: 0 }} />
            <Text style={{
              fontSize: 14,
              fontWeight: "bold",
              color: color_fifth,
              lineHeight: 20
            }}>Premium</Text>
          </View>
        }
        <Image
          style={{
            width: 100,
            height: 100,
            borderRadius: 100,
            resizeMode: "cover",
            borderWidth: props.data.type === 'premium' ? 4 : 0,
            borderColor: props.data.type === 'premium' ? color_fifth : color_transparent
          }}
          source={{ uri: `${file_server1}/img/wellezy/nurses/${props.data.img}` }} />
      </View>
      <View style={{
        width: "100%",
        paddingHorizontal: 5,
        height: windowWidth / 3,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around"
      }}>
        <Text style={{
          width: "100%",
          textAlign: "center",
          fontWeight: "900",
          fontSize: 12,
          textTransform: "uppercase"
        }}>{props.data.title}. {props.data.name} {props.data.surname}</Text>
        <ScoreStars stars={props.data.stars} size={20} color={color_star} />
        <View style={{ flexDirection: "row" }}>
          <Icon name="smiling-face-outline" width={25} height={25} fill={color_fifth} />
          <Text style={{ lineHeight: 25, fontSize: 10, marginLeft: 5 }}>{props.data.recommended} personas recomiendan</Text>
        </View>
        <Text style={{ fontSize: 14, marginBottom: 10 }}>{props.data.country}. {props.data.city}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default React.memo(CardNurse)