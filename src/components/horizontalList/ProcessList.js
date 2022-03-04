import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, FlatList, TextInput, View, TouchableOpacity, Text, Image, Dimensions } from 'react-native';
import { procedimientos } from '../../services/connection.js';
import { useTranslation } from 'react-i18next';
import { Icon } from 'react-native-eva-icons';
import {
  color_primary,
  color_secondary,
  color_tertiary,
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
} from '../../styles/Colors.js'
import { file_server1 } from '../../../Env'
import ScoreStars from '../stars/ScoreStars.js'
import { letterCounter } from '../Logic.js';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ProcessList(props) {
  const { t, i18n } = useTranslation();
  const [data, setdata] = useState([]);
  const [Load, setLoad] = useState(true);

  useEffect(() => {
    Get()
  }, []);

  async function Get() {
    setLoad(true)
    const list = await procedimientos.List(i18n.language, null)
    setdata(list)
    setLoad(false)
  }

  

  const renderItem = ({ item }) => (
    <Card data={item} goToScreen={props.goToScreen}/>
  );

if(data.length > 0){
  return (
    <View style={styles.wrap}>
      <View style={styles.head}>
        <Text style={styles.title}>Procedimientos</Text>
        <TouchableOpacity
          onPress={() => props.goToScreen("Procedures", null)}
          style={styles.btn}>
          <Text style={styles.btnText}>ver más</Text>
        </TouchableOpacity>
      </View>

      

      <FlatList
        horizontal={true}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
  


      {/*
      <View style={styles.body}>
        {Load === true ?
          <ActivityIndicator color={color_primary} size={40} />
          :
          <ScrollView horizontal={true}>
            {data.map((i, key) => {
              return (
                <Card key={key} data={i} goToScreen={props.goToScreen} />
              )
            })}
          </ScrollView>
        }
      </View>
      */}
    </View>
  )



}
else{
  return false
}

}
export default React.memo(ProcessList);
const styles = StyleSheet.create({
  wrap: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: "column",
    borderBottomColor: color_grey_light,
    borderBottomWidth: 0.5
  },
  head: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "space-between"
  },
  title: {
    fontWeight: "700",
    fontSize: 16,
    color: color_primary
  },
  btn: {
    backgroundColor: color_white,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12
  },
  btnText: {
    fontSize:12,
    color: color_grey_dark
  },




  card: {
    justifyContent:"center",
    alignItems:"center",
    flexDirection: "column",
    padding: 10,
    backgroundColor: color_white,
    borderRadius: 12,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  cardL: {
    backgroundColor: "#F4F6F6",
    width: 90,
    height: 90,
    borderRadius: 20,
    overflow: "hidden"
  },
  img: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: "cover"
  },
  cardR: {
    flexDirection: "column",
    paddingLeft: 10,
    //width: windowWidth / 2,
    overflow: "hidden"
  },
  name: {
    marginTop:5,
    textAlign:"center",
    textTransform: "uppercase",
    fontSize: 14,
    fontWeight: "bold",
    color: color_primary
  },
  wrapper: {
    marginBottom: 2,
    borderBottomColor: color_grey_light,
    borderBottomWidth: 0.5,
    flexDirection: "row"
  },
  text: {
    color: color_grey_half,
    fontSize: 14,
    fontWeight: "700"
  }
})

const Card = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <TouchableOpacity onPress={() => props.goToScreen("Process", props.data)} style={styles.card}>
      <View style={styles.cardL}>
        <Image style={styles.img} source={{ uri: `${file_server1}/img/category/picture/${props.data.foto}` }} />
      </View>

      <View style={styles.cardR}>
        <Text style={styles.name}>{letterCounter(props.data.name, 21)}</Text>
        <View style={styles.wrapper}>
          <Text style={styles.text}>{t("recommendedBy")}: {props.data.recommended}</Text>
        </View>
        <ScoreStars stars={props.data.stars} size={20} color={color_star} />
      </View> 
    </TouchableOpacity>
  )
}