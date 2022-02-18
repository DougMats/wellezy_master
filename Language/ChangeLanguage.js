import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import UserContext from '../contexts/UserContext'
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
  color_grey_dark



} from '../src/styles/Colors.js';

function ChangeLanguage(props) {
  const { t, i18n } = useTranslation();
  const userDetails = React.useContext(UserContext);
  const [Lng, setLng] = useState(i18n.language);
  const options = [
    { label: t("English"), value: 'en', icon: '🇬🇧' },
    { label: t("Spanish"), value: 'es', icon: '🇪🇸' },
    { label: t("Russian"), value: 'ru', icon: '🇷🇺' },
    { label: t("Italian"), value: 'it', icon: '🇮🇹' },
    { label: t("Portuges"), value: 'pr', icon: '🇵🇹' },
    { label: t("French"), value: 'fr', icon: '🇫🇷' },
  ];
  const Change = (lng) => {
    setLng(lng)
    console.log("seting to: ", lng);
    i18n.changeLanguage(lng);
  }
  return (
    <View style={styles.wrap}>


      <Text style={styles.title}>{t("changeLanguage")}</Text>

      <View style={styles.wrapper}>
        {options.map((i, key) => {
          return (
            <TouchableOpacity key={key}
              onPress={() => { Change(i.value); }}
              style={[
                styles.btn,
                { backgroundColor: Lng == i.value ? color_primary : color_white }
              ]
              }>
              <Text
                style={[
                  styles.btnText,
                  { color: Lng == i.value ? color_white : color_primary }]
                }>{i.icon} {i.label}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>

  );
}
const styles = StyleSheet.create({
  wrap: {
    alignSelf: "center",
    backgroundColor: color_white,
    paddingHorizontal: 10,
    paddingVertical: 20,
    width: "90%",
    borderRadius: 8,
    flexDirection: 'column',
  },
  title: {
    textAlign: "center",
    width: "100%",
    textTransform: "capitalize",
    marginBottom: 20,
  },
  wrapper: {
    flexDirection: 'row',
    width: "100%",
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  btn: {
    borderColor: color_primary,
    borderWidth: 1,
    margin: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    minWidth: 60
  },
  btnText: {
    fontSize: 14,
    textAlign: "center",
  }
});
export default ChangeLanguage;