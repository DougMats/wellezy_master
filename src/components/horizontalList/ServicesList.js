import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity, Text, Image, Dimensions } from 'react-native';
import { color_white, color_grey_dark } from '../../styles/Colors.js'
import { useTranslation } from 'react-i18next';
import { file_server1 } from '../../../Env'
//import { services } from '../../services/connection.js'

import { connect } from 'react-redux'

//import {selectCurrentAmount} from '../../store/amount/reducer'

const windowWidth = Dimensions.get('window').width / 12;


const mapStateToProps = (state) => {
  return {
    list: state.servicesReducer.list,
    //amount : selectCurrentAmount(state)
  }
}






function ServicesList({ list, goToScreen }) {
  const { t, i18n } = useTranslation();
  const [ourServices, setourServices] = useState([]);
  const [open, setopen] = useState(false);

  // useEffect(async () => {
  //   const res = await services.servicesList(i18n.language)
  //   setourServices(res)
  // }, [])

  const renderItem = ({ item }) => (<Card data={item} goToScreen={goToScreen} />);

  return (
    <View
      style={{
        backgroundColor: "#f5f5f5",
        width: windowWidth * 12,
        paddingHorizontal: windowWidth / 2,
        //height:open? null:240
      }}>

      <View style={styles.head}>
        <Text style={styles.title}>{t("ourServices")}</Text>

        {list.length !== 0 &&  list.length > 8 &&
        <TouchableOpacity
          onPress={() => setopen(!open)}
          style={styles.btn}>
          <Text style={styles.btnText}>{open ? t("seeLess") : t("seeMore")}</Text>
        </TouchableOpacity>
        }

      </View>

      {list.length!== 0 && 
        <FlatList
          horizontal={false}
          numColumns={2}
          //data={ourServices}
          data={list}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          columnWrapperStyle={{
            justifyContent: "space-between",
          }}
        />
      }

    </View>
  )
}


//export default ServicesList;
export default connect(mapStateToProps, null)(ServicesList);

const styles = StyleSheet.create({
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
    textTransform: "capitalize",
    fontSize: 12,
    color: color_grey_dark
  },
  card: {
    width: windowWidth * 5.3,
    borderRadius: 8,
    paddingVertical: 3,
    backgroundColor: color_white,
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between"
  },
  cardImg: {
    width: windowWidth * 1.5,
    borderRadius: 8,
    height: windowWidth * 1.5,
    backgroundColor: "#F5F5F5",
    marginLeft: 5,
    overflow: "hidden"
  },
  cardText: {
    color: "black",
    fontWeight: "bold",
    alignSelf: "center",
    paddingHorizontal: 5,
    lineHeight: windowWidth * 1.5,
    width: windowWidth * 3.4,
    textTransform: "capitalize"
  }
})

const Card = (props) => {
  return (
    <TouchableOpacity onPress={() => props.goToScreen(props.data.screen, props.data)} style={styles.card}>
      <View style={styles.cardImg}>
        <Image source={{ uri: `${file_server1}/img/wellezy/services/icon/${props.data.img}` }} style={{ width: null, height: null, flex: 1, resizeMode: "cover" }} />
      </View>
      <Text style={{ ...styles.cardText, fontSize: props.data.name.length > 12 ? 12 : 14, }}>
        {props.data.name.length > 15 ? ((props.data.name.substring(0, 15 - 3)) + '...') : props.data.name}
      </Text>
    </TouchableOpacity>
  )
}