import React, { useState, useEffect } from 'react';
import { SafeAreaView, ActivityIndicator, StyleSheet, Image, View, Text, TextInput, ScrollView, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-eva-icons';
import {search} from '../services/connection.js';


// import axios from 'axios'
// import { serverCrm, base_url } from '../../Env'
import { getAllExternalFilesDirs } from 'react-native-fs';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const WIDTH = windowWidth / 12
function Search(props) {
  const [text, setText] = useState(null) // props.route.params.data
  const [Load, setLoad] = useState(false)

  useEffect(() => {

    if (text === "") {
      props.navigation.goBack()
    }
    else{

    if (
      text !== "" &&
      text !== null &&
      text !== undefined){
        getAll(text)
    }
  }
  }, [text]);


const [ list, setlist ] = useState([])


  const llist = [
    {
      title: "procedimientos",
      items: [
        { name: "procedimiento1" },
        { name: "procedimiento2" },
        { name: "procedimiento3" },
        { name: "procedimiento4" },
      ]
    },
    {
      title: "medicos ",
      items: [
        { name: "medico_1" },
        { name: "medico_2" },
        { name: "medico_3" },
        { name: "medico_4" },
        { name: "medico_3" },
        { name: "medico_4" },
      ]
    },
    {
      title: "Hoteles",
      items: [
        { name: "medico_1" },
        { name: "medico_2" },
        { name: "medico_3" },
        { name: "medico_4" },
        { name: "medico_3" },
        { name: "medico_4" },
      ]
    }
  ]





  function goToScreen(screen, data) {
    console.log("go from search")
    //props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }



  async function getAll(text) {
setLoad(true)
  const res = await search.getAll(text)
  console.log("res search: ", res)

  setlist(res)

  setLoad(false)
  }







  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", paddingBottom: 10, paddingTop: 20, paddingHorizontal: 20, backgroundColor: "white" }}>
        <View style={{ width: "10%", justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ width: 40, height: 40, borderRadius: 40, justifyContent: "center", alignItems: "center" }} >
            <Icon name={"arrow-ios-back-outline"} width={30} height={30} fill={"silver"} />
          </TouchableOpacity>
        </View>

        <View style={{ padding: 2, width: "90%", justifyContent: "center", alignItems: "center", }}>
          <View style={{ paddingHorizontal: 10, borderRadius: 12, backgroundColor: "#f0f0f0", flexDirection: "row", width: "90%", justifyContent: "center", alignItems: "center" }}>
            <TextInput
              placeholder='Search...'
              style={{ width: "90%" }}
              onChangeText={text => setText(text)}
              value={text}
            />
            <Icon name={"search-outline"} width={30} height={30} fill={"silver"} />
          </View>
        </View>
      </View>


      <ScrollView>
        {Load && <View style={{ marginTop: 60 }}><ActivityIndicator color={"silver"} size={40} /></View>}
        {!Load &&
          <View style={{ paddingBottom: 40 }}>
            {
              list.map((i, key) => {
                return (
                  <Group key={key} data={i} goToScreen={goToScreen} />
                )
              })
            }
          </View>}
      </ScrollView>
    </SafeAreaView>
  )
}
export default Search;







const Group = (props) => {
  return (
    <View style={styles.group}>
      <Text style={styles.title}>{props.data.title} ({props.data.items.length})</Text>
      {
        props.data.items.map((i, key) => {
          return (
            <Item key={key} data={i} goToScreen={props.goToScreen} />
          )
        })
      }
    </View>
  )
}

const Item = (props) => {
  return (
    <TouchableOpacity style={{
      width: WIDTH * 11,
      marginBottom: 5,
      borderRadius: 5,
      backgroundColor: "white",
      alignSelf: "center",
      flexDirection: "row",
      overflow: "hidden",
      paddingVertical: 5,
    }}
      onPress={() => props.goToScreen()}>

      <View style={{ ...styles.center, width: WIDTH * 2, }}>
        <View style={{ backgroundColor: "silver", width: WIDTH, height: WIDTH, borderRadius: WIDTH }}>
          <Image style={styles.img} source={{}} />
        </View>
      </View>

      <View style={{ ...styles.center, width: WIDTH * 8, flexDirection: "column" }}>
        <Text style={{ fontWeight: "bold", textTransform: "capitalize", width: "100%", textAlign: "left" }}>{props.data.name}</Text>
      </View>

      <View style={{ ...styles.center, width: WIDTH }}>
        <Icon name={"arrow-ios-forward-outline"} width={30} height={30} fill={"silver"} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  group: {
    marginTop: 20
  },
  title: {
    fontSize: 14,
    textTransform: "uppercase",
    fontWeight: "bold",
    marginLeft: 20,
    marginBottom: 5
  },
  center: {
    justifyContent: "center",
    alignItems: "center"
  },
  img: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: "cover"
  }
});