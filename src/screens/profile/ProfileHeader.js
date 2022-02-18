import React, { useState } from 'react'
import { StyleSheet, View, Dimensions, Image, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
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
  color_screen,
} from '../../styles/Colors'



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function ProfileHeader(props) {
  const [data, setdata] = useState(props.data);
  return (
    <LinearGradient style={styles.header} colors={[color_secondary, color_primary, color_primary]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>

      <Text>ergerger</Text>

      {/* <TouchableOpacity
            onPress={() => setvertical(!vertical)}
            style={{
              position: "absolute",
              zIndex: 99,
              top: 20,
              right: 20
            }}>
            <Icon name="more-vertical" width={30} height={30} fill={color_white} />
          </TouchableOpacity>


          <View style={styles.wrapAvatar}>
            <Image style={styles.img} source={{ uri: `${file_server1}/img/wellezy/users/${userDetails.photo_profile}` }} />
          </View>
          <View style={styles.wrapInfo}>
            <Text style={styles.headerTextBig}>{userDetails.name} {userDetails.surname}</Text>
            <Text style={styles.headerTextSmall}>{userDetails.email}</Text>
            {/* <Text style={styles.headerTextSmall}>{userDetails.city} - {userDetails.country}</Text> 
          </View> */}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({


  header: {
    flexDirection: "column",
    width: "100%",
    height: windowWidth / 1.3,
    alignItems: "center",
    justifyContent: "center"
  },


  wrapAvatar: {
    backgroundColor: "red",
    marginTop: 20,
    borderWidth: 3,
    borderColor: color_white,
    overflow: "hidden",
    width: windowWidth / 2.5,
    height: windowWidth / 2.5,
    borderRadius: windowWidth / 2.5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  img: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: "cover"
  },
  wrapInfo: {
    flexDirection: "column",
    marginTop: 20,
    width: "100%"
  },
  headerTextBig: {
    textTransform: "capitalize",
    color: color_white,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "700"
  },
  headerTextSmall: {
    color: color_white,
    fontSize: 14,
    textAlign: "center",
    fontWeight: "400"
  },



})
export default ProfileHeader;