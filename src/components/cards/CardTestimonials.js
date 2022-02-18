import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { file_server1 } from '../../../Env.js';
import { color_primary } from '../../styles/Colors.js';
import ScoreStars from '../stars/ScoreStars.js';

function CardTestimonials(props) {
  // function Names() {
  //   const NameA = props.data.surname.split(" ");
  //   const NameB = props.data.name.split(" ");
  //   return NameA[0] + " " + NameB[0];
  // }

  function fecha() {
    const date = props.data.created_at.split(" ");
    const fecha = date[0];
    const order = fecha.split("-");
    const fechaOrder = order[2] + "/" + order[1] + "/" + order[0];
    //const hora = date[1];
    return fechaOrder;
  }

  return (
    <View style={{
      marginTop: 30,
      alignSelf: "center",
      alignContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      width: "90%",
      padding: 20,
      borderRadius: 12,
      marginBottom: 20
    }}>
      <View style={{
        marginTop: -40,
        width: 100,
        height: 100,
        overflow: "hidden",
        borderRadius: 50,
        borderColor: "white",
        borderWidth: 4,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}>
        <Image
          style={{ width: null, height: null, resizeMode: "cover", flex: 1 }}
          source={{ uri: `${file_server1}/img/wellezy/users/${props.data.img}` }}
        />
      </View>
      <Text style={{ color: "black", fontSize: 16, fontWeight: "bold", textTransform: "uppercase" }}>
        {props.data.title}
      </Text>
      <Text style={{ color: "#009a9b", fontSize: 14, textTransform: "capitalize" }}>
        {props.data.name} {props.data.surname}
      </Text>

      <Text style={{ color: "#555", lineHeight: 15, fontSize: 14, textAlign: "justify", fontWeight: "bold", marginTop: 10 }}>
        {props.data.testimony}
      </Text>

      {/*
        <Text>recommended:{props.data.recommended_procedure}</Text>
        <Text>rating:{props.data.rating_procedure}</Text>
        <Text>recommended_doctor---- {props.data.recommended_doctor}</Text>
        <Text>rating_medic---- {props.data.rating_medic}</Text>
        <ScoreStars
          scale={props.data.basedOn}
          value={props.data.rating}
          stars={props.data.stars}
          scale={60}
          value={40}
          stars={20}
          size={22}
          color={color_primary}
        />
      */}
      
      <Text style={{ color: "#555", marginTop: 20, alignSelf: "flex-end", fontSize: 12, textTransform: "capitalize" }}>
        {fecha()}
      </Text>

    </View>
  );
}
const styles = StyleSheet.create({

})
export default CardTestimonials;