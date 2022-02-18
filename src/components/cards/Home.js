import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
function Home(props) {
  console.log("process home")
  return (
    <View style={{ alignContent: "center", alignItems: "center", width: "100%", marginBottom: 20 }}>
      <View style={{ backgroundColor: "white", width: "90%", paddingHorizontal: 20, paddingVertical: 40, borderRadius: 12, }}>
        <Text style={{ textAlign: "center", color: "#333333", fontSize: 26, fontWeight: "bold" }}>{props.data.title}</Text>
        <Text style={{ marginBottom: 20, marginTop: 10, textAlign: "justify", lineHeight: 15, fontSize: 14, color: "#555", }}>{'\t'}{'\t'}{'\t'}{props.data.info}</Text>
        <TouchableOpacity
          style={{ alignSelf: "flex-end", position: "absolute", bottom: 15, right: 20 }}
          onPress={() => props.goToScreen("MedicsView", props.data.id_medic)}
        >
         <Text style={{ textAlign: "right", fontSize: 12, color: "#555", }}>{props.data.name_medic}</Text> 
          <Text style={{ textAlign: "right", fontSize: 12, color: "#555", }}>{props.data.date}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
})
export default Home;