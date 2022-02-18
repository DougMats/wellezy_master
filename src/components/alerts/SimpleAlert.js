import React, { useState, useRef, useEffect } from 'react'
import { Dimensions, Animated, StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { Icon } from 'react-native-eva-icons';

function SimpleAlert(props) {
  const windowWidth = Dimensions.get('window').width;
  const [ready, setready] = useState(false)
  const fadeAnim = useRef(new Animated.Value(windowWidth)).current;
  let alertColor
  if (props.theme === "danger") { alertColor = "#E74C3C" }
  else {
    if (props.theme === "warning") { alertColor = "#F39C12 " }
    else {
      if (props.theme === "success") { alertColor = "#2ECC71 " }
      else {alertColor = "#273746 "}
    }
  }

  useEffect(() => {
    if (props.init === true) {
      Animated.timing(
        fadeAnim,
        {
          toValue: 0,
          duration: props.time,
          useNativeDriver: false
        }
      ).start();
    }
  }, [props.init]);


  setTimeout(() => {
    setready(true)
  }, props.time);

  if (props.init === true) {
    return (
      <View style={[{
        ...styles.wrap,
        backgroundColor: alertColor,
      },
      props.float === "top" ? styles.wrapTop : styles.wrapBottom,
      ]}>
        <View style={styles.containe}>
          <View style={styles.sides}>
            <Icon name={props.icon} width={30} height={30} fill={"white"} />
          </View>
          <View style={styles.info}>
            <Text style={styles.text} >{props.text}</Text>
          </View>
          <View style={styles.sides}>
            {ready &&
              <TouchableOpacity onPress={() => props.change(false)}>
                <Icon name={'close'} width={30} height={30} fill={"white"} />
              </TouchableOpacity>
            }
          </View>
        </View>
        <Animated.View style={{ backgroundColor: "rgba(255,255,255,0.5)", height: 5, width: fadeAnim }}>
        </Animated.View>
      </View>
    )
  } else {
    return false
  }
}
const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    zIndex: 99999,
    flexDirection: "column",
  },
  wrapTop: {
    top: 0,
  },
  wrapBottom: {
    bottom: 0,
  },
  containe: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    paddingVertical: 10
  },
  sides: {
    width: "10%",
    justifyContent: "center",
    alignItems: "center"
  },
  info: {
    width: "80%",
    alignItems: "center"
  },
  text: {
    textTransform:"uppercase",
    lineHeight: 30,
    fontSize: 14,
    color: "white",
    fontWeight: "bold"
  },
})
export default React.memo(SimpleAlert);