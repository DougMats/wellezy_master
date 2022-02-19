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

const sidebar = StyleSheet.create({
  sidebar: {
    width: windowWidth,
    height: windowHeight,
    position: "absolute",
    zIndex: 999999,
    flex: 1,
    top: 0,
    right: 0,
  },
  sidebarBack: {
    width: "100%",
    height: "100%",
    backgroundColor: color_black_a,
  },
  sidebarContained: {
    backgroundColor: color_white,
    position: "absolute",
    zIndex: 1,
    top: 0,
    right: 0,
    flexDirection: "column",
    height: "100%",
  },
  sidebarHead: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color_grey_half,
    paddingVertical: 20,
  },
  sidebarHeadBtnUp: {
    position: "absolute",
    zIndex: 999,
    top: 20,
    right: 10
  },
  sidebarHeadAvatar: {
    backgroundColor: color_white,
    overflow: "hidden",
  },
  sidebarHeadAvatarImg: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: "cover"
  },
  sidebarHeadTitle: {
    textTransform: "uppercase",
    backgroundColor: color_star,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    lineHeight: 130,
    fontSize: 70,
    fontWeight: "bold",
  },
  sidebarHeadName: {
    marginTop: 15,
    fontWeight: "bold",
    fontSize: 14,
    textTransform: "capitalize",
    color: color_white,
  },
  sidebarHeadEmailWrap: {
    flexDirection: "row",
    alignItems: "center"
  },
  sidebarHeadEmail: {
    lineHeight: 15,
    marginLeft: 5,
    color: color_white,
    fontSize: 14,
  },
  sidebarBody: {
    paddingBottom: 40
  },
  sidebarbodyLabel: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: color_grey_light,
    flexDirection: "row",
    alignItems: "center"
  },
  sidebarbodyLabelText: {
    marginLeft: 15,
    fontWeight: "400",
    fontSize: 14,
    color: color_grey_dark
  },
  sidebarFoot: {},
})

export default sidebar;