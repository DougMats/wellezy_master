import React, { useState } from 'react';
import { TouchableOpacity, View, Text, ScrollView } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
function Rating(props) {
  const { t, i18n } = useTranslation();
  const [title, settitle] = useState(t("GREAT"));
  const [value, setvalue] = useState(5);

  function starting(e) {
    if (e === 1) { settitle(t("VERYBAD")); setvalue(e) }
    if (e === 2) { settitle(t("BAD")); setvalue(e) }
    if (e === 3) { settitle(t("OKAY")); setvalue(e) }
    if (e === 4) { settitle(t("GOOD")); setvalue(e) }
    if (e === 5) { settitle(t("GREAT")); setvalue(e) }
  }
  function save() {
    props.GetRating(value)
  }
  return (
    <View>
      <Text style={{ top: -10, color: "orange",textTransform:"capitalize", textAlign: "center", fontSize: 30, }}>{title}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <TouchableOpacity onPress={() => starting(1)}>
          <Icon name={value >= 1 ? 'star' : 'star-outline'} width={30} height={30} fill='orange' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => starting(2)}>
          <Icon name={value > 1 ? 'star' : 'star-outline'} width={30} height={30} fill='orange' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => starting(3)}>
          <Icon name={value > 2 ? 'star' : 'star-outline'} width={30} height={30} fill='orange' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => starting(4)}>
          <Icon name={value > 3 ? 'star' : 'star-outline'} width={30} height={30} fill='orange' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => starting(5)}>
          <Icon name={value === 5 ? 'star' : 'star-outline'} width={30} height={30} fill='orange' />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => save()} style={{ top: 10, backgroundColor: "orange", flexDirection: "row", height: 40, borderRadius: 10, margin: 10, alignContent: "center", alignItems: "center", justifyContent: "center" }}>
        <Icon name='checkmark-circle-2-outline' width={20} height={20} fill='white' />
        <Text style={{ color: "white", marginLeft: 10, fontWeight: "bold", fontSize: 16 }}>{t("validate")}</Text>
      </TouchableOpacity>
    </View>
  );
}
export default Rating;