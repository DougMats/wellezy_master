import React, { useState, useRef } from 'react'
import { Animated, Modal, Dimensions, TouchableOpacity, Image, ScrollView, Text, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Icon } from 'react-native-eva-icons'

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
} from '../../../../styles/Colors'


import BarRating from '../../../../components/stars/BarRating.js'
import CardOpinion from '../../../../components/cards/CardOpinion.js'
const windowWidth = Dimensions.get('window').width;

function SectionOpinions(props) {
  const { t, i18n } = useTranslation();

  let location = Counter("location")
  let bedrooms = Counter("bedrooms")
  let service = Counter("service")
  let cleaning = Counter("cleaning")
  let priceQuality = Counter("price_quality")
  let comfort = Counter("comfort")
  let facilities = Counter("facilities")
  let edifice = Counter("edifice")
  let breakfast = Counter("breakfast")
  let meal = Counter("meal")

  const rating = (location + bedrooms + service + cleaning + priceQuality + comfort + facilities + edifice + breakfast + meal) / 10  //++++++

  function Counter(e) {
    let value = 0
    for (var i in props.data.rating) {
      //console.log("*->", props.data.rating[i][e])
      value += props.data.rating[i][e]
    }
    const res = value / 10 // props.data.rating.length
    return res
  }

  const [allOpinions, setallOpinions] = useState(false);







  if (props.data.rating.length === 0) {

    return (
      <View style={{
        marginTop: 10,
        width: "100%",
        flexDirection: "column",
      }}>

        <Text>empty</Text>
        
      </View>
    )
  }


  else {





    return (
      <View style={{
        marginTop: 10,
        width: "100%",
        flexDirection: "column",
      }}>






        <View style={{
          width: "90%",
          alignSelf: "center",
          backgroundColor: color_white,
          padding: 20,
          marginBottom: 20,
          flexDirection: "row",
          justifyContent: "center"
        }}>
          <View style={{
            padding: 5,
            borderRadius: 20,
            backgroundColor: color_fifth,
            justifyContent: "center",
            alignItems: "center",
            width: windowWidth / 12 * 2
          }}>
            <Text style={{
              fontWeight: "bold",
              fontSize: 20,
              color: color_white
            }}>{rating.toFixed(2)}</Text>
          </View>
          <View style={{ flexDirection: "column", paddingLeft: 20 }}>
            <Text style={{}}>Puntuación basada</Text>
            <Text style={{}}>en {props.data.rating.length} opiniones.</Text>
          </View>
        </View>


        <View style={{ width: "90%", alignSelf: "center" }}>
          <BarRating max={windowWidth} value={location} title={t("location")} />
          <BarRating max={windowWidth} value={bedrooms} title={t("bedrooms")} />
          <BarRating max={windowWidth} value={service} title={t("service")} />
          <BarRating max={windowWidth} value={cleaning} title={t("cleaning")} />
          <BarRating max={windowWidth} value={priceQuality} title={t("priceQuality")} />
          <BarRating max={windowWidth} value={comfort} title={t("comfort")} />
          <BarRating max={windowWidth} value={facilities} title={t("facilities")} />
          <BarRating max={windowWidth} value={edifice} title={t("edifice")} />
          <BarRating max={windowWidth} value={breakfast} title={t("breakfast")} />
          <BarRating max={windowWidth} value={meal} title={t("meal")} />
        </View>


        <View style={{
          marginTop: 20,
          width: "90%",
          alignSelf: "center",
          backgroundColor: color_white,
          flexDirection: "column"
        }}>
          <Text style={{ margin: 20, marginBottom: 0, fontSize: 18, fontWeight: "bold", color: color_fifth }}>Opiniones recientes</Text>
          <View style={{ flexDirection: "column" }}>
            {props.data.rating.map((i, key) => {
              if (allOpinions === false && key <= 2) {
                return (
                  <CardOpinion key={key} data={i} />
                )
              }
              else {
                if (allOpinions === true) {
                  return (
                    <CardOpinion key={key} data={i} />
                  )
                }
              }
            })}

            <TouchableOpacity onPress={() => setallOpinions(!allOpinions)}
              style={{ borderColor: color_fifth, borderWidth: 0.5, padding: 5, borderRadius: 12, width: "60%", marginVertical: 20, alignSelf: "center", justifyContent: "center", alignItems: "center" }}>
              <Text style={{ color: color_fifth, textTransform: "capitalize" }}>{allOpinions ? "cargar menos opiniones" : "cargar más opiniones"}</Text>
            </TouchableOpacity>

          </View>
        </View>

      </View>
    )
  }
}
export default SectionOpinions;



// const Bar = (props) => {
//   var randomColor, qualification
//   const maxWidth = (windowWidth / 12) * 10
//   const barWidth = maxWidth * props.value / 10

//   if (props.value * 10 <= 25) { randomColor = "#E74C3C" }
//   if (props.value * 10 >= 26 && props.value * 10 <= 50) { randomColor = "#F39C12" }
//   if (props.value * 10 >= 51 && props.value * 10 <= 75) { randomColor = "#F1C40F" }
//   if (props.value * 10 > 76) { randomColor = "#2ECC71" }

//   if (props.value * 10 <= 20) { qualification = "malo" }
//   if (props.value * 10 >= 21 && props.value * 10 <= 40) { qualification = "regular" }
//   if (props.value * 10 >= 41 && props.value * 10 <= 60) { qualification = "bueno" }
//   if (props.value * 10 >= 61 && props.value * 10 <= 80) { qualification = "muy bueno" }
//   if (props.value * 10 > 81) { qualification = "excelente" }

//   const Animation = (props) => {
//     const newValue = props.value
//     const mutacion = useRef(new Animated.Value(0)).current
//     React.useEffect(() => {
//       Animated.timing(
//         mutacion,
//         {
//           toValue: newValue,
//           duration: 500,
//         },
//       ).start();
//     }, [mutacion, newValue])

//     return (
//       <Animated.View
//         style={{
//           ...props.style,
//           width: mutacion
//         }}>
//       </Animated.View>
//     );
//   }

//   return (
//     <View
//       style={{
//         width: "90%",
//         alignSelf: "center",
//         backgroundColor: "white",
//         flexDirection: "column",
//         paddingHorizontal: 10,
//         paddingVertical: 15
//       }}>
//       <View
//         style={{
//           marginBottom: 5,
//           flexDirection: "row",
//           justifyContent: "space-between"
//         }}>
//         <Text> {props.title} </Text>
//         <Text> {qualification} ({props.value}/10)</Text>
//       </View>
//       <View
//         style={{
//           justifyContent: "center",
//           alignItems: "flex-start",
//           alignSelf: "center",
//           width: "100%"
//         }}>

//         <View style={{ borderRadius: 8, height: 8, backgroundColor: color_grey_light, width: maxWidth }}></View>
//         {/* <View style={{ borderRadius: 8, height: 8, position: "absolute", backgroundColor: randomColor, width: `${props.value * 10}%` }}></View>*/}

//         <Animation
//           value={barWidth}
//           style={{
//             borderRadius: 8,
//             height: 8,
//             position: "absolute",
//             backgroundColor: randomColor
//           }}>
//         </Animation>
//       </View>
//     </View>
//   )
// }















{/*  
"rating": [
  {
    "id": 1,
    "id_hotel": 1,
    "id_client": 1,
    "location": 8,
    "bedrooms": 8,
    "service": 8,
    "cleaning": 8,
    "price-quality": 8,
    "comfort": 8,
    "facilities": 8,
    "edifice": 8,
    "breakfast": 8,
    "meal": 8,
    "id_bill": "wellezy_123",
    "create_at": "2022-01-14 14:24:32",
    "update_at": "2022-01-14 14:24:32"
*/}

{/* 
Ubicación	
Excelente  (8.9 / 10)
Habitaciones	
Bueno  (7.9 / 10)
Servicio	
Muy bueno  (8.1 / 10)
Limpieza	
Muy bueno  (8.4 / 10)
Calidad-precio	
Muy bueno  (8.2 / 10)



// Location
// Bedrooms
// Service
// Cleaning
// Price quality
// Comfort
// Facilities
// Edifice
// Breakfast
// Meal

// Ubicación
// Habitaciones
// Servicio
// Limpieza
// Calidad - precio
// Comodidad
// Instalaciones
// Edificio
// Desayuno
// Comida
*/}



 // console.log("--------", props.data.rating.length)