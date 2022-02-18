import React, {useState} from 'react'
import {StyleSheet, View, Text} from 'react-native'
function ProfileInfo(props){
const [data, setdata] = useState(props.data);

  return(
    <View style={styles.wrap}>
     <View style={styles.group}>
       <Text style={styles.label}></Text>
       <Text style={styles.text}>{data.adress}</Text>
       </View>

     <View style={styles.group}>
       <Text style={styles.label}></Text>
       <Text style={styles.text}>{data.date_of_birth}</Text>
       </View>

     <View style={styles.group}>
       <Text style={styles.label}></Text>
       <Text style={styles.text}>{data.email}</Text>
       </View>

     <View style={styles.group}>
       <Text style={styles.label}></Text>
       <Text style={styles.text}>{data.email_verified_at}</Text>
       </View>

     <View style={styles.group}>
       <Text style={styles.label}></Text>
       <Text style={styles.text}>{data.facebook}</Text>
       </View>

     <View style={styles.group}>
       <Text style={styles.label}></Text>
       <Text style={styles.text}>{data.id}</Text>
       </View>

     <View style={styles.group}>
       <Text style={styles.label}></Text>
       <Text style={styles.text}>{data.id_city}</Text>
       </View>

     <View style={styles.group}>
       <Text style={styles.label}></Text>
       <Text style={styles.text}>{data.id_country}</Text>
       </View>

     <View style={styles.group}>
       <Text style={styles.label}></Text>
       <Text style={styles.text}>{data.id_perfil}</Text>
       </View>

     <View style={styles.group}>
       <Text style={styles.label}></Text>
       <Text style={styles.text}>{data.identificacion}</Text>
       </View>

     <View style={styles.group}>
       <Text style={styles.label}></Text>
       <Text style={styles.text}>{data.instagram}</Text>
       </View>

     <View style={styles.group}>
       <Text style={styles.label}></Text>
       <Text style={styles.text}>{data.language}</Text>
       </View>

     <View style={styles.group}>
       <Text style={styles.label}></Text>
       <Text style={styles.text}>{data.name}</Text>
       </View>

     <View style={styles.group}>
       <Text style={styles.label}></Text>
       <Text style={styles.text}>{data.password}</Text>
       </View>

     <View style={styles.group}>
       <Text style={styles.label}></Text>
       <Text style={styles.text}>{data.phone}</Text>
       </View>

     <View style={styles.group}>
       <Text style={styles.label}></Text>
       <Text style={styles.text}>{data.photo_profile}</Text>
       </View>

     <View style={styles.group}>
       <Text style={styles.label}></Text>
       <Text style={styles.text}>{data.rol}</Text>
       </View>

     <View style={styles.group}>
       <Text style={styles.label}></Text>
       <Text style={styles.text}>{data.status}</Text>
       </View>

     <View style={styles.group}>
       <Text style={styles.label}></Text>
       <Text style={styles.text}>{data.surname}</Text>
       </View>

     <View style={styles.group}>
       <Text style={styles.label}></Text>
       <Text style={styles.text}>{data.twitter}</Text>
       </View>

     <View style={styles.group}>
       <Text style={styles.label}></Text>
       <Text style={styles.text}>{data.youtube}</Text>
       </View>

    </View>
  )
}

export default React.memo(ProfileInfo);

const styles = StyleSheet.create({
  wrap:{},
  group:{},
  label:{},
  text:{}
})



// import React, { useState, useContext, useEffect } from 'react';
// import { Image, TextInput, SafeAreaView, ScrollView, Text, Switch, View, TouchableOpacity, StatusBar, ActivityIndicator, StyleSheet,Linking,ImageBackground } from 'react-native';
// import { Icon } from 'react-native-eva-icons';
// import { useTranslation } from 'react-i18next';
// import {colorAA, colorAlfa, colorZeta} from  '../../styles/Colors.js'





// function Index(props) {
//   const { t, i18n } = useTranslation();
//   function ToEdit() {
//     console.log("toEdit")
//     setEditing(true);
//     setmenu(false);
//     setPage(1);
//   }
//   const link= async (url) => {
//     console.log("sitio web")
//     await Linking.openURL(url)
//   }
//   return (
//     <View style={styles.page}>
//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>{t("personalInformation")}</Text>
//         <View style={styles.a}>
//           <Text style={styles.b}>{t("titleProfetional")}:</Text>
//           <TextInput onChangeText={text => props.ChangeText(text, 'title')} value={props.myData.title} editable={props.Editing} style={[styles.c, {width:"100%", backgroundColor: props.Editing ? "#f1f1f1" : "white" }]} />
//         </View>
//         <View style={styles.a}>
//           <Text style={styles.b}>{t("name")}:</Text>
//           <TextInput onChangeText={text => props.ChangeText(text, 'name')} value={props.myData.name} editable={props.Editing} style={[styles.c, {width:"100%", backgroundColor: props.Editing ? "#f1f1f1" : "white" }]} />
//         </View>
//         <View style={styles.a}>
//           <Text style={styles.b}>{t("surname")}:</Text>
//           <TextInput onChangeText={text => props.ChangeText(text, 'surname')} value={props.myData.surname} editable={props.Editing} style={[styles.c, {width:"100%", backgroundColor: props.Editing ? "#f1f1f1" : "white" }]} />
//         </View>
//         <View style={styles.a}>
//           <Text style={styles.b}>{t("IDnumber")}:</Text>
//           <TextInput onChangeText={text => props.ChangeText(text, 'identification')} value={props.myData.identification} editable={props.Editing} style={[styles.c, {width:"100%", backgroundColor: props.Editing ? "#f1f1f1" : "white" }]} />
//         </View>
//         <View style={styles.a}>
//           <Text style={styles.b}>{t("email")}:</Text>
//           <TextInput onChangeText={text => props.ChangeText(text, 'email')} value={props.myData.email} editable={props.Editing} style={[styles.c, {width:"100%", backgroundColor: props.Editing ? "#f1f1f1" : "white" }]} />
//         </View>
//         <View style={styles.a}>
//           <Text style={styles.b}>{t("phone")}:</Text>
//           <TextInput onChangeText={text => props.ChangeText(text, 'phone')} value={props.myData.phone} editable={props.Editing} style={[styles.c, {width:"100%", backgroundColor: props.Editing ? "#f1f1f1" : "white" }]} />
//         </View>
//         <View style={styles.a}>
//           <Text style={styles.b}>{t("dateOfBirth")}:</Text>
//           <TextInput onChangeText={text => props.ChangeText(text, 'dateOfBirth')} value={props.myData.dateOfBirth} editable={props.Editing} style={[styles.c, {width:"100%", backgroundColor: props.Editing ? "#f1f1f1" : "white" }]} />
//         </View>
//       </View>
//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>{t("whereAreYouFrom")}</Text>
//         <View style={styles.a}>
//           <Text style={styles.b}>{t("country")}:</Text>
//           <TextInput onChangeText={text => props.ChangeText(text, 'country')} value={props.myData.country} editable={props.Editing} style={[styles.c, {width:"100%", backgroundColor: props.Editing ? "#f1f1f1" : "white" }]} />
//         </View>
//         <View style={styles.a}>
//           <Text style={styles.b}>{t("district")}:</Text>
//           <TextInput onChangeText={text => props.ChangeText(text, 'district')} value={props.myData.district} editable={props.Editing} style={[styles.c, {width:"100%", backgroundColor: props.Editing ? "#f1f1f1" : "white" }]} />
//         </View>
//         <View style={styles.a}>
//           <Text style={styles.b}>{t("town")}:</Text>
//           <TextInput onChangeText={text => props.ChangeText(text, 'city')} value={props.myData.city} editable={props.Editing} style={[styles.c, {width:"100%", backgroundColor: props.Editing ? "#f1f1f1" : "white" }]} />
//         </View>
//         <View style={styles.a}>
//           <Text style={styles.b}>{("direction")}:</Text>
//           <TextInput onChangeText={text => props.ChangeText(text, 'adress')} value={props.myData.adress} editable={props.Editing} style={[styles.c, {width:"100%", backgroundColor: props.Editing ? "#f1f1f1" : "white" }]} />
//         </View>
//       </View>
//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>{t("mySocialNetworks")}</Text>
//         <View style={styles.a}>
//           <Text style={styles.b}>{t("facebook")}:</Text>
//           <TextInput onChangeText={text => props.ChangeText(text, 'facebook')} value={props.myData.facebook} editable={props.Editing} style={[styles.c, {width:"92%", backgroundColor: props.Editing ? "#f1f1f1" : "white" }]} />
//           {props.myData.facebook !=="" &&<TouchableOpacity onPress={() => link(props.myData.facebook)} style={{ width: 30, height: 30, position: "absolute", justifyContent: "center", alignContent: "center", alignItems: "center", right: -10, top: 22, borderRadius: 20, backgroundColor: colorAlfa }}>
//             <Icon name='log-in-outline' height={20} width={20} fill={colorZeta} />
//           </TouchableOpacity>
//           }
//         </View>
//         <View style={styles.a}>
//           <Text style={styles.b}>{t("instagram")}:</Text>
//           <TextInput onChangeText={text => props.ChangeText(text, 'instagram')} value={props.myData.instagram} editable={props.Editing} style={[styles.c, {width:"92%", backgroundColor: props.Editing ? "#f1f1f1" : "white" }]} />
//           {props.myData.instagram !=="" &&<TouchableOpacity onPress={() => link(props.myData.instagram)} style={{ width: 30, height: 30, position: "absolute", justifyContent: "center", alignContent: "center", alignItems: "center", right: -10, top: 22, borderRadius: 20, backgroundColor: colorAlfa }}>
//             <Icon name='log-in-outline' height={20} width={20} fill={colorZeta} />
//           </TouchableOpacity>
//           }
//         </View>
//         <View style={styles.a}>
//           <Text style={styles.b}>{t("twitter")}:</Text>
//           <TextInput onChangeText={text => props.ChangeText(text, 'twitter')} value={props.myData.twitter} editable={props.Editing} style={[styles.c, {width:"92%", backgroundColor: props.Editing ? "#f1f1f1" : "white" }]} />
//           {props.myData.twitter !=="" &&<TouchableOpacity onPress={() => link(props.myData.twitter)} style={{ width: 30, height: 30, position: "absolute", justifyContent: "center", alignContent: "center", alignItems: "center", right: -10, top: 22, borderRadius: 20, backgroundColor: colorAlfa }}>
//             <Icon name='log-in-outline' height={20} width={20} fill={colorZeta} />
//           </TouchableOpacity>
//           }
//         </View>
//         <View style={styles.a}>
//           <Text style={styles.b}>{t("youtube")}:</Text>
//           <TextInput onChangeText={text => props.ChangeText(text, 'youtube')} value={props.myData.youtube} editable={props.Editing} style={[styles.c, {width:"92%", backgroundColor: props.Editing ? "#f1f1f1" : "white" }]} />
//           {props.myData.youtube !=="" &&<TouchableOpacity onPress={() => link(props.myData.youtube)} style={{ width: 30, height: 30, position: "absolute", justifyContent: "center", alignContent: "center", alignItems: "center", right: -10, top: 22, borderRadius: 20, backgroundColor: colorAlfa }}>
//             <Icon name='log-in-outline' height={20} width={20} fill={colorZeta} />
//           </TouchableOpacity>
//           }
//         </View>
//       </View>
//       {
//         props.Editing &&
//         <TouchableOpacity style={styles.btnPrimary} onPress={() => props.saveInfo()}>
//           <Icon name='checkmark-circle-2-outline' width={25} height={25} fill={colorAlfa} />
//           <Text style={styles.textPrimary}>{t("saveChanges")}</Text>
//         </TouchableOpacity>
//       }
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   page: {
//     width: "100%",
//     alignContent: "center",
//     alignItems: "center"
//   },
//   card: {
//     marginTop: 20,
//     backgroundColor: "#FFF",
//     padding: 10,
//     width: "90%",
//     borderRadius: 8,
//     alignContent: "center",
//     alignItems: "center"
//   },
//   cardTitle: {
//     color: "#00AFE8",
//     textTransform: "uppercase",
//     fontWeight: "bold",
//     fontSize: 14,
//     marginBottom: 10,
//     marginTop: 15
//   },
//   inputText: {
//     textAlign: "center",
//     width: "80%",
//     height: 40,
//     color: "#555",
//     fontSize: 16,
//     borderBottomColor: "#00AFE8",
//     borderBottomWidth: 0.5
//   },
//   btnPrimary: {
//     backgroundColor: colorZeta,
//     marginVertical: 20,
//     width: "60%",
//     borderRadius: 8,
//     flexDirection: "row",
//     justifyContent: "center",
//     paddingVertical: 8
//   },
//   textPrimary: {
//     lineHeight: 25,
//     marginLeft: 5,
//     fontSize: 16,
//     textTransform: "uppercase",
//     textAlign: "center",
//     color: colorAlfa
//   },
//   a: {
//     flexDirection: "column",
//     width: "90%"
//   },
//   b: {
//     color: "#555",
//     fontSize: 10,
//     lineHeight: 20,
//     textTransform: "uppercase"
//   },
//   c: {
//     marginBottom: 5,
//     height: 35,
//     paddingVertical: -5,
//     backgroundColor: "white",
//     color: "#000",
//     fontSize: 16,
//     borderRadius: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: "#f1f1f1"
//   }
// });
// export default Index;