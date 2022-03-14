
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { color_primary, color_secondary, color_white} from '../../styles/Colors.js';
import IconSvg from '../../svg/icon_svg.js'


function BTN(props) {
  function clic(e) {
    props.function(e)
  }

  return (
    <TouchableOpacity style={[styles.btn, { width: props.w }]} onPress={() => clic(props.data)}>
      <LinearGradient colors={[color_primary, color_secondary ]} style={styles.gradient}>
        {props.icon !== "" &&
          <IconSvg name={props.icon} height={28} width={28} fill={color_white} style={{ marginTop: -5 }} />
        }
        {props.text !== "" &&
          <Text style={styles.text}>{props.text}</Text>
        }
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    height: 40,   
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center"
  },
  text: {
    fontSize: 14,
    marginLeft: 10,
    fontWeight: "bold",
    textTransform: "capitalize",
    textAlign: "center",
    color: color_white
  }
})
export default BTN;