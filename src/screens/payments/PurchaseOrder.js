import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, Dimensions } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-eva-icons';
import LinearGradient from 'react-native-linear-gradient';
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
} from '../../styles/Colors.js';

import { currencyFormat } from '../../services/Functions.js';

import PackageCard from '../../components/payments/PackageCard.js';
import ItemCard from '../../components/payments/ItemCard.js';

function PurchaseOrder(props) {
  const [loaded, setLoaded] = useState(false);
  const [terminos, setterminos] = useState(false);



  const list = [
    {
      price: 420000,
      created_at:"2021-12-02 16:34:21",
      priceOffert: 390000,
      coin: "€",
      type: "package",
      title: "paquete premium",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    
    
      items: [
        {
          type: "procedure",
          name: "blefaroplastia",
          description: "ererewrr rtretret",
          supplies: [
            { name: "qwerty", description: "abcdef ghijkl mnop qrs tuvwxyz", qty: 1 },
            { name: "343434", description: "23232322", qty: 2 },
            { name: "343434", description: "23232322", qty: 5 }
          ]
        },
        {
          type: "airplaneTicket",
          airline: "avianca",
          numberPassengers: 3,
          from: "moscow",
          to: "london",
          gate: 47,
          flight: "OKL018",
          seat: "24A",
          class: "economy",
          boardingDate: "16 nov 2022",
          boardingTime: "11:30 am"
        },
        {
          type: "transport",
          nameDriver: "carlos cardenas",
          carCode: "23dfrte",
          carColor: "re",
          carModel: "Honda accord 2021",
          image: "https://www.elcarrocolombiano.com/wp-content/uploads/2020/10/20201210-Honda-Accord-01.jpg"
        }
      ]
    },


    {
      price: 380000,
      priceOffert: 350000,
      created_at:"2021-12-02 08:30:01",
      coin: "$",
      type: "package",
      title: "Befaroplastia",
      description: "  wegfbwygeyute y2tryg2yr g62 2eyrt62ery2e y622yrg y2gry2gryt 2yr 2gry24 ygryey g  2 e yefy2 eg y  2g 2e ",
      items: [
        {
          type: "procedure",
          name: "blefaroplastia",
          proce: 35000,
          description: "ererewrr rtretret",
          supplies: [
            { name: "343434", description: "23232322", qty: 1 },
            { name: "343434", description: "23232322", qty: 2 },
            { name: "343434", description: "23232322", qty: 5 }
          ]
        },
        {
          type: "airplaneTicket",
          airline: "avianca",
          numberPassengers: 3,
          from: "moscow",
          to: "london",
          gate: 47,
          flight: "OKL018",
          seat: "24A",
          class: "economy",
          boardingDate: "16 nov 2022",
          boardingTime: "11:30 am"
        },
      ]
    },

    {
      price: 250000,
      priceOffert: 245000,
      created_at:"2021-12-02 16:34:21",
      coin: " ¥",
      type: "package",
      title: "Lipo",
      description: "  wegfbwygeyute y2tryg2yr g62 2eyrt62ery2e y622yrg y2gry2gryt 2yr 2gry24 ygryey g  2 e yefy2 eg y  2g 2e ",
      items: [
        {
          type: "procedure",
          name: "blefaroplastia",
          proce: 35000,
          description: "ererewrr rtretret",
          supplies: [
            { name: "343434", description: "23232322", qty: 1 },
            { name: "343434", description: "23232322", qty: 2 },
            { name: "343434", description: "23232322", qty: 5 }
          ]
        },

        {
          type: "homeRecovery",
          airline: "avianca",
          numberPassengers: 3,
          from: "moscow",
          to: "london",
          gate: 47,
          flight: "OKL018",
          seat: "24A",
          class: "economy",
          boardingDate: "16 nov 2022",
          boardingTime: "11:30 am"
        },

      ]
    }




  ]

  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }

  return (
    <View style={{ flex: 1, backgroundColor: color_screen }}>
      <StatusBar backgroundColor="transparent" translucent />

      <View style={{ flexDirection: "column", paddingHorizontal: 20, backgroundColor: color_white, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, paddingTop: 50, paddingBottom: 10 }}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "15%", justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity style={{ borderRadius: 40, width: 40, height: 40, justifyContent: "center", alignItems: "center" }} onPress={() => props.navigation.goBack()}>
              <Icon name={"arrow-back-outline"} width={30} height={30} fill={color_primary} />
            </TouchableOpacity>
          </View>

          <View style={{ width: "70%", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", textTransform: "capitalize", color: color_primary }}>Lista de orden de compra</Text>
          </View>
          <View style={{ width: "15%", justifyContent: "center", alignItems: "center" }}>
          </View>
        </View>
        {/* <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>Total: $ 300.00,00</Text> */}
      </View>


      <ScrollView>
        <View style={{ paddingBottom: 140 }}>
          {
            list.map((i, key) => {
              if (i.type === "package") { return (<PackageCard data={i} key={key} goToScreen={goToScreen} />) }
              else {
                if (i.type === "item") { return (<Item data={i} key={key} goToScreen={goToScreen} />) }
                else {
                  return (<Text>error</Text>)
                }
              }
            })
          }
        </View>
      </ScrollView>





  {/*
      <LinearGradient colors={["#0689f7", "#01b8f6"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={{
          backgroundColor: color_white,
          flexDirection: "column",
          position: "absolute",
          bottom: 0,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 10,
          borderTopLeftRadius: 20, borderTopRightRadius: 20,
        }}>
        <View style={{ width: "100%", flexDirection: "row", paddingHorizontal: 20, alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity onPress={() => { setterminos(!terminos) }}>
            <Icon name={terminos ? 'checkmark-square-2-outline' : 'square-outline'} width={30} height={30} fill={color_white} />
          </TouchableOpacity>
          <Text style={{ lineHeight: 30, marginLeft: 5, fontSize: 14, color: color_white }}>Acepto los terminso y condiciones</Text>
        </View>
       <TouchableOpacity style={{
          borderWidth: 1,
          borderColor: color_white,
          minWidth: "60%",
          marginVertical: 10,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 20,
          paddingVertical: 10,
        }}>
          <Text style={{ color: color_white, fontSize: 16, fontWeight: "bold" }}>Pay</Text>
        </TouchableOpacity> 
      </LinearGradient>
      */}



    </View>
  )
}
export default PurchaseOrder;

const styles = StyleSheet.create({
});


const Item = (props) => {
  return (
    <View style={{ height: 100, backgroundColor: "white", marginTop: 10, width: "90%", alignSelf: "center", borderRadius: 12 }}>
      <Text>item-</Text>
    </View>
  )
}