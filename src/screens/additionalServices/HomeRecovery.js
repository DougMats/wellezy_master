import React, { useState, useEffect } from 'react';
import { ActivityIndicator, TextInput, View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import Pagination from '../../components/filters/Pagination.js';
import FilterSilver from '../../components/filters/Silver';
import FilterGolden from '../../components/filters/Golden';
import CardHomeRecovery from '../../components/cards/CardHomeRecovery.js';
import CardEmpty from '../../components/cards/CardEmpty.js';
import { Icon } from 'react-native-eva-icons';
import { homeRecovery } from '../../services/connection.js';
import { color_primary, color_grey_half} from '../../styles/Colors.js';

function HomeRecovery(props) {
  const { t, i18n } = useTranslation();
  const [Load, setLoad] = useState(true);
  const [premium, setpremium] = useState(null);
  const [stars, setstars] = useState(null);
  const [search, setsearch] = useState(null);
  const [page, setpage] = useState(1);
  const [Data, setData] = useState(false);

  useEffect(() => {
    get()
  }, []);

  useEffect(() => {
    get()
  }, [premium, stars, search, page]);

  async function get() {
    setLoad(true)
    const res = await homeRecovery.AllHomeRecovery(i18n.language, premium, stars, search, page)
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
    if (e === true) { setpremium(true) }
    else {
      if (e === false) { setpremium(null) }
    }
  }

  function getStars(e) {
    if (e === true) { setstars(true) }
    else {
      if (e === false) { setstars(null) }
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{...styles.wrap, display:"none"}}>
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
        <FilterSilver icon="award" textUp="Clasificación" textDown="Premium" function={getPremium} />
        <FilterGolden icon="star" textLeft="5 Estrellas" textRight="" function={getStars} />
      </View>
      {Load === true && <ActivityIndicator color={color_primary} size={40} />}
      
      
      
      <View style={{
        flexDirection: 'row',
        width: "100%",
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
      }}>

{Load === false && Data.data.length !== 0 && Data.data.map((i, key) => {
        return (
          <CardHomeRecovery key={key} data={i} goToScreen={props.goToScreen} />
        )
      })
      }
      </View>
      {Load === false && Data.data.length === 0 && <CardEmpty />}
      {Load === false && Data.last_page > 1 &&
        <Pagination page={page} lastPage={Data.last_page} getPage={getPage} />
      }
    </View>
  )
}
export default React.memo(HomeRecovery);
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