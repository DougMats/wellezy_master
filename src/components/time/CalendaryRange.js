import React, { useState, useEffect } from 'react'
import { StatusBar, SafeAreaView, Dimensions, ActivityIndicator, View, Text, Image, TouchableOpacity, StyleSheet, TextInput, ShadowPropTypesIOS } from 'react-native'
import { color_fifth, color_grey_light } from '../../styles/Colors';
import Toast from 'react-native-simple-toast';
import _, { cloneWith } from 'lodash'
import { Icon } from 'react-native-eva-icons';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const celda = windowWidth / 10

function CalendaryRange(props) {
  const toDay = new Date(); // 2022-01-11T17:09:50.794Z
  const [dayInit, setdayInit] = useState(""); //seleccionado inicio
  const [dayEnd, setdayEnd] = useState(""); // seleccionado fin //2022-01-20

  const [labelInit, setlabelInit] = useState(true);
  const [labelEnd, setlabelEnd] = useState(false);

  function switchLabel() {
    setlabelInit(!labelInit)
    setlabelEnd(!labelEnd)
  }

  function zfill(number, width) {
    var numberOutput = Math.abs(number);
    var length = number.toString().length;
    var zero = "0";
    if (width <= length) {
      if (number < 0) {
        return ("-" + numberOutput.toString());
      } else {
        return numberOutput.toString();
      }
    } else {
      if (number < 0) {
        return ("-" + (zero.repeat(width - length)) + numberOutput.toString());
      } else {
        return ((zero.repeat(width - length)) + numberOutput.toString());
      }
    }
  }

  const [yearSelected, setyearSelected] = useState({ leap: false, value: 0 });

  const [monthSelected, setmonthSelected] = useState({
    id: 0,
    name: "",
    daysTotal: "",
    dayInitName: "",
    dayInitNumber: 0,
    dayInitPosition: 0
  });
  const [monthSelectedDaysList, setmonthSelectedDaysList] = useState([]);

  const yearCurrent = { value: toDay.getFullYear(), leap: YEARLEAPER(toDay.getFullYear()) }




  function YEARLEAPER(y) {
    let status
    // Si el año es uniformemente divisible por 4, vaya al paso 2. De lo contrario, vaya al paso 5.
    // Si el año es uniformemente divisible por 100, vaya al paso 3. De lo contrario, vaya al paso 4.
    // Si el año es uniformemente divisible por 400, vaya al paso 4. De lo contrario, vaya al paso 5.
    // El año es un año bisiesto (tiene 366 días).
    // El año no es un año bisiesto (tiene 365 días).
    if (Number.isInteger(y / 4)) { status = true }
    else {
      if (Number.isInteger(y / 100)) { status = true }
      else {
        if (Number.isInteger(y / 400)) { status = true }
        else {
          status = false
        }
      }
    }
    return status
  }



  useEffect(() => {
    setdayInit(props.init)
    setdayEnd(props.end)
    setyearSelected(yearCurrent)
    setmonthSelected(buildMonthCurrent(toDay.getMonth()))
  }, [props.open]);



  const monthList = [
    { 'id': 0, 'name': 'enero', days: 31 },
    { 'id': 1, 'name': 'febrero', days: 28 },
    { 'id': 2, 'name': 'marzo', days: 31 },
    { 'id': 3, 'name': 'abril', days: 30 },
    { 'id': 4, 'name': 'mayo', days: 31 },
    { 'id': 5, 'name': 'junio', days: 30 },
    { 'id': 6, 'name': 'julio', days: 31 },
    { 'id': 7, 'name': 'agosto', days: 31 },
    { 'id': 8, 'name': 'septiembre', days: 30 },
    { 'id': 9, 'name': 'octubre', days: 31 },
    { 'id': 10, 'name': 'noviembre', days: 30 },
    { 'id': 11, 'name': 'diciembre', days: 31 }
  ];


  function buildMonthCurrent(m) {
    let data = {
      id: m,
      name: monthList[m].name,
      daysTotal: monthList[m].days,
      dayInitName: "mon",
      dayInitNumber: 34,
      dayInitPosition: 0
    }
    return data
  }

  function changeMonth(v) {
    const id = monthSelected.id
    const mes = id + v

    if (mes === -1) {
      setyearSelected({ value: yearSelected.value - 1, leap: YEARLEAPER(yearSelected.value - 1) })
      const res = buildMonthCurrent(11)
      setmonthSelected(buildMonthCurrent(11))
    }

    else {
      if (mes === 12) {
        setyearSelected({ value: yearSelected.value + 1, leap: YEARLEAPER(yearSelected.value + 1) })
        const res = buildMonthCurrent(0)
        setmonthSelected(buildMonthCurrent(0))
      }
      else {
        setmonthSelected(buildMonthCurrent(mes))
      }
    }
  }


  useEffect(() => {
    builderMonth()
  }, [monthSelected]);


  async function builderMonth() {
    let totalDays = monthSelected.daysTotal
    if (yearSelected.leap === true && monthSelected.id === 1) {
      totalDays = 29
    }
    // console.log("1->", monthSelected.name)
    // console.log("2->", monthSelected.daysTotal)
    // console.log("3->", monthSelected.dayInitName)
    // console.log("4->", monthSelected.dayInitNumber)
    // console.log("5->", monthSelected. dayInitPosition)
    let array = []
    for (var i = 1; i < totalDays + 1; i++) {
      let obj = {
        date: yearSelected.value + "-" + zfill(monthSelected.id + 1, 2) + "-" + zfill(i, 2)
      }
      array.push(obj)
    }
    setmonthSelectedDaysList([...array])
  }


  function getDay(day) {
    if (labelInit === true) { setdayInit(day) }
    if (labelEnd === true) { setdayEnd(day) }
  }

  function returnData() {
   const fechaInicio = new Date(dayInit).getTime();
   const fechaFin = new Date(dayEnd).getTime();
   const diferencia = fechaFin - fechaInicio;
   const diff = diferencia / (1000 * 60 * 60 * 24)
  console.log("............", diff);

   
    let data = [dayInit, dayEnd, diff]
    props.changeDate(data)

  }

return false
  return (
    <View style={{
      backgroundColor: "rgba(0,0,0,0.7)",
      width: "100%",
      height: "100%",
      position: "absolute",
      zIndex: 999,
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
    }}>
      <View style={{
        backgroundColor: "white",
        width: celda * 9,
        borderRadius: 12,
        overflow: "hidden"
      }}>
        <View style={{ backgroundColor: props.color, }}>
          <View style={{
            backgroundColor: "rgba(0,0,0,0.25)",
            paddingVertical: 10,
            paddingHorizontal: 20,
            flexDirection: "row",
            width: "100%",
            alignSelf: "center",
            justifyContent: "space-around"
          }}>
            <LABEL status={labelInit} func={switchLabel} value={dayInit} title={"Check-in:"} icon={"calendar-outline"} color={props.color} theme={props.theme} />
            <LABEL status={labelEnd} func={switchLabel} value={dayEnd} title={"Check-out:"} icon={"calendar-outline"} color={props.color} theme={props.theme} />
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => changeMonth(-1)} style={{ width: celda, height: celda, justifyContent: "center", alignItems: "center" }}>
            <Icon name="arrow-left" width={20} height={20} fill={"silver"} />
          </TouchableOpacity>
          <View style={{ width: celda * 7, flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity>
              <Text style={{ marginLeft: 5, fontWeight: "bold" }}>{yearSelected.value}.</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{ marginLeft: 5, textTransform: "capitalize", fontWeight: "bold" }}>{monthSelected.name}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => changeMonth(+1)} style={{ width: celda, height: celda, justifyContent: "center", alignItems: "center" }}>
            <Icon name="arrow-right" width={20} height={20} fill={"silver"} />
          </TouchableOpacity>
        </View>

        <View style={{ width: celda * 7.7, alignSelf: "center", flexDirection: 'row', flexWrap: 'wrap', }}>
          <View style={{ flexDirection: "row", backgroundColor: "#EFEFEF" }}>
            <Text style={{ margin: 1, textAlign: "center", width: celda }}>Dom</Text>
            <Text style={{ margin: 1, textAlign: "center", width: celda }}>Lun</Text>
            <Text style={{ margin: 1, textAlign: "center", width: celda }}>Mar</Text>
            <Text style={{ margin: 1, textAlign: "center", width: celda }}>Mié</Text>
            <Text style={{ margin: 1, textAlign: "center", width: celda }}>Jue</Text>
            <Text style={{ margin: 1, textAlign: "center", width: celda }}>Vie</Text>
            <Text style={{ margin: 1, textAlign: "center", width: celda }}>Sáb</Text>
          </View>
          {monthSelectedDaysList.length !== 0 && monthSelectedDaysList.map((i, key) => {
            return (
              <DAY
                key={key}
                value={i}
                dayInit={dayInit}
                dayEnd={dayEnd}
                color={props.color}
                getDay={getDay}
                toDay={toDay}
              />
            )
          })
          }
        </View>

        <View style={{ padding: 10, flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity style={{ borderRadius: 12, paddingVertical: 5, width: celda * 2.5, borderColor: props.color, borderWidth: 1 }} onPress={() => props.close(false)}>
            <Text style={{ textAlign: "center", color: props.color }}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ borderRadius: 12, paddingVertical: 5, width: celda * 5, backgroundColor: props.color }} onPress={() => returnData()}>
            <Text style={{ textAlign: "center", color: "white" }}>Aceptar</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  )
}
export default React.memo(CalendaryRange);

const LABEL = (props) => {
  return (
    <TouchableOpacity
      onPress={() => props.func(props.status)}
      style={{
        justifyContent: "center",
        flexDirection: "row",
        paddingVertical: 10,
        width: "50%",
        paddingHorizontal: 30,
        marginBottom: -10,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        backgroundColor: props.status ? props.color : "transparent",
      }}
    >
      <View style={{ marginTop: 8, opacity: props.status ? 1 : 0.5 }}>
        <Icon name={props.icon} width={25} height={25} fill={"white"} />
      </View>
      <View style={{ flexDirection: "column", marginLeft: 5, opacity: props.status ? 1 : 0.5 }}>
        <Text style={{ width: "100%", fontSize: 12, color: "white", textAlign: "center", fontWeight: "bold", marginHorizontal: 5 }}>{props.title}</Text>
        <Text style={{ width: "100%", fontSize: 14, color: "white", textAlign: "center", fontWeight: "bold", marginHorizontal: 5 }}>{props.value}</Text>
      </View>
    </TouchableOpacity>
  )
}




const DAY = (props) => {
  const day = props.value.date.split("-")[2]
  const today = props.toDay.getFullYear() + "-" + props.toDay.getMonth() + 1 + "-" + props.toDay.getDate()
  let position = 0;
  if (props.value.date.split("-")[2] === "01") {
    var weekPosition = new Date(props.value.date);
    position = weekPosition.getDay();
  }


  function check(day) {
    if (day < today) {
      Toast.show(`minimum day ", ${today}`)
    }
    else {
      props.getDay(day)
    }
  }

  let active = false


  if (props.value.date === props.dayInit) { active = true }
  if (props.value.date >= props.dayInit && props.value.date <= props.dayEnd) { active = true }




  return (
    <TouchableOpacity
      onPress={() => check(props.value.date)}
      style={{
        margin: 1,
        borderRadius: celda,
        width: celda,
        height: celda,
        backgroundColor: active === true ? props.color : "white",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: (celda * position) + position
      }}>
      <Text
        style={{
          fontSize: 14,
          color: active === true ? "white" : "silver"
        }}>
        {day}
      </Text>
    </TouchableOpacity>
  )
}