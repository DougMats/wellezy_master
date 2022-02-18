import React, { useRef } from 'react'
import { Animated, Text, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { color_grey_dark, color_grey_light, color_white } from '../../styles/Colors.js'

function BarRating(props) {
  const { t, i18n } = useTranslation();
  var randomColor, qualification
  const maxWidth = (props.max / 12) * 10
  const barWidth = maxWidth * props.value / 10

  if (props.value * 10 <= 20) { qualification = "malo"; randomColor = "#E74C3C" }
  if (props.value * 10 >= 21 && props.value * 10 <= 40) { qualification = "regular"; randomColor = "#F39C12" }
  if (props.value * 10 >= 41 && props.value * 10 <= 60) { qualification = "bueno"; randomColor = "#F1C40F" }
  if (props.value * 10 >= 61 && props.value * 10 <= 80) { qualification = "muy bueno"; randomColor = "#2ECC71" }
  if (props.value * 10 > 81) { qualification = "excelente"; randomColor = "#27AE60" }

  const Animation = (props) => {
    const newValue = props.value
    const mutacion = useRef(new Animated.Value(0)).current
    React.useEffect(() => {
      Animated.timing(
        mutacion,
        {
          toValue: newValue,
          duration: 800,
        },
      ).start();
    }, [mutacion, newValue])
    return (
      <Animated.View
        style={{
          ...props.style,
          width: mutacion
        }}>
      </Animated.View>
    );
  }



  return (
    <View
      style={{
        width: "100%",
        alignSelf: "center",
        backgroundColor: color_white,
        flexDirection: "column",
        paddingHorizontal: 10,
        paddingVertical: 10
      }}>

      <View
        style={{
          paddingHorizontal: 10,
          marginBottom: 5,
          flexDirection: "row",
          justifyContent: "space-between"
        }}>
        <Text style={{ color: color_grey_dark, textTransform: "capitalize" }}>{props.title} </Text>
        <Text style={{ color: color_grey_dark, textTransform: "capitalize" }}>{qualification} ({props.value}/10)</Text>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "flex-start",
          alignSelf: "center",
          width: maxWidth
        }}>
        <View style={{
          borderRadius: 8,
          height: 8,
          backgroundColor: color_grey_light,
          width: maxWidth
        }}></View>

        <Animation
          value={barWidth}
          style={{
            borderRadius: 8,
            height: 8,
            position: "absolute",
            backgroundColor: randomColor
          }}>
        </Animation>
      </View>
    </View>
  )
}
export default BarRating;


