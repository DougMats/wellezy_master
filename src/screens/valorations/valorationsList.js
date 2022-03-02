import React, { useState, useContext, useEffect } from 'react'
import {RefreshControl, ScrollView, TextInput, SafeAreaView, Text, View, Image, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native'
import { useTranslation } from 'react-i18next';
import { Icon } from 'react-native-eva-icons';
import UserContext from '../../../contexts/UserContext'
import Pagination from '../../components/filters/Pagination.js'
import { valorations } from '../../services/connection'
import {
  color_primary,
  color_secondary,
  color_tertiary,
  color_quarter,
  color_fifth,
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
} from '../../styles/Colors';
import Filter from '../../components/valorations/Filter.js';
import ValorationsCard from '../../components/valorations/ValorationCard.js';
import Menu  from '../../components/generic/Menu.js'



function ValorationsList(props) {
  const { t, i18n } = useTranslation();
  const { userDetails } = useContext(UserContext);
  const [Load, setLoad] = useState(true)
  const [Data, setData] = useState(null);
  const [page, setpage] = useState(1);
  const [search, setsearch] = useState(null);
  const [filterBy, setfilterBy] = useState(null);
  const [orderBy, setorderBy] = useState(null);

  useEffect(() => {
    Get()
  }, [props, page, search, filterBy, orderBy]);

  async function Get() {
    setLoad(true)
    let res = await valorations.valorationsList(i18n.language, userDetails.id, search, filterBy, orderBy, page)
    setData(res)
    setLoad(false)
  }

  function getPage(p) {
    setpage(p)
  }

  function getSearch(v) {
    setpage(1);
    if (v === "") { setsearch(null) }
    else {
      setsearch(v)
    }
  }

  function getFilterBy(v) {
    setpage(1);
    setfilterBy(v)
  }

  function getOrderBy(v) {
    setpage(1);
    setorderBy(v)
  }

  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColo: color_screen }}>
      <Filter
        getSearch={getSearch}
        getFilterBy={getFilterBy}
        getOrderBy={getOrderBy}
        search={search}
        filter={filterBy}
        order={orderBy}
      />
      <ScrollView
      scrollEventThrottle={16}
      refreshControl={
        <RefreshControl
          refreshing={Load}
          onRefresh={Get}
        />
      }
      >
        {!Load && Data !== null &&
          Data.data.map((i, key) => {
            return (
              <ValorationsCard key={key} data={i} goToScreen={goToScreen} />
            )
          })
        }
      {!Load && Data !== null && Data.data.length === 0 &&
        <View style={{
          marginTop: 50,
          borderColor: color_grey_half,
          borderWidth: 1,
          borderRadius: 12,
          paddingHorizontal: 40,
          paddingVertical: 10,
          borderStyle: "dashed",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width:"60%",
          alignSelf:"center"
        }}>
          <Icon name='alert-triangle' width={80} height={80} fill={color_grey_half} />

          <Text style={{ color: color_grey_half }}>No tienes valoraciones</Text>
        </View>
      }
        {!Load && Data.last_page > 0 && Data.data.length !== 0 &&
          <Pagination page={page} lastPage={Data.last_page} getPage={getPage} />
        }
        <View style={{height:60}}></View>
      </ScrollView>
      <Menu
        props={props}
        option={1}
        alert={0}
      />
    </SafeAreaView>
  )
}
export default ValorationsList;
