import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-eva-icons';
import { file_server1 } from '../../../Env'
import ScoreStars from '../stars/ScoreStars.js';

function CardProcedure(props) {
  const { navigation } = props.props;

  function goToScreen(data, screen) {
    let from = 'MedicsView';
    let id_Medic = props.id_Medic;
    navigation.navigate(screen, { randomCode: Math.random(), data, from, id_Medic })
  }



  return (
    <TouchableOpacity
      onPress={() => goToScreen(props.data, "Process")}
      style={{ marginBottom: 20, borderRadius: 10, flexDirection: "row", backgroundColor: "white", width: "90%",  paddingVertical: 5, paddingHorizontal: 15 }}
    >
      <View style={{ overflow: "hidden", width: 50, height: 50, borderRadius: 25, backgroundColor: "#f1f1f1" }}>
        <Image
          //souce={{ uri: props.data.foto }}
          source={{ uri: `${file_server1}/img/category/picture/${props.data.foto}` }}
          style={{ width: null, height: null, resizeMode: "cover", flex: 1 }}
        />
      </View>
      <View style={{ justifyContent: "center", marginLeft: 15 }}>
        <Text style={{ marginTop: -5, color: "#555", fontSize: 12, }}>
          Category: {props.data.name_category}
        </Text>
        <Text style={{ color: "#000", fontSize: 14, }}>
          {props.data.name}
        </Text>
      </View>
      <View style={{ position: "absolute", right: 10, top: 20 }}>
        <Icon name="arrow-ios-forward-outline" width={20} height={20} fill="#00AFE8" />
      </View>
    </TouchableOpacity>
  )
}

export default CardProcedure;