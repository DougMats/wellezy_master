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


formBody:{
  alignSelf: "center",
  borderRadius: 12,
  width: "100%",
  padding: 20,
  alignContent: "center",
  alignItems: "center",
},




formRow: {
    marginVertical: 10,
    width: "100%",
    flexDirection: "column"
  },
formLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 5
  },
formText: {
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: "#eee"
  },

})

export default index;