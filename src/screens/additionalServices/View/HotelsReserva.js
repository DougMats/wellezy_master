import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

function HotelsReserva(props) {
  const [kids, setkids] = useState(0);
  const [adults, setadults] = useState(0);
  const [bedrooms, setbedrooms] = useState(0);

  const [dateIni, setdateIni] = useState(null);
  const [dateEnd, setdateEnd] = useState(null);

  function setKidsCount(e) {
    let value = kids + e
    setkids(value)
  }


  return (

    <View style={{ borderTopColor: "silver", borderTopWidth: 0.5, width: "100%", alignContent: "center", alignItems: "center", marginTop: 20, paddingTop: 20 }}>
      <Text>fecha llegada</Text>
      <Text>fecha salida</Text>
      <Text>adultos</Text>
      <View style={{ flexDirection: "row", width: "60%", justifyContent: "space-between" }}>
        <TouchableOpacity style={{ backgroundColor: "#00AFE8" }} onPress={() => setKidsCount(+1)}>
          <Icon name='plus-circle-outline' fill='white' width={25} height={25} />
        </TouchableOpacity>
        <Text>niños: {kids}</Text>
        <TouchableOpacity style={{ backgroundColor: "#00AFE8" }} onPress={() => setKidsCount(-1)}>
          <Icon name='minus-circle-outline' fill='white' width={25} height={25} />
        </TouchableOpacity>
      </View>
      <Text>habitaciones</Text>
      <TouchableOpacity onPress={() => setreserving(!reserving)} style={{ width: "70%", backgroundColor: colorAlfa, borderRadius: 15, paddingVertical: 10, paddingHorizontal: 20, flexDirection: "row", justifyContent: "center" }}>
        <Icon name='calendar-outline' fill={colorZeta} width={20} height={20} />
        <Text style={{ textAlign: "center", marginLeft: 5, color: "white", fontWeight: "bold", textTransform: "uppercase" }}>cotizar</Text>
      </TouchableOpacity>
    </View>

  )
}

export default HotelsReserva;