
import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, ActivityIndicator, TouchableOpacity, TextInput, View, Text, Image, Dimensions } from 'react-native'
import { useTranslation } from 'react-i18next';
import { Icon } from 'react-native-eva-icons';
import CardNurse from './NurseCard.js';
import { nurses } from '../../../../services/connection.js'
import UserContext from '../../../../../contexts/UserContext'

import Pagination from '../../../filters/Pagination.js';
import FilterSilver from '../../../filters/Silver';
import FilterGolden from '../../../filters/Golden';
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
} from '../../../../styles/Colors.js';

function NurseList(props) {
  const { t, i18n } = useTranslation();
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [Data, setData] = useState(null);
  const [Load, setLoad] = useState(true);

  const [premium, setpremium] = useState(null);
  const [stars, setstars] = useState(null);
  const [search, setsearch] = useState(null);
  const [page, setpage] = useState(1);

  useEffect(() => {
    Get()
  }, [userDetails.id, premium, stars, search, page]);

  async function Get(id) {
    setLoad(true)
    const res = await nurses.nursesByMedic(userDetails.id, i18n.language, premium, stars, search, page)
    setData(res)
    setLoad(false)
  }

  function getPage(p) {
    setpage(p)
  }

  //   function filterByPremium(e) {
  //     if (e === true) { setpremium(1) }
  //     else {
  //       if (e === false) { setpremium(0) }
  //     }
  //   }

  //   function filterByEstrellas(e) {
  //     if (e === true) { setstars(1) }
  //     else {
  //       if (e === false) { setstars(0) }
  //     }
  //   }

  //   function onChangeText(text) {
  //     if (page !== 1) { setpage(1) }
  //     if (text !== "") { setsearch(text) }
  //     else {
  //       if (text === "") {
  //         setsearch(null)
  //       }
  //     }
  //   }


  return (
    <View style={{paddingTop:10}}>


      {/*
   <View style={styles.wrapper}>
     <View style={styles.wrap}>
       <View style={styles.search}>
         <TextInput
           value={search}
           placeholder="Buscar..."
           placeholderTextColor="#ccc"
           style={{ color: "#777", width: "85%", left: 15, fontSize: 20 }}
           onChangeText={text => onChangeText(text)}
         />
         <Icon name='search-outline' fill="#ccc" width={30} height={30} />
       </View>
       <FilterSilver icon="award" textUp="Clasificación" textDown="Premium" function={filterByPremium} />
       <FilterGolden icon="star" textLeft="5 Estrellas" textRight="" function={filterByEstrellas} />
     </View>
     
    
   </View>
 )
}
*/}





{Load && <ActivityIndicator color={color_primary} size={40} />}
    
    {!Load && Data !== null && Data.data.length !== 0 &&
      Data.data.map((i, key) => {
        return (
          <CardNurse key={key} data={i} goToScreen={props.goToScreen} goToEdit={props.goToEdit}/>
        )
      })
    }





      {!Load && Data !== null && Data.last_page > 1 &&
        <Pagination page={page} lastPage={Data.last_page} getPage={getPage} />
      }
      {!Load && Data !== null && Data.data.length === 0 &&
        <Text>empty</Text>
      }


    </View>
  )
}
export default React.memo(NurseList);


const styles = StyleSheet.create({
  wrapper: {
  },
  wrap: {
    top: -10,
    backgroundColor: "rgba(255,255,255,1)",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: "column",
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  search: {
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 5,
    borderBottomColor: "silver",
    borderBottomWidth: 1
  }
})
