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
import SpecialCard from './SpecialCard.js';
import Pagination from '../../../filters/Pagination.js';

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
function SpecialList(props) {
  const { t, i18n } = useTranslation();
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [successfully, setsuccessfully] = useState(false);
  const [Load, setLoad] = useState(true);
  const [Location, setLocation] = useState(false);
  const [Data, setData] = useState(null);


  const [page, setpage] = useState(1);
  useEffect(() => {
    Get()
  }, [page]);


  async function Get() {
    setLoad(true)
    const res = await specials.ListByMedic(userDetails.id, i18n.language, null, page)
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
          <SpecialCard key={key} data={i} />
        )
      })
      }

      {!Load && Data !== null && Data.last_page > 1 && <Pagination page={page} lastPage={Data.last_page} getPage={getPage} />}
    </View>
  )
}
export default React.memo(SpecialList);
const styles = StyleSheet.create({});



// ...

// import Pagination from '../filters/Pagination';

// const windowWidth = (Dimensions.get('window').width);
// function SpecialsList(props) {
//   const { t, i18n } = useTranslation();
//   const [page, setpage] = useState(1);
//   const [Load, setLoad] = useState(true);
//   const [Data, setData] = useState(null);

//   useEffect(() => {
//     Get();
//   }, [props]);

//   async function Get() {
//     const res = await specials.specialsList(i18n.language, null, page)
//     setData(res)
//   }

//   useEffect(() => {
//     if (Data !== null) {
//       setLoad(false);
//     }
//   }, [Data]);

//   function getPage(p) {
//     setpage(p)
//   }

//   return (
//     <View>
//       {Load && <ActivityIndicator color={colorZeta} size={40} />}

//       {!Load && Data.data.length !== 0 && Data.data.map((i, key) => {
//         return (
//           <View style={{ backgroundColor: "transparent" }}>
//             <SpecialsCard key={key} data={i} goToScreen={props.goToScreen} />
//           </View>
//         )
//       })}

//       {!Load && Data.last_page > 1 &&
//         <Pagination page={page} lastPage={Data.last_page} getPage={getPage} />
//       }


//     </View>
//   )

//   {/*
// //         <View style={styles.head}>
// //           <Text style={styles.title}>Specials</Text>
// //           <TouchableOpacity
// //             onPress={() => goToScreen("SpecialAll")}
// //             style={styles.viewMore}>
// //             <Text style={styles.viewMoreText}>ver más</Text>
// //           </TouchableOpacity>
// //         </View>
// //         <View style={styles.body}>
// // <TouchableOpacity style={[styles.btn,{left:10}]}>
// //   <Icon name="arrow-ios-back-outline" width={30} height={30} fill={"#555"} /> 
// // </TouchableOpacity>
// // <TouchableOpacity style={[styles.btn,{right:10 }]}>
// //   <Icon name="arrow-ios-forward-outline" width={30} height={30} fill={"#555"} /> 
// // </TouchableOpacity>
// //           <ScrollView
// //             horizontal={true}
// //             scrollEventThrottle={16}
// //           >
// //             {
// //               data.map((i, key) => {
// //                 return (
// //                   <CardSpecials key={key} data={i} goToScreen={goToSpecial} />
// //                 )
// //               })}
// //           </ScrollView>
// //         </View>
//         */}
// }

// const styles = StyleSheet.create({
//   //   wrap: {
//   //     backgroundColor: "#dcdcdc",
//   //     flexDirection: "column",
//   //     width: "100%"
//   //   },
//   //   head: {
//   //     paddingTop: 15,
//   //     paddingHorizontal: 20,
//   //     flexDirection: "row",
//   //     paddingVertical: 5,
//   //     marginBottom: 2
//   //   },
//   //   title: {
//   //     paddingLeft: 20,
//   //     width: "80%",
//   //     fontWeight: "bold",
//   //     fontSize: 16,
//   //     color: colorAlfa
//   //   },
//   //   viewMore: {
//   //     width: "20%",
//   //     borderRadius: 12,
//   //     borderColor: colorAlfa,
//   //     borderWidth: 1,
//   //     backgroundColor: colorZeta

//   //   },
//   //   viewMoreText: {
//   //     textAlign: "center",
//   //     color: colorAlfa
//   //   },
//   //   body: {
//   //     // flexDirection: "row",
//   //     //backgroundColor: "#eee"
//   //     paddingBottom: 30
//   //   },
//   //   btn: {
//   //     top: 150,
//   //     position: "absolute",
//   //     zIndex: 9999,
//   //     justifyContent: "center",
//   //     alignContent: "center",
//   //     alignItems: "center",
//   //     backgroundColor: "rgba(0,0,0,0.1)",
//   //     width: 40,
//   //     height: 40,
//   //     borderRadius: 40
//   //   }
// })
// export default SpecialsList;