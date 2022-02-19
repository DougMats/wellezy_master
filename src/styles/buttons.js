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

const index = StyleSheet.create({

  bigButton: {
    marginTop: 5,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: color_fifth,
    flexDirection: "row",
    justifyContent: "center"
  },

  bigButtonText: {
    color: color_white,
    lineHeight: 30,
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "bold",
  }

})

export default index;