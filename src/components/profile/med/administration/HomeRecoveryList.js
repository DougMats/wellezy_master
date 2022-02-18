import React, { useState, useEffect, useContext } from 'react'
import { View, ActivityIndicator, TouchableOpacity, Image, Text } from 'react-native'
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import { homeRecovery } from '../../../../services/connection.js';
import Pagination from '../../../filters/Pagination.js';

import UserContext from '../../../../../contexts/UserContext'


import CardHomeRecoveryCard from './HomeRecoveryCard.js';
//'../../../cards/CardHomeRecoveryMini.js'

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

function HomeRecoveryList(props) {
  const { t, i18n } = useTranslation();
  const [Data, setData] = useState(null);
  const [Load, setLoad] = useState(true);
  const [page, setpage] = useState(1);
  const { userDetails, setUserDetails } = useContext(UserContext);

  useEffect(() => {
    Get()
  }, [props]);


  async function Get() {
    const res = await homeRecovery.myList(userDetails.id, i18n.language)
    setData(res)
    setLoad(false)
  }

  function getPage(p) {
    setpage(p)
  }

  return (
    <View style={{ paddingTop: 20 }}>
      {Load && <ActivityIndicator color={color_primary} size={30} style={{ marginVertical: 100 }} />}
      {!Load && Data !== null && Data.data.map((i, key) => {
          return (
            <CardHomeRecoveryCard key={key} data={i} goToScreen={props.goToScreen}/>
          )
        })
      }
      {!Load && Data !== null && Data.last_page > 1 && <Pagination page={page} lastPage={Data.last_page} getPage={getPage} />}
    </View>
  )
}
export default React.memo(HomeRecoveryList);