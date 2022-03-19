import React, { useState, useEffect } from 'react';
import { RefreshControl, ActivityIndicator, TextInput, SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon } from 'react-native-eva-icons';
import Head from '../../components/generic/Head';
import Menu from '../../components/generic/Menu';
import MenuVertical from '../../components/generic/MenuVertical.js';
import CardMedics from '../../components/cards/CardMedics.js';
import { color_primary, color_grey_half, color_screen } from '../../styles/Colors.js'
import { doctors } from '../../services/connection.js';
import Pagination from '../../components/filters/Pagination.js';
import FilterSilver from '../../components/filters/Silver';
import FilterGolden from '../../components/filters/Golden';
import CardEmpty from '../../components/cards/CardEmpty.js';

function MedicsList(props) {
  const [vertical, setvertical] = useState(false);
  const { t, i18n } = useTranslation();
  const [DATA, setDATA] = useState(null);
  const [Load, setLoad] = useState(true);
  const [premium, setpremium] = useState(null);
  const [stars, setstars] = useState(null);
  const [search, setsearch] = useState(null);
  const [page, setpage] = useState(1);

  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = 1 }

  useEffect(() => {
    Get();
  }, [randomCode]);

  useEffect(() => {
    Get();
  }, [premium, stars, search, page]);

  async function Get() {
    setLoad(true)
    const res = await doctors.doctorsList(i18n.language, stars, premium, search, page)
    setDATA(res)
    setLoad(false)
 
  }

  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }

  function getPage(p) {
    console.log("page: ", p)
    setpage(p);
  }


  function filterByPremium(e) {
    if (e === true) { setpremium(1) }
    else {
      if (e === false) { setpremium(null) }
    }
  }

  function filterByEstrellas(e) {
    if (e === true) { setstars(1) }
    else {
      if (e === false) { setstars(null) }
    }
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




  // setRefreshing(false)

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   wait(2000).then(() => setRefreshing(false));
  // }, []);
  const [refreshing, setRefreshing] = useState(false);



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color_screen }}>
      <Head props={props} return=""
        show={vertical}
        action={setvertical}
      />
      <ScrollView
        scrollEventThrottle={16}
        horizontal={false}
        showsHorizontalScrollIndicator={false}



        refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={Get} />}
      
        


        // refreshControl={
        //   <RefreshControl
        //     refreshing={refreshing}
        //     onRefresh={onRefresh}
        //   />
        // }

      >
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
          <FilterSilver icon="award" textUp="Clasificación" textDown="Premium" function={filterByPremium} />
          <FilterGolden icon="star" textLeft="5 Estrellas" textRight="" function={filterByEstrellas} />
        </View>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 60
          }}>
          {Load === true && <ActivityIndicator color={color_primary} size={40} />}
          {Load === false && DATA !== null && DATA.data.length !== 0 && DATA.data.map((i, key) => {
            return (
              <CardMedics key={key} data={i} goToScreen={goToScreen} />
            )
          })
          }
          {Load === false && DATA !== null && DATA.data.length === 0 && <CardEmpty />}
        </View>
        {Load === false && DATA.last_page > 1 &&
          <Pagination page={page} lastPage={DATA.last_page} getPage={getPage} />
        }
      </ScrollView>
      <Menu props={props} option={4} />
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
export default MedicsList;
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