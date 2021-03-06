import React, { useState, useEffect, useContext } from 'react';
import { Dimensions, SafeAreaView, StatusBar, ScrollView, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import UserContext from '../../../contexts/UserContext'
import AsyncStorage from '@react-native-community/async-storage'
import { services } from '../../services/connection.js';



// import Head from '../../components/generic/Head';
// import Menu from '../../components/generic/Menu';
// import MenuVertical from '../../components/generic/MenuVertical.js';
// import { color_primary, color_white, color_grey_light, color_grey_half } from '../../styles/Colors.js'

// import Nurses from './Nurses'
// import Drivers from './Drivers'
// import Specials from './Specials'
// import HomeRecovery from './HomeRecovery.js';
// import Hotels from './Hotels'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function DashboardServices(props) {
  const { t, i18n } = useTranslation();
  const { navigation } = props
  //const { ourServices, setourServices } = useContext(UserContext);



  //   const [Load, setLoad] = useState(true);
  //   const [vertical, setvertical] = useState(false);

  //   
  //   const [horizonOptions, sethorizonOptions] = useState([]);
  //   const [TIP, setTIP] = useState(null);


  
  //console.log(" context ourServices: ", ourServices)


  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = 1 }

  useEffect(() => {
    GetServices();
  }, [randomCode]);


  async function GetServices() {
    try {
      const res = await services.servicesList(i18n.language)
      await AsyncStorage.setItem('@Passport', JSON.stringify(res));
      //setourServices({ ...res })
    }
    catch (error) { }




    //console.log("servicesList.............", servicesList)
    // sethorizonOptions(servicesList);
    // setLoad(false)




    // const _storeData = async (data) => {
    //   try {
    //     console.log("here async")
    //     await AsyncStorage.setItem('@Passport', JSON.stringify(data));
    //     console.log("esto es lo que obtengo....");
    //     console.log(data);
    //     console.log('Authentication successfully')
    //    
    //     console.log("successfully")
    //     props.navigation.navigate("Home")
    //   }
    //   catch (error) { }
    // }


  }


  //   useEffect(() => {
  //     if (horizonOptions.length > 0) {
  //       if (props.route.params.data !== undefined) {
  //         console.log("if")
  //         setTIP(props.route.params.data)
  //       }
  //       else {
  //         console.log("else")
  //         const res = horizonOptions[0].id
  //         setTIP(res)
  //       }
  //     }
  //   }, [horizonOptions]);



  //   function goToScreen(screen, data) {
  //     props.navigation.navigate(screen, { randomCode: Math.random(), data })
  //   }


  //   function Horizon(data) {
  //     try {
  //       if (data.length !== 0) {
  //         return (
  //           <ScrollView scrollEventThrottle={16} horizontal={true} showsHorizontalScrollIndicator={false}
  //             style={{
  //               borderTopColor: color_grey_light,
  //               borderTopWidth: 0.5,
  //               backgroundColor: color_white,
  //               paddingVertical: 5
  //             }}>
  //             {
  //               data.map((i, key) => {
  //                 return (
  //                   <TouchableOpacity key={key}
  //                     onPress={() => setTIP(i.id)}
  //                     style={[styles.optionHorizon, { borderBottomColor: TIP == i.id ? color_primary : color_primary, borderBottomWidth: TIP == i.id ? 1 : 0, }]}>
  //                     <Text style={[styles.nameOptHorizon, { color: TIP == i.id ? color_primary : color_grey_half }]}>{i.name}</Text>
  //                   </TouchableOpacity>
  //                 )
  //               })
  //             }
  //           </ScrollView>
  //         );
  //       }
  //     } catch (error) {
  //       console.log("error Horizontal()", error)
  //     }
  //   }




  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>....</Text>
      {/* 
      <Head props={props} return="" show={vertical} action={setvertical} />
      <ScrollView tickyHeaderIndices={[0]} scrollEventThrottle={16} horizontal={false}>
       
       


        {/* {!Load && horizonOptions.length > 0 && Horizon(horizonOptions)} ***}


        {!Load && horizonOptions.length > 0 && 




        <ScrollView scrollEventThrottle={16} horizontal={true} showsHorizontalScrollIndicator={false}
            style={{
              borderTopColor: color_grey_light,
              borderTopWidth: 0.5,
              backgroundColor: color_white,
              paddingVertical: 5
            }}>
            {
              horizonOptions.map((i, key) => {
                return (
                  <TouchableOpacity key={key}
                    onPress={() => setTIP(i.id)}
                    style={[styles.optionHorizon, { borderBottomColor: TIP == i.id ? color_primary : color_primary, borderBottomWidth: TIP == i.id ? 1 : 0, }]}>
                    <Text style={[styles.nameOptHorizon, { color: TIP == i.id ? color_primary : color_grey_half }]}>{i.name}</Text>
                  </TouchableOpacity>
                )
              })
            }
          </ScrollView>
}




        {TIP !== null &&
          <View style={styles.wrap}>
            {TIP == 1 && <Drivers goToScreen={goToScreen} />}
            {TIP == 2 && <Hotels goToScreen={goToScreen} />}
            {/* TIP === 3 plan Nutritional***}
            {/* TIP === 4 Tours ***}
            {TIP == 6 && <Nurses goToScreen={goToScreen} />}
            {TIP == 7 && <HomeRecovery goToScreen={goToScreen} />}
            {TIP == 8 && <Specials goToScreen={goToScreen} />}
          </View>
        }
      </ScrollView>
      <Menu props={props} option={3} />
  <WellezyInfo /> 
      {vertical === true &&
        <MenuVertical
          width={280}
          show={vertical}
          action={setvertical}
          goToScreen={goToScreen}
        />
      }


*/}
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
  optionHorizon: {
    flexDirection: "column",
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    alignContent: "center",
    alignItems: "center"
  },
  nameOptHorizon: {
    textAlign: "center",
    lineHeight: 20,
    fontSize: 12,
    color: "red"
  },
  wrap: {
    paddingTop: 20,
    flexDirection: "column",
    justifyContent: 'center',
    paddingBottom: 60
  },
});
export default DashboardServices;