import React, { useState, useContext, useEffect } from 'react'
import { ScrollView, TextInput, SafeAreaView, Text, View, Image, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native'
import { useTranslation } from 'react-i18next';
import { Icon } from 'react-native-eva-icons';
import UserContext from '../../../contexts/UserContext'
import Pagination from '../../components/filters/Pagination.js'
import { valorations } from '../../services/connection'
import { colorAA, colorAlfa, colorBetta, colorZeta, color_grey_dark, color_grey_half } from '../../styles/Colors.js';
import Filter from './Filter';
import ValorationsCard from './ValorationCard';

function ValorationsListMedic(props) {
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

//   function goToScreen(screen, data) {
// console.log("go go go ...")
//     //props.props.navigation.navigate(screen, { randomCode: Math.random(), data })
//   }

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
  


  return (
    <View style={{
      width: "100%",
      alignItems: "center",
      paddingBottom: 70
    }}>
      <Filter
        getSearch={getSearch}
        getFilterBy={getFilterBy}
        getOrderBy={getOrderBy}
        search={search}
        filter={filterBy}
        order={orderBy}
      />
      {Load && <ActivityIndicator color={colorAlfa} size={40} style={{ marginTop: 200 }} />}
      {!Load && Data !== null &&
        Data.data.map((i, key) => {
          return (
            <ValorationsCard key={key} data={i} goToScreen={props.goToScreen} />
          )
        })
      }
      {!Load && Data !== null && Data.data.length === 0 &&
        <View style={{
          marginTop:50,
          borderColor:color_grey_half,
          borderWidth:1,
          borderRadius:12,
          paddingHorizontal:40,
          paddingVertical:10,
          borderStyle:"dashed",
          flexDirection:"column",
          justifyContent:"center",
          alignItems:"center"
        }}>
           <Icon name='alert-triangle' width={80} height={80} fill={color_grey_half} />

          <Text style={{color: color_grey_half}}>No tienes valoraciones</Text>
        </View>
      }
      {!Load && Data.last_page > 0 && Data.data.length !== 0 &&
        <Pagination page={page} lastPage={Data.last_page} getPage={getPage} />
      }
    </View>
  )
}
export default React.memo(ValorationsListMedic);