import React, { useState, useContext, useEffect } from 'react'
import { ScrollView, TextInput, SafeAreaView, Text, View, Image, TouchableOpacity, StatusBar, ActivityIndicator, StyleSheet } from 'react-native'
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
} from '../../styles/Colors.js';
//import LinearGradient from 'react-native-linear-gradient';

function Filter(props) {
  const { t, i18n } = useTranslation();
  const [moreOptions, setmoreOptions] = useState(false);

  return (
    <View style={styles.wrap}>
      <View style={styles.barUp}>
       
        <View style={{ alignContent: "center", alignItems: "center", justifyContent: "center", height: 50, width: "80%", flexDirection: "row"}}>
          <TextInput
            style={{ backgroundColor: "rgba(0,0,0,0.05)", width: '90%', height: 50, borderRadius: 5, fontSize: 16, paddingLeft: 10 }}
            onChangeText={text => props.getSearch(text)}
            value={props.search}
            placeholder={t("search")}
          />
          <Icon name={'search-outline'} width={20} height={48} fill={color_primary} style={{ position: 'absolute', right: 10, top: -25 }} />
        </View>

        <View style={{ alignContent: "center", alignItems: "center", justifyContent: "center", height: 50, width: "20%" }}>
          <TouchableOpacity
            onPress={() => setmoreOptions(!moreOptions)}
            style={{ backgroundColor: color_white, width: 50, height: 50, borderRadius: 5, alignItems: "center", alignContent: "center", justifyContent: "center" }}>
            <Icon name={moreOptions ? 'close-circle-outline' : 'funnel-outline'} width={20} height={48} fill={color_primary} />
          </TouchableOpacity>
        </View>
      </View>


      {moreOptions &&
        <View style={styles.moreOptions}>
          <View style={styles.column}>
            <Text style={styles.columnTitle}>{t("filterBy")}</Text>
            <TouchableOpacity onPress={() => props.getFilterBy(props.filter === "Pendiente" ? null : "Pendiente")} style={styles.option}>
              <Text style={[styles.optionText, { borderBottomWidth: props.filter === "Pendiente" ? 1 : 0 }]}>{t("slopes")}</Text>
              <Icon name={props.filter === "Pendiente" ? 'checkmark-square-2-outline' : 'square-outline'} width={25} height={25} fill={props.filter === "Pendiente" ? "silver" : "silver"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.getFilterBy(props.filter === "Procesada" ? null : "Procesada")} style={styles.option}>
              <Text style={[styles.optionText, { borderBottomWidth: props.filter === "Procesada" ? 1 : 0 }]}>{t("scheduled")}</Text>
              <Icon name={props.filter === "Procesada" ? 'checkmark-square-2-outline' : 'square-outline'} width={25} height={25} fill={props.filter === "Procesada" ? "silver" : "silver"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.getFilterBy(props.filter === "Realizada" ? null : "Realizada")} style={styles.option}>
              <Text style={[styles.optionText, { borderBottomWidth: props.filter === "Realizada" ? 1 : 0 }]}>{t("done")}</Text>
              <Icon name={props.filter === "Realizada" ? 'checkmark-square-2-outline' : 'square-outline'} width={25} height={25} fill={props.filter === "Realizada" ? "silver" : "silver"} />
            </TouchableOpacity>
          </View>
          <View style={styles.column}>
            <Text style={styles.columnTitle}>{t("sortBy")}</Text>
            <TouchableOpacity onPress={() => props.getOrderBy(props.order === "sub_category_name" ? null : "sub_category_name")} style={styles.option}>
              <Text style={[styles.optionText, { borderBottomWidth: props.order === "sub_category_name" ? 1 : 0 }]}>{t("treatment")}</Text>
              <Icon name={props.order === "sub_category_name" ? 'checkmark-square-2-outline' : 'square-outline'} width={25} height={25} fill={props.order === "sub_category_name" ? "silver" : "silver"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.getOrderBy(props.order === "surnames" ? null : "surnames")} style={styles.option}>
              <Text style={[styles.optionText, { borderBottomWidth: props.order === "surnames" ? 1 : 0 }]}>{t("customers")}</Text>
              <Icon name={props.order === "surnames" ? 'checkmark-square-2-outline' : 'square-outline'} width={25} height={25} fill={props.order === "surnames" ? "silver" : "silver"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.getOrderBy(props.order === "created_at" ? null : "created_at")} style={styles.option}>
              <Text style={[styles.optionText, { borderBottomWidth: props.order === "created_at" ? 1 : 0 }]}>{t("date")}</Text>
              <Icon name={props.order === "created_at" ? 'checkmark-square-2-outline' : 'square-outline'} width={25} height={25} fill={props.order === "created_at" ? "silver" : "silver"} />
            </TouchableOpacity>
          </View>
        </View>
      }
    </View>

  )
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: "white", //color_primary,
    flexDirection: "column",
    width: '100%',
    marginTop: 0,
    padding: 10,
    justifyContent: "center",
    alignItems: 'center',
    alignContent: "center"
  },
  barUp: {
    flexDirection: "row",
    paddingHorizontal: 5
  },









  moreOptions: {
    flexDirection: "row",
    width: "100%",
    borderBottomColor: color_white,
    borderBottomWidth: 1,
    padding: 5
  },
  column: {
    width: "50%",
    flexDirection: "column",
    backgroundColor: "rgba(255,255,255,0.1)",
    marginHorizontal: 2,
    borderRadius: 8
  },
  columnTitle: {
    textTransform: "capitalize",
    width: "100%",
    textAlign: "center",
    color: color_white,
    fontWeight: "bold"
  },
  option: {
    flexDirection: "row",
    marginVertical: 2
  },
  optionText: {
    borderBottomColor: "silver",
    width: "70%",
    lineHeight: 25,
    height: 25,
    marginLeft: 15,
    color: "silver",
    fontSize: 14,
    textTransform: "capitalize",
    fontWeight: "600"
  }
})

export default Filter;