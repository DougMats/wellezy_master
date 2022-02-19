import React, { useState } from 'react'
import { StyleSheet, View, Text, Modal, TouchableOpacity, Dimensions } from 'react-native'
import { Icon } from 'react-native-eva-icons';
import {
  color_primary,
  color_secondary,
  color_tertiary,
  color_white,
  color_white_a,
  color_black,
  color_black_a,
  color_grey_light,
  color_grey_half,
  color_grey_dark,
  color_transparent,
  color_screen
} from '../styles/Colors.js'



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



function About(props) {
  const [tag1, settag1] = useState(false);
  const [tag2, settag2] = useState(false);
  const [tag3, settag3] = useState(false);


  return (

    <Modal animationType="slide" transparent={true} visible={props.open} >
      <View style={styles.wrapper}>
        <View style={styles.wrap}>
          <TouchableOpacity onPress={() => props.close(false)} style={{ padding: 5, position: "absolute", right: 5, top: 2.5 }}>
            <Icon name="close-outline" fill="silver" width={30} height={30} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.opt}
            onPress={() => settag1(!tag1)}>
            <Text style={styles.optText}>Contáctanos</Text>
            <Icon name={tag1 === true ? 'arrow-ios-upward-outline' : 'arrow-ios-downward-outline'} fill={color_grey_half} width={30} height={30} />
          </TouchableOpacity>
          {tag1 === true &&
            <View style={styles.container}>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>rtrt</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>rtrt</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>rtrt</Text>
              </TouchableOpacity>
            </View>
          }
          <TouchableOpacity style={styles.opt}
            onPress={() => settag2(!tag2)}>
            <Text style={styles.optText}>Términos, condiciones y privacidad</Text>
            <Icon name={tag2 === true ? 'arrow-ios-upward-outline' : 'arrow-ios-downward-outline'} fill={color_grey_half} width={30} height={30} />
          </TouchableOpacity>
          {tag2 === true &&
            <View style={styles.container}>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>rtrt</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>rtrt</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>rtrt</Text>
              </TouchableOpacity>
            </View>
          }
          <TouchableOpacity style={styles.opt}
            onPress={() => settag3(!tag3)}>
            <Text style={styles.optText}>info. de la aplicación</Text>
            <Icon name={tag3 === true ? 'arrow-ios-upward-outline' : 'arrow-ios-downward-outline'} fill={color_grey_half} width={30} height={30} />
          </TouchableOpacity>
          {tag3 === true &&
            <View style={styles.container}>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>rtrt</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>rtrt</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>rtrt</Text>
              </TouchableOpacity>
            </View>
          }

        </View>
      </View>
    </Modal>
  )
}
export default About;
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "rgba(0,0,0,0.7)",
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 999,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  wrap: {
    flexDirection: "column",
    backgroundColor: "#FFF",
    paddingTop: 40,
    paddingBottom: 20,
    borderRadius: 12,
    width: "90%"
  },
  opt: {
    borderBottomColor: color_grey_light,
    borderBottomWidth: 0.5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  optText: {
    fontSize: 16,
    fontWeight: "bold"
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
    paddingVertical: 5,
  },

  btn: {
    margin: 5,
    padding: 5,
    borderRadius: 12,
    flexDirection: "column",
    width: windowWidth / 2.5,
    height: windowWidth / 3,
    backgroundColor: color_white
  },
  btnText: {
    textAlign: "center"
  }

})