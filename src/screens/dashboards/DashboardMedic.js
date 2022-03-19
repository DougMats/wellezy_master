import React, { useState } from 'react'
import { TouchableOpacity, SafeAreaView, Text, Dimensions, View, ScrollView } from 'react-native'
import Head from '../../components/generic/Head';
import MenuVertical from '../../components/generic/MenuVertical.js';
import Menu from '../../components/generic/Menu';
import { Icon } from 'react-native-eva-icons';
import IconSvg from '../../svg/icon_svg.js'
import { color_fifth, color_primary, color_screen, color_secondary, color_star } from '../../styles/Colors'
import ValorationsListMedic from '../../components/valorations/ValorationsList.js'


const windowWidth = Dimensions.get('window').width;
const MaxWidth = windowWidth / 12

function DashboardMedic(props) {
  const [vertical, setvertical] = useState(false);
  const optionsList = [
    { icon: "menu-2-outline", name: "Administrar Valoraciones", goTo: "ValorationsList", color: color_primary },
    { icon: "person", name: "mi perfil", goTo: "Profile", color: color_secondary },
    { icon: "clipboard-outline", name: "Cotizaciones", goTo: "ManageOrders", color: color_fifth },
    { icon: "video-outline", name: "Sala", goTo: "Sala", color: color_star },
  ]

  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }

  // const procedimientosList = () => {
  //   const { procedimientos } = props
  //   return procedimientos.map((i, key) => {
  //     if (i.name) {
  //       return <Text key={key}> 2-> {i.name}</Text>
  //     }
  //     else {
  //       return <Text key={key}> 1->{i}</Text>
  //     }
  //   })
  // }



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color_screen }}>
      <Head props={props} return=""
        show={vertical}
        action={setvertical}
      />


      <ScrollView scrollEventThrottle={16}>
        <View style={{
          flexDirection: 'row',
          width: "100%",
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          paddingHorizontal: 10
        }}>
          {optionsList.map((i, key) => {
            return (
              <Option key={key} data={i} goToScreen={goToScreen} />
            )
          })}
        </View>


        {/* {getsuperheroes()}
        <Text>--------</Text>
        {procedimientosList()}  <ValorationsListMedic goToScreen={goToScreen}/>
        <View style={{ paddingBottom: 60 }}>
          <ProcessList goToScreen={goToScreen} />
          <SpecialsList goToScreen={goToScreen} /> 
        </View
      */}
      </ScrollView>
      <Menu
        props={props}
        option={1}
        alert={0}
      />
      {vertical === true &&
        <MenuVertical
          width={280}
          show={vertical}
          action={setvertical}
          goToScreen={goToScreen}
        />
      }
    </SafeAreaView>
  )
}



// const mapStateToProps = state => {
//   return {
//     missuperheores: state.superheroes,
//     procedimientos: state.procedimientos
//   }
// }


export default DashboardMedic;
//export default connect(mapStateToProps)(DashboardMedic);
//export default connect(mapStateToProps)(React.memo(DashboardMedic));

const Option = (props) => {
  return (
    <TouchableOpacity
      style={{
        overflow: "hidden",
        backgroundColor: props.data.color,
        width: MaxWidth * 5,
        height: MaxWidth * 4,
        marginVertical: 15,
        borderRadius: 12,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 5
      }}
      onPress={() => props.goToScreen(props.data.goTo, null)}>
      <Icon name={props.data.icon} width={60} height={60} fill={"white"} />
      <Text style={{
        textTransform: "capitalize",
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 14
      }}>{props.data.name}</Text>
      <View style={{
        position: "absolute",
        zIndex: -1,
        backgroundColor: "rgba(0,0,0,0.1)",
        width: MaxWidth * 6,
        height: MaxWidth * 4,
        top: MaxWidth * 2.5,
        transform: [{ rotateZ: "-10deg" }]
      }}></View>
    </TouchableOpacity>
  )
}