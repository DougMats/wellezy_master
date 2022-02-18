import React, { useState, useEffect, useContext } from 'react'
import { Keyboard, StyleSheet, ScrollView, View, TextInput, Modal, TouchableOpacity, Text, Image, Dimensions, ActivityIndicator } from 'react-native'
import { useTranslation } from 'react-i18next';
import PhotoUpload from 'react-native-photo-upload'
import Toast from 'react-native-simple-toast';
import { Icon } from 'react-native-eva-icons';
import _ from 'lodash';

import UserContext from '../../../../../contexts/UserContext'
import { specials } from '../../../../services/connection.js';
import FilterByLocation from '../../../filters/FilterByLocation'
import { file_server1 } from '../../../../../Env';
import CardNurse from './SpecialCard.js';
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
} from '../../../../styles/Colors';
const windowWidth = Dimensions.get('window').width;
function SpecialEdit(props) {
  const { t, i18n } = useTranslation();
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [successfully, setsuccessfully] = useState(false);
  const [Load, setLoad] = useState(false);
  const [Location, setLocation] = useState(false);

  return (
    <View style={{
      alignItems: "center",
      paddingTop: 20,
      paddingBottom: 20
    }}>

      <Text>edit</Text>
    </View>
  )
}
export default React.memo(SpecialEdit);
const styles = StyleSheet.create({});