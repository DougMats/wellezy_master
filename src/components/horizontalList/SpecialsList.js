import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, TextInput, View, TouchableOpacity, Text, Image, Dimensions } from 'react-native';
import { specials } from '../../services/connection.js';
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
import CardSpecialsMini from '../../components/cards/CardSpecialsMini.js';

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
    const list = await specials.specialsListAll(i18n.language)
    setdata(list)
    setLoad(false)
  }


  if(data.length > 0){
  return (
    <View style={styles.wrap}>
      {Load === false &&
        <View style={styles.head}>
          <Text style={styles.title}>Ofertas Especiales</Text>
           <TouchableOpacity
            onPress={() => props.goToScreen("DashboardServices", 8)}
            style={styles.btn}>
            <Text style={styles.btnText}>ver más</Text>
          </TouchableOpacity>
        </View>
      }
      <View style={styles.body}>
        {Load === true ?
          <ActivityIndicator color={color_primary} size={40} />
          :
          <ScrollView horizontal={true}>
           {data.map((i, key) => {
              return (
                <CardSpecialsMini key={key} data={i} goToScreen={props.goToScreen} />
              )
            })}
          </ScrollView>
        }
      </View>
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
    //backgroundColor:"red",
    paddingTop: 10,
    paddingBottom: 20,
    flexDirection: "column",
    // borderBottomColor: color_grey_light,
    // borderBottomWidth: 0.5
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
    color: color_grey_dark
  },
  btn: {
    backgroundColor: color_white,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 12
  },
  btnText: {
    textTransform:"capitalize",
    fontSize:12,
    color: color_grey_dark
  },
  card: {
    flexDirection: "row",
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
    width: 80,
    height: 80,
    borderRadius: 80,
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
    width: windowWidth / 2,
    overflow: "hidden"
  },
  name: {
    textTransform: "uppercase",
    fontSize: 16,
    fontWeight: "bold",
    color: color_primary
  },
  wrapper: {
    marginBottom: 2,
    paddingVertical: 5,
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