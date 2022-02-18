import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { colorAlfa, colorBetta, colorGamma, colorZeta } from '../../styles/Colors';
import { Icon } from 'react-native-eva-icons';



function TopMenu(props) {

  const [show, setshow] = useState(true);
  //menu-outline


  function hidden() {
    console.log("hidden")
    setshow(false)
  }
  return (
    <View style={[styles.wrap,{display: show === true ? "flex":"none"}]}>
      <View style={styles.close}>
        <TouchableOpacity onPress={() => hidden()}>
          <Icon name='close-outline' fill={"white"} width={30} height={30} />
        </TouchableOpacity>
      </View>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.option}><Text style={styles.text}>45y45y</Text></TouchableOpacity>
        <TouchableOpacity style={styles.option}><Text style={styles.text}>45y45y</Text></TouchableOpacity> 
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  wrap: {
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 99999,
    flexDirection: "row"
  },

  close: {
    padding: 10,
    width: "40%",
    justifyContent: "flex-start",
    alignContent: "flex-end",
    alignItems: "flex-end",
  },
  menu: {
    backgroundColor: "white",
    width: "60%",
    height: "100%"
  },




  option: {
    borderBottomColor: "silver",
    borderBottomWidth: 1,
    padding: 20
  },
  text: {
    color: "#333"
  }
})

export default TopMenu;