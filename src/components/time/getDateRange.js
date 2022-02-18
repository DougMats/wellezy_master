import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native'
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import { zfill } from './logic'
import Toast from 'react-native-simple-toast';

function GetDateRange(props) {
  const { t, i18n } = useTranslation();
  const { navigation } = props
  const Color = props.color
  const Theme = props.mode

  const [DateDeparture, setDateDeparture] = useState("00/00/0000"); //fecha de inicio
  const [DateReturn, setDateReturn] = useState("00/00/0000"); //fecha fianl
  const [DifferenceDays, setDifferenceDays] = useState(0); // diferencia de dias
  const [showDataBetween, setshowDataBetween] = useState(false);
  const [ToDay, setToDay] = useState(0);     // hoy - dia fecha minima
  const [ToMonth, setToMonth] = useState(0); // hoy - mes fecha minima
  const [ToYear, setToYear] = useState(0);   // hoy - año fecha minima

  function send() {
    if (DateDeparture === null || DateReturn === null) { }
    else {
      let data = [DateDeparture, DateReturn]
      props.RangeGet(data)
    }
  }

  function cancel() {
    props.RangeCancel()
  }

  useEffect(() => {
    if (props.show === true) {
      Get()
    }
  }, [props.show]);









  async function Get() {
    const now = new Date();
    let FullYear = now.getFullYear()
    let FullMonth = now.getMonth() + 1
    let FullDay = now.getDate()
    setToDay(FullDay)
    setToMonth(FullMonth)
    setToYear(FullYear)
  }

  function getDateInit(d, m, y) {
    // let date = zfill(d, 2) + "/" + zfill(m, 2) + "/" + y
    // setDateDeparture(date)
  }

  function getDateEnd(d, m, y) {
    // let date = zfill(d, 2) + "/" + zfill(m, 2) + "/" + y
    // setDateReturn(date)
  }



  // useEffect(() => {
  //   let init = DateDeparture.split("/")
  //   let ID = init[0]
  //   let IM = init[1]
  //   let IY = init[2]
  //   let end = DateReturn.split("/")
  //   let ED = end[0]
  //   let EM = end[1]
  //   let EY = end[2]
  //   if (ED !== "00") {
  //     setDifferenceDays(ED - ID)
  //   }
  // }, [DateDeparture, DateReturn]);














  return (
    <Modal animationType="slide" transparent={true} visible={props.show}>
      <View style={{ backgroundColor: "rgba(0,0,0,0.7)", width: "100%", height: "100%", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
        <View style={[styles.wrap, { backgroundColor: Theme === "light" ? "#FFF" : "#3F3F3F", }]}>
          <View style={[styles.head, { backgroundColor: Color }]}>
            <Text style={styles.title}>{zfill(ToDay, 2)}/{zfill(ToMonth, 2)}/{ToYear}</Text>
            <TouchableOpacity
              onPress={() => setshowDataBetween(!showDataBetween)}
              style={{
                position: "absolute",
                right: 20,
                top: 15
              }}>
              <Icon name={showDataBetween === true ? 'arrow-ios-downward-outline' : 'arrow-ios-forward-outline'} fill={"white"} width={30} height={30} />
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View style={styles.body}>
              {
                showDataBetween &&
                <View style={{ flexDirection: "row", marginBottom: 10, backgroundColor: Color, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, justifyContent: "space-around", borderBottomColor: Color, borderBottomWidth: 1, paddingVertical: 10 }}>
                  <TouchableOpacity style={{ width: "40%" }}>
                    <Text style={{ textAlign: "center", color: "white" }}>{DateDeparture}</Text>
                  </TouchableOpacity>
                  <Text style={{ color: "white" }}>/</Text>
                  <TouchableOpacity style={{ width: "40%" }}>
                    <Text style={{ textAlign: "center", color: "white" }}>{DateReturn}</Text>
                  </TouchableOpacity>
                  <Text style={{ width: "20%", color: "white" }}>({DifferenceDays} Days)</Text>
                </View>
              }


              <BuildMonth
                Color={Color}
                Theme={Theme}
                // ToDay={ToDay}
                // ToMonth={ToMonth - 1}
                // ToYear={ToYear}
                getDateInit={getDateInit}
                getDateEnd={getDateEnd}
              />



            </View>
          </ScrollView>
          <View style={styles.foot}>
            <TouchableOpacity onPress={() => cancel()} style={[styles.btn, { borderColor: Color, borderWidth: 1 }]}>
              <Icon name='close-circle-outline' fill={Color} width={20} height={20} />
              <Text style={[styles.btnText, { color: Color }]}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => send()} style={[styles.btn, { backgroundColor: Color, borderColor: Color, borderWidth: 1 }]}>
              <Icon name='checkmark-circle-outline' fill={"white"} width={20} height={20} />
              <Text style={[styles.btnText, { color: "white" }]}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
  wrap: {
    borderRadius: 10,
    overflow: "hidden",
    width: "90%",
    maxHeight: "90%",
    alignItems: "center",
    alignContent: "center",
    flexDirection: "column",
  },
  head: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 20
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase"
  },
  body: {

  },
  foot: {
    width: "100%",
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-around",
    borderTopColor: "silver",
    borderTopWidth: 1
  },
  btn: {
    width: "40%",
    padding: 10,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center"
  },
  btnText: {
    marginLeft: 20,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center"
  },
  MonthWrap: {

  }
})

export default GetDateRange;















function BuildMonth(props) {



  const now = new Date();
  let FullYear = now.getFullYear()
  let FullMonth = now.getMonth()
  let FullDay = now.getDate()
  const [newMonth, setnewMonth] = useState([]);
  let Months = [
    { name: "January", Days: 31 },
    { name: "February", Days: 28 },
    { name: "March", Days: 31 },
    { name: "April", Days: 30 },
    { name: "May", Days: 31 },
    { name: "June", Days: 30 },
    { name: "July", Days: 31 },
    { name: "August", Days: 31 },
    { name: "September", Days: 30 },
    { name: "October", Days: 31 },
    { name: "November", Days: 30 },
    { name: "December", Days: 31 },
  ]

  useEffect(() => {
    buildTree(FullYear, FullMonth, FullDay)
  }, []);

  function buildTree() {
    // let mes = {
    //   id: 0,
    //   name: "December",
    //   initDay: 0,
    //   endDay: 0,
    //   totalDays: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    // }



    for (let m in Months) {
      let mes
      let totalDays = []



      console.log("mes", Months[m].name)




      // console.log("total: ", Months[FullMonth].Days)




      // for (var d = 1; d <= Months[FullMonth].Days; d++) {
      //   console.log("day: ", d)
      // }



      let name = Months[FullMonth].name
      let tree = [1, 2, 3, 4, 5]
      let init = 0
      let end = 4


      mes = {
        name: name,
        initDay: init,
        endDay: end,
        totalDays: tree
      }



      //console.log("mes: ", mes)




      setnewMonth([...newMonth, mes])
    }
    //buildTree()
  }





  console.log("newMonth:", newMonth)
  return (
    newMonth.map((i, key) => {
      return (
        <Mes key={key} data={i} Color={props.Color} />
      )
    })
  )

}


// Color = { Color }
// Theme = { Theme }
// getDateInit = { getDateInit }
// getDateEnd = { getDateEnd }



// c

// zise botton






function Mes(props) {
  const global = 50

  const [day, setday] = useState(0);
  return (
    <View style={{
      width: "100%",
      flexDirection: "column",
      padding: 5,
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center",
    }}>


      <View style={{
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        backgroundColor: props.Color,
        width: "100%",
        justifyContent: "center",
        padding: 10
      }}>
        <Text style={{
          fontWeight: "bold",
          fontSize: 16,
          color: "white",
          textAlign: "center"
        }}>{props.data.name}</Text>
      </View>




      <View style={{ flexDirection: "row", width: "100%", backgroundColor: props.Color, justifyContent: "center" }}>
        <Text style={{ textTransform: "uppercase", fontWeight: "bold", color: "white", width: global, height: global, textAlign: "center", lineHeight: global, backgroundColor: props.Color }}>d</Text>
        <Text style={{ textTransform: "uppercase", fontWeight: "bold", color: "white", width: global, height: global, textAlign: "center", lineHeight: global, backgroundColor: props.Color }}>l</Text>
        <Text style={{ textTransform: "uppercase", fontWeight: "bold", color: "white", width: global, height: global, textAlign: "center", lineHeight: global, backgroundColor: props.Color }}>m</Text>
        <Text style={{ textTransform: "uppercase", fontWeight: "bold", color: "white", width: global, height: global, textAlign: "center", lineHeight: global, backgroundColor: props.Color }}>m</Text>
        <Text style={{ textTransform: "uppercase", fontWeight: "bold", color: "white", width: global, height: global, textAlign: "center", lineHeight: global, backgroundColor: props.Color }}>j</Text>
        <Text style={{ textTransform: "uppercase", fontWeight: "bold", color: "white", width: global, height: global, textAlign: "center", lineHeight: global, backgroundColor: props.Color }}>v</Text>
        <Text style={{ textTransform: "uppercase", fontWeight: "bold", color: "white", width: global, height: global, textAlign: "center", lineHeight: global, backgroundColor: props.Color }}>s</Text>
      </View>


      <View style={{
        borderColor: "#ccc",
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 12,
        borderWidth: 1,
        backgroundColor: "white",
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: "100%",
      }}>
        {props.data.totalDays.map((i, key) => {
          return (
            <TouchableOpacity
              onPress={() => setday(i)}
              key={key}
              style={{
                width: global - 1,
                height: global - 1,
                marginLeft: key === 0 ? props.data.initDay * global : 0,
                borderColor: i === day ? props.Color : "white",
                borderWidth: 1,
                borderRadius: global,
                margin: 1
              }}
            >
              <Text style={{
                color: i === day ? props.Color : "#555",
                textAlign: "center",
                lineHeight: 50,
              }}>{zfill(i, 2)}</Text>
            </TouchableOpacity>
          )
        })}
      </View>



    </View>
  )
}




//function BuildMonth222(props) {

// Color={Color}
// Theme={Theme}
// ToDay={ToDay}
// ToMonth={ToMonth}
// ToYear={ToYear}

// const [Load, setLoad] = useState(true); // construyendo, por defecto en true
// const [nameMonth, setnameMonth] = useState(""); // nombre del mes
// const [TotalDays, setTotalDays] = useState([]); // dias del mes
// const [day, setday] = useState(0); // dia seleccionado y hoy
// const [PositionDay, setPositionDay] = useState(4);
// 

// useEffect(() => {
//   getNameMonth(props.ToMonth, props.ToYear)
//   console.log("mutable ???", props.ToMonth)
//   const now = new Date();
//   let FullMonth = now.getMonth()
//   if (FullMonth === props.ToMonth) {
//     console.log("mismo mes: ", props.ToMonth)
//    // setday(props.ToDay)
//   }
//   else { console.log("mes diferente: ", props.ToMonth) }
// }, [props.ToMonth]);

// useEffect(() => {
//   if (nameMonth !== "") {
//     setLoad(false)
//   }
// }, [nameMonth]);

// async function getNameMonth(month, year) {
//   if (month === 0) {
//     setnameMonth("January");
//     setTotalDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31])
//   }
//   if (month === 1) {
//     setnameMonth("February");
//     if (year % 4 === 0) {
//       setTotalDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29])
//     }
//     else {
//       setTotalDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28])
//     }
//   }
//   if (month === 2) {
//     setnameMonth("March");
//     setTotalDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31])
//   }
//   if (month === 3) {
//     setnameMonth("April");
//     setTotalDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30])
//   }
//   if (month === 4) {
//     setnameMonth("May");
//     setTotalDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31])
//   }
//   if (month === 5) {
//     setnameMonth("June");
//     setTotalDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30])
//   }
//   if (month === 6) {
//     setnameMonth("July");
//     setTotalDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31])
//   }
//   if (month === 7) {
//     setnameMonth("August");
//     setTotalDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31])
//   }
//   if (month === 8) {
//     setnameMonth("September");
//     setTotalDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30])
//   }
//   if (month === 9) {
//     setnameMonth("October");
//     setTotalDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31])
//   }
//   if (month === 10) {
//     setnameMonth("November");
//     setTotalDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30])
//   }
//   if (month === 11) {
//     setnameMonth("December");
//     setTotalDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31])
//   }
// }

// useEffect(() => {
//   if (day < props.ToDay) {
//     setday(props.ToDay)
//     Toast.show("No puedes elegir una fecha pasada")
//   }
//   props.getDateInit(
//     day, props.ToMonth, props.ToYear
//   )
// }, [day]);

// function getPosition() {
//   //let position = now.getDay()
// }

// setPositionDay(position)
// TotalDays={daysLimit}
// PositionDay={1}
// Today={Today}
// Tomonth={Tomonth}
// ToDay={ToDay}
// ToMonth={ToMonth}
// ToYear={ToYear}
// let name
// let daysMax
// return name
// }

// return (
//   <View style={{
//     width: "100%",
//     flexDirection: "column",
//     padding: 5,
//     justifyContent: "center",
//     alignItems: "center",
//     alignContent: "center",
//   }}>

{/*
     
*/}


// <View style={{ flexDirection: "row", width: "100%", backgroundColor: props.Color, justifyContent: "center" }}>
//   <Text style={{ textTransform: "uppercase", fontWeight: "bold", color: "white", width: global, height: global, textAlign: "center", lineHeight: global, backgroundColor: props.Color }}>d</Text>
//   <Text style={{ textTransform: "uppercase", fontWeight: "bold", color: "white", width: global, height: global, textAlign: "center", lineHeight: global, backgroundColor: props.Color }}>l</Text>
//   <Text style={{ textTransform: "uppercase", fontWeight: "bold", color: "white", width: global, height: global, textAlign: "center", lineHeight: global, backgroundColor: props.Color }}>m</Text>
//   <Text style={{ textTransform: "uppercase", fontWeight: "bold", color: "white", width: global, height: global, textAlign: "center", lineHeight: global, backgroundColor: props.Color }}>m</Text>
//   <Text style={{ textTransform: "uppercase", fontWeight: "bold", color: "white", width: global, height: global, textAlign: "center", lineHeight: global, backgroundColor: props.Color }}>j</Text>
//   <Text style={{ textTransform: "uppercase", fontWeight: "bold", color: "white", width: global, height: global, textAlign: "center", lineHeight: global, backgroundColor: props.Color }}>v</Text>
//   <Text style={{ textTransform: "uppercase", fontWeight: "bold", color: "white", width: global, height: global, textAlign: "center", lineHeight: global, backgroundColor: props.Color }}>s</Text>
// </View>
{/* 
    */}
//     </View>
//   )
// }