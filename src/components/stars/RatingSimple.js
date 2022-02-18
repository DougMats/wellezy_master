import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, ScrollView } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
function RatingSimple(props) {
  const { t, i18n } = useTranslation();
  const [title, settitle] = useState("GREAT");
  const [value, setvalue] = useState(5);
  function starting(e) {
    if (e === 1) { settitle("VERY BAD"); setvalue(e) }
    if (e === 2) { settitle("BAD"); setvalue(e) }
    if (e === 3) { settitle("OKAY"); setvalue(e) }
    if (e === 4) { settitle("GOOD"); setvalue(e) }
    if (e === 5) { settitle("GREAT"); setvalue(e) }
  }

  useEffect(() => {
    props.getValueRating(value);
  }, [value]);

  return (
    <View style={{ flexDirection: "row", marginTop: -10 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <TouchableOpacity onPress={() => starting(1)}>
          <Icon name={value >= 1 ? 'star' : 'star-outline'} width={25} height={25} fill='#00AFE8' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => starting(2)}>
          <Icon name={value > 1 ? 'star' : 'star-outline'} width={25} height={25} fill='#00AFE8' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => starting(3)}>
          <Icon name={value > 2 ? 'star' : 'star-outline'} width={25} height={25} fill='#00AFE8' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => starting(4)}>
          <Icon name={value > 3 ? 'star' : 'star-outline'} width={25} height={25} fill='#00AFE8' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => starting(5)}>
          <Icon name={value === 5 ? 'star' : 'star-outline'} width={25} height={25} fill='#00AFE8' />
        </TouchableOpacity>
      </View>
      <Text style={{ color: "#00AFE8", textAlign: "center", lineHeight: 25, fontSize: 14, marginLeft: 20 }}>{title}</Text>
    </View>
  );
}
export default RatingSimple;