import React, { useState} from 'react';
import { View, Text } from 'react-native';
//import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import { color_grey_dark} from '../../styles/Colors.js';

function CardEmpty() {
  const { t, i18n } = useTranslation();
    return (
      <View style={{ width: "100%", alignContent: "center", alignItems: "center" }}>
        <View style={{ marginVertical: "5%", width: "50%", flexDirection: "column", alignContent: "center", alignItems: "center", borderStyle: 'dashed', borderColor: color_grey_dark, borderWidth: 1, paddingVertical: 15, borderRadius: 30, paddingHorizontal: 30 }}>
          <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: "center", color: color_grey_dark }}>{t("sorryEmpty")}</Text>
        </View>
      </View>
    );
  }

export default React.memo(CardEmpty)