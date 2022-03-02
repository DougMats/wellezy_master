import { StyleSheet, Dimensions } from "react-native";
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
} from './Colors.js';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const profile = StyleSheet.create({
  profile: {
    flex: 1
  },
  profileHeader: {
    flexDirection: "column",
    width: "100%",
    height: windowWidth / 1.5,
    alignItems: "center",
    justifyContent: "center"
  },
  profileHeaderBtn: {
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    position: "absolute",
    zIndex: 99,
    top: 20,
  },
  profileHeaderAvatar: {
    marginTop: 20,
    borderWidth: 3,
    borderColor: color_white,
    overflow: "hidden",
    width: windowWidth / 3.5,
    height: windowWidth / 3.5,
    borderRadius: windowWidth / 3.5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileHeaderAvatarImg: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: "cover"
  },
  profileHeaderText: {
    flexDirection: "column",
    marginTop: 20,
    width: "100%"
  },
  profileHeaderTextBig: {
    textTransform: "capitalize",
    color: color_white,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "700"
  },
  profileHeaderTextSmall: {
    color: color_white,
    fontSize: 14,
    textAlign: "center",
    fontWeight: "400"
  },
  profileMenuHorizontal: {
    backgroundColor:color_primary,
    flexDirection: "row",
    width: "100%",
    height: 40,
    padding: 5,
    paddingTop: 8,
    justifyContent: "space-around"
  },
})

export default profile;