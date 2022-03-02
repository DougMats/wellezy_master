import React from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next';
import { Icon } from 'react-native-eva-icons';
import { color_white, color_grey_half, color_grey_dark } from '../../styles/Colors.js';
import { file_server1 } from '../../../Env'

function ValorationsCard(props) {
  const { t, i18n } = useTranslation();
  function fecha(data, type) {
    let fecha, hora, pasttime
    let halodata = data.split(" ");
    let DD = halodata[0];
    let HH = halodata[1];
    let P = "0";
    let D = DD.split("-");
    let H = HH.split(":")
    fecha = D[2] + "/" + D[1] + "/" + D[0];
    hora = HH;
    pasttime = P;
    if (type === "fecha") { return fecha; }
    if (type === "hora") { return hora; }
    if (type === "pasttime") { return pasttime; }
  }

  return (
    <TouchableOpacity onPress={() => props.goToScreen("ValorationManager", props.data)} style={{alignSelf: "center",width: "90%",backgroundColor: color_white,flexDirection: "column",borderRadius: 8,marginVertical: 10,overflow: "hidden",}}>
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <View style={{ width: "30%", justifyContent: "center", alignItems: "center" }}>
          <View style={{ width: 60, height: 60, borderRadius: 60, overflow: "hidden", }}>
            <Image style={{ width: null, height: null, flex: 1, resizeMode: "cover" }} source={{ uri: `${file_server1}/img/wellezy/users/${props.data.img}` }} />
          </View>
        </View>
        <View style={{ width: "70%", padding: 10, flexDirection: "column", }}>
          <View style={{ flexDirection: "row", marginBottom: 5 }}>
            <Text style={{ color: color_grey_half, fontSize: 14, lineHeight: 14, textTransform: "capitalize" }}>{t("name")}: </Text>
            <Text style={{ color: color_grey_dark, fontSize: 14, lineHeight: 14, textTransform: "capitalize" }}>{props.data.name.split(" ")[0]} {props.data.surname.split(" ")[0]}</Text>
          </View>
          <View style={{ flexDirection: "row", }}>
            <Text style={{ color: color_grey_half, fontSize: 14, lineHeight: 14, textTransform: "capitalize" }}>{t("country")}: </Text>
            <Text style={{ color: color_grey_dark, fontSize: 14, lineHeight: 14, textTransform: "capitalize" }}>{props.data.country}. {props.data.city}</Text>
          </View>
          <View style={{ flexDirection: "row", }}>
            <Text style={{ color: color_grey_half, fontSize: 14, lineHeight: 14, textTransform: "capitalize" }}>{t("treatment")}: </Text>
            <Text style={{ color: color_grey_dark, fontSize: 14, lineHeight: 14, textTransform: "capitalize", }}>{props.data.sub_category_name}</Text>
          </View>
        </View>
      </View>
      <View style={{ paddingVertical: 5, flexDirection: "row", width: "60%",}}>
        <View style={{ flexDirection: "row", marginHorizontal: 5 }}>
          <Icon name='calendar-outline' width={15} height={15} fill={color_grey_half} />
          <Text style={{ marginLeft: 5, color: color_grey_half, fontSize: 14, lineHeight: 15 }}>{fecha(props.data.created_at, "fecha")}</Text>
        </View>
        <View style={{ flexDirection: "row", marginHorizontal: 5 }}>
          <Icon name='clock-outline' width={15} height={15} fill={color_grey_half} />
          <Text style={{ marginLeft: 5, color: color_grey_half, fontSize: 14, lineHeight: 15 }}>{fecha(props.data.created_at, "hora")}</Text>
        </View>
      </View>
      {props.data.status_valoration === "Pendiente" && <View style={{ position: "absolute", width: "40%", bottom: 0, right: 0, paddingVertical: 5, borderTopLeftRadius: 12, backgroundColor: "#E74C3C" }}>
        <Text style={{ textTransform: "capitalize", textAlign: "center", width: "100%", fontWeight: "bold", fontSize: 14, color: color_white }}>{t("slope")}</Text>
      </View>
      }
      {props.data.status_valoration === "Procesada" && <View style={{ position: "absolute", width: "40%", bottom: 0, right: 0, paddingVertical: 5, borderTopLeftRadius: 12, backgroundColor: "#3498DB" }}>
        <Text style={{ textTransform: "capitalize", textAlign: "center", width: "100%", fontWeight: "bold", fontSize: 14, color: color_white }}>{t("scheduled")}</Text>
      </View>
      }
      {props.data.status_valoration === "Realizada" && <View style={{ position: "absolute", width: "40%", bottom: 0, right: 0, paddingVertical: 5, borderTopLeftRadius: 12, backgroundColor: "#1ABC9C" }}>
        <Text style={{ textTransform: "capitalize", textAlign: "center", width: "100%", fontWeight: "bold", fontSize: 14, color: color_white }}>{t("done")}</Text>
      </View>
      }
    </TouchableOpacity>
  )
}
export default ValorationsCard;