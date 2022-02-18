// import React, { useState } from 'react';
// import { ScrollView, View, TouchableOpacity, Text, Image } from 'react-native';
// import { Icon } from 'react-native-eva-icons';
// import { colorAlfa,colorMi,colorZeta } from '../../styles/Colors.js';
// import { useTranslation } from 'react-i18next';
// import { file_server1 } from '../../../Env'

// function Favorites(props) {
//   const { t, i18n } = useTranslation()


// console.log("-> ",props.FavoriteProcess)

//   return (
//     <ScrollView>
//       <View style={{ alignItems: "center", alignContent: "center" }}>
//       {
//           props.FavoriteProcess === undefined &&
//           <View style={{ width: "100%", height: "100%",  alignContent: "center", alignItems: "center" }}>
//             <View style={{marginTop:"10%", width: "50%", flexDirection: "column", alignContent: "center", alignItems: "center", borderStyle: 'dashed', borderColor: "#00AFE8", borderWidth: 1, paddingVertical: 15, borderRadius: 30, paddingHorizontal: 30 }}>
//               <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: "center", color: "#00AFE8" }}>{t("sorryEmpty")}</Text>
//             </View>
//           </View>
//         } 
//         {
//            props.FavoriteProcess !== undefined && props.FavoriteProcess.length === 0 &&
//           <View style={{ width: "100%", height: "100%",  alignContent: "center", alignItems: "center" }}>
//             <View style={{marginTop:"10%", width: "50%", flexDirection: "column", alignContent: "center", alignItems: "center", borderStyle: 'dashed', borderColor: "#00AFE8", borderWidth: 1, paddingVertical: 15, borderRadius: 30, paddingHorizontal: 30 }}>
//               <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: "center", color: "#00AFE8" }}>{t("sorryEmpty")}</Text>
//             </View>
//           </View>
//         }  
//        {
//           props.FavoriteProcess !== undefined && props.FavoriteProcess.length > 0 &&
//           props.FavoriteProcess.map((i, key) => {
//             return (
//               <Card data={i} key={key} goToScreen={props.goToScreen} deleteFavorite={props.deleteFavorite} />
//             )
//           })
//         } 
//         <View style={{ height: 100 }}></View>
//       </View>
//     </ScrollView>
//   );
// }




// function Card(props) {
//   return (
//     <View style={{ marginTop: 10, borderRadius: 10, backgroundColor: colorZeta, width: "90%", flexDirection: "row", justifyContent: "space-around", padding: 10 }}>
//       <TouchableOpacity style={{width: "10%" }} onPress={() => props.deleteFavorite(props.data)}>
//         <View style={{ top: 10, left: 5, width: "15%", }} >
//           <Icon name='star' width={20} height={20} fill={colorAlfa} />
//         </View>
//       </TouchableOpacity>
//       <TouchableOpacity style={{ flexDirection: "row", width: "90%" }} onPress={() => props.goToScreen("Process", props.data)}>
//         <View style={{ marginLeft: 10, overflow: "hidden", width: 50, height: 50, borderRadius: 25, }}>
//           <Image style={{ width: null, height: null, resizeMode: "cover", flex: 1 }}
//             source={{ uri: `${file_server1}/img/category/picture/${props.data.foto}` }}
//           />
//         </View>
//         <Text style={{ left: 20, lineHeight: 45, fontSize: 14, color: "#777", textAlign: "left", textTransform: "capitalize" }}>{props.data.name}</Text>
//         <View style={{ position:"absolute", right:10, top:15 }}>
//           <Icon name="arrow-ios-forward-outline" width={20} height={20} fill="#E3E3E3" />
//         </View>
//       </TouchableOpacity>
//     </View>
//   );
// }


// export default Favorites;