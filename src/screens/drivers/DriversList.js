import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView,  ActivityIndicator, TextInput, Text, View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import Pagination from '../../components/filters/Pagination.js';
import FilterSilver from '../../components/filters/Silver';
import FilterGolden from '../../components/filters/Golden';
import CardDriver from '../../components/cards/CardDriver.js';
import CardEmpty from '../../components/cards/CardEmpty.js';
import { Icon } from 'react-native-eva-icons';
import { drivers } from '../../services/connection.js';
import {color_screen, color_primary, color_grey_half} from '../../styles/Colors.js';
import Menu from '../../components/generic/Menu';
import MenuServices from '../../components/generic/MenuServices'
import MenuVertical from '../../components/generic/MenuVertical.js';


function DriversList(props) {
  const { t, i18n } = useTranslation();
  const [Load, setLoad] = useState(true);
  const [premium, setpremium] = useState(null);
  const [stars, setstars] = useState(null);
  const [search, setsearch] = useState(null);
  const [page, setpage] = useState(1);
  const [Data, setData] = useState(false);
  const [vertical, setvertical] = useState(false);

  useEffect(() => {
    get()
  }, []);

  useEffect(() => {
    get()
  }, [premium, stars, search, page]);

  async function get() {
    console.log("get() home recovery")
    setLoad(true)
    const res = await drivers.driverList(i18n.language, premium, stars, search, page)
    setData(res)
    setLoad(false)
  }

  function onChangeText(text) {
    if (page !== 1) { setpage(1) }
    if (text !== "") { setsearch(text) }
    else {
      if (text === "") {
        setsearch(null)
      }
    }
  }

  function getPage(v) {
    setpage(v)
  }

  function getPremium(e) {
    if (e === true) { setpremium(1) }
    else {
      if (e === false) { setpremium(0) }
    }
  }

  function getStars(e) {
    if (e === true) { setstars(1) }
    else {
      if (e === false) { setstars(0) }
    }
  }

  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color_screen }}>
      <ScrollView tickyHeaderIndices={[0]} scrollEventThrottle={16} horizontal={false}>

      <MenuServices id={props.route.params.data.id} goToScreen={goToScreen}/>
      
      <View style={styles.wrap}>
          <View style={styles.search}>
            <TextInput
              value={props.text}
              placeholder="Buscar..."
              placeholderTextColor={color_grey_half}
              style={{ color: "#777", width: "85%", left: 15, fontSize: 20 }}
              onChangeText={text => onChangeText(text)}
            />
            <Icon name='search-outline' fill={color_grey_half} width={30} height={30} />
          </View>
          <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-around" }}>
            <FilterSilver width={"45%"} icon="award" textUp="Clasificación" textDown="Premium" function={getPremium} />
            <FilterGolden width={"45%"} icon="star" textLeft="5 Estrellas" textRight="" function={getStars} />
          </View>
        </View>


      {Load === true && <ActivityIndicator color={color_primary} size={40} />}
      {Load === false && Data.data.length !== 0 && Data.data.map((i, key) => {
        return (
          <CardDriver key={key} data={i} goToScreen={props.goToScreen} />
        )
      })
      }
      {Load === false && Data.data.length === 0 && <CardEmpty />}
      {Load === false && Data.last_page > 1 &&
        <Pagination page={page} lastPage={Data.last_page} getPage={getPage} />
      }
 <View style={{height:80}}></View>
</ScrollView>

<Menu props={props} option={3} />
      {vertical === true &&
        <MenuVertical
          width={280}
          show={vertical}
          action={setvertical}
          goToScreen={goToScreen}
        />
      }
   </SafeAreaView>
  )
}

export default DriversList;

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "column",
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  search: {
    width: "90%",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 5,
    borderBottomColor: color_grey_half,
    borderBottomWidth: 1
  }
})