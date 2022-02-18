import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Dimensions, TouchableOpacity, Image, ScrollView, View, Text, ActivityIndicator, } from 'react-native';
import { useTranslation } from 'react-i18next'
import { Icon } from 'react-native-eva-icons';
import { specials } from '../../../services/connection.js'
import { Offer, zfill, currencyFormat } from '../../../components/Logic.js';
import Head from '../../../components/generic/Head';
import Menu from '../../../components/generic/Menu';
import MenuVertical from '../../../components/generic/MenuVertical.js';
import { file_server1 } from '../../../../Env'
import Rating from '../../../components/stars/Rating'
import RatingSimple from '../../../components/stars/RatingSimple'
import ScoreStars from '../../../components/stars/ScoreStars'



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
} from '../../../styles/Colors.js';



const windowWidth = (Dimensions.get('window').width);

function SpecialView(props) {
  const { t, i18n } = useTranslation();
  const { navigation } = props;
  const [Load, setLoad] = useState(true);
  const [data, setdata] = useState(props.route.params.data);
  const [items, setitems] = useState([]);
  const [displayDescription, setdisplayDescription] = useState(false);
  const [vertical, setvertical] = useState(false);
  const [sticke, setsticke] = useState(false);



  // const save = {
  //   id_doctor: "",
  //   id_procedure: "",
  //   status: "",
  //   title: "",
  //   description: "",
  //   banner: "",
  //   price: "",
  //   price_offer: "",
  //   date_limit: "",
  //   items: [
  //     {
  //       id_specials: "",
  //       name: "",
  //       description: ""
  //     },
  //     {
  //       id_specials: "",
  //       name: "",
  //       description: ""
  //     },
  //     {
  //       id_specials: "",
  //       name: "",
  //       description: ""
  //     },
  //   ]
  // }



  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = 1 }


  useEffect(() => {
    Get(props.route.params.data.id)
    }, [randomCode]);


  async function Get(id) {
    console.log("send id:", id)
    const response = await specials.getItems(i18n.language, id)
console.log("response: ", response)
   // setitems(response)
    setLoad(false);
  }



  function goToScreen(screen, id) {
    let data = { id: id }
    let id_Medic = props.route.params.data.id_doctor
    console.log("new data", data)
    props.navigation.navigate(screen, { randomCode: Math.random(), data, id_Medic })
  }


/*
special view data:  {"banner": "background-blur-clean-531880-1.jpg", "basedOn": 0, "date_limit": "02-04-2022", "description": "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas Letraset, las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.¿Por qué lo usamos?Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo Contenido aquí, contenido aquí. Estos textos hacen parecerlo un español que se puede leer. Muchos paquetes de autoedición y editores de páginas web usan el Lorem Ipsum como su texto por defecto, y al hacer una búsqueda de Lorem Ipsum va a dar por resultado muchos sitios web que usan este texto si se encuentran en estado de desarrollo. Muchas versiones han evolucionado a través de los años, algunas veces por accidente, otras veces a propósito (por ejemplo insertándole humor y cosas por el estilo).", "description_doctor": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like.", "id": 11, "id_doctor": 2, "id_procedure": 8, "img": "1157-41709.jpg", "name": "Fernando", "name_category": "OTOPLASTIA", "price": 12000000, "price_offer": 5000000, "rating": 50, "specialName": "11 befaroplastia", "stars": 0, "status": 1, "surname": "Torres Arizon", "title": "ing", "type": "standard"}
special view data:  {"banner": "background-blur-clean-531880-1.jpg", "basedOn": 0, "date_limit": "02-04-2022", "description": "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas Letraset, las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.¿Por qué lo usamos?Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo Contenido aquí, contenido aquí. Estos textos hacen parecerlo un español que se puede leer. Muchos paquetes de autoedición y editores de páginas web usan el Lorem Ipsum como su texto por defecto, y al hacer una búsqueda de Lorem Ipsum va a dar por resultado muchos sitios web que usan este texto si se encuentran en estado de desarrollo. Muchas versiones han evolucionado a través de los años, algunas veces por accidente, otras veces a propósito (por ejemplo insertándole humor y cosas por el estilo).", "description_doctor": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like.", "id": 11, "id_doctor": 2, "id_procedure": 8, "img": "1157-41709.jpg", "name": "Fernando", "name_category": "OTOPLASTIA", "price": 12000000, "price_offer": 5000000, "rating": 50, "specialName": "11 befaroplastia", "stars": 0, "status": 1, "surname": "Torres Arizon", "title": "ing", "type": "standard"}
special view data:  {"banner": "background-blur-clean-531880-1.jpg", "basedOn": 0, "date_limit": "02-04-2022", "description": "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas Letraset, las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.¿Por qué lo usamos?Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo Contenido aquí, contenido aquí. Estos textos hacen parecerlo un español que se puede leer. Muchos paquetes de autoedición y editores de páginas web usan el Lorem Ipsum como su texto por defecto, y al hacer una búsqueda de Lorem Ipsum va a dar por resultado muchos sitios web que usan este texto si se encuentran en estado de desarrollo. Muchas versiones han evolucionado a través de los años, algunas veces por accidente, otras veces a propósito (por ejemplo insertándole humor y cosas por el estilo).", "description_doctor": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like.", "id": 11, "id_doctor": 2, "id_procedure": 8, "img": "1157-41709.jpg", "name": "Fernando", "name_category": "OTOPLASTIA", "price": 12000000, "price_offer": 5000000, "rating": 50, "specialName": "11 befaroplastia", "stars": 0, "status": 1, "surname": "Torres Arizon", "title": "ing", "type": "standard"}
*/

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color_screen }}>
      <ScrollView
        scrollEventThrottle={16}
        horizontal={false}
        //stickyHeaderIndices={[4]}
        onScroll={event => {
          const y = event.nativeEvent.contentOffset.y;
          if (y >= 510) { setsticke(true) }
          else { setsticke(false) }
        }}
      >

      <TouchableOpacity
          onPress={() => setvertical(true)}
          style={{
            position: "absolute",
            top: 15,
            right: 15,
            zIndex: 999,
            backgroundColor: "rgba(255,255,255,0.25)",
            width: 35,
            height: 35,
            borderRadius: 35,
            justifyContent: "center",
            alignItems: "center"
          }}>
          <Icon name="more-vertical-outline" width={30} height={30} fill={color_white} />
        </TouchableOpacity>

        <Image source={{ uri: `${file_server1}/img/wellezy/specials/${data.banner}` }} style={styles.banner} />


        <View style={[styles.card, { top: -20 }]}>
          <Image
            source={{ uri: data.img }}
            style={styles.avatar} />
          {data.type === "premium" &&
            <View style={styles.premium}>
              <Text style={styles.premiumText}>{data.type}</Text>
            </View>
          }
          <View style={[styles.docWrap, { marginTop: data.type === "premium" ? 40 : 20 }]}>
            <Text style={styles.docName}>{data.title}. {data.name} {data.surname}</Text>
          </View>
          <ScoreStars stars={data.stars} size={25} color={color_star} />
        </View>
















        <View style={[styles.card, { marginBottom: 80 }]}>
          <Text style={{
            marginBottom: 15,
            textTransform: "capitalize",
            fontWeight: "bold",
            fontSize: 20,
            textAlign: "center"
          }}>{data.specialName}</Text>
          <View style={{ alignSelf: "flex-start", flexDirection: "column", marginBottom: 20 }}>
            <Text style={styles.specialsTotal}>{currencyFormat("$", data.price)}</Text>
            <Text style={styles.specialsPriceOffer}>{currencyFormat("$", data.price_offer)}</Text>
            <Text>Vence: {data.date_limit}</Text>
          </View>
          <View style={{ position: "absolute", top: 60, right: 10 }}>
            {Offer(data.price, data.price_offer, 20)}
          </View>
          {!Load &&
            <Text style={{ textAlign: "justify" }}>
              {!Load && displayDescription === true ?
                data.description
                :
                data.description.length > 174 ?
                  ((data.description.substring(0, 174 - 3)) + '...')
                  :
                  data.description
              }
            </Text>
          }
          <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
            <TouchableOpacity
              onPress={() => setdisplayDescription(!displayDescription)}
              style={styles.ViewBtn}>
              <Text style={styles.ViewBtnText}>
                {displayDescription === true ? "ver menos" : "ver más"}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.aboutPocedure}
            onPress={() => goToScreen("Process", data.id_procedure)}
          >
            <Text style={styles.aboutPoceduretext1}>acerca de</Text>
            <Text style={styles.aboutPoceduretext2}>{data.name_category}</Text>
          </TouchableOpacity>


   
          {  items.length !== 0 &&
            <View style={{ width: "100%" }}>
              <Text style={{ fontSize: 16 }}>Incluye:</Text>
              {items.map((i, key) => {
                return (
                  <ITEM key={key} data={i} />
                )
              })}
            </View>
}


          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}> solicitar</Text>
          </TouchableOpacity>
        </View>
 




      </ScrollView>


      {sticke === true &&
        <View style={{
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          padding: 15,
          position: "absolute",
          zIndex: 99999999999,
          width: "100%",
          backgroundColor: color_white,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 6,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: "700"
          }}>{data.specialName}</Text>
          <View style={{
            borderTopColor: color_grey_light,
            borderTopWidth:0.5,
            marginTop:5,
            paddingTop:8,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around"
          }}>
            <Text>
              <Text style={{ textDecorationStyle: 'solid', fontSize: 14, color: color_grey_half }}>antes: </Text>
              <Text style={{ textDecorationStyle: 'solid', fontSize: 14, color: "red", textDecorationLine: 'line-through', }}>{currencyFormat("$", data.price)}</Text>
            </Text>
            <Text>
              <Text style={{ textDecorationStyle: 'solid', fontSize: 14, color: color_grey_half }}> Ahora: </Text>
              <Text style={{ textDecorationStyle: 'solid', fontSize: 14, color: color_grey_dark }}>{currencyFormat("$", data.price_offer)}</Text>
            </Text>
          </View>
        </View>
      }
      <Menu props={props} option={0} />
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

export default SpecialView;

const styles = StyleSheet.create({
  banner: {
    backgroundColor: color_grey_light,
    width: windowWidth,
    height: windowWidth / 1.5,
    resizeMode: "cover",
    flex: 1,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  card: {
    backgroundColor: color_white,
    width: "90%",
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
  },


  avatar: {
    backgroundColor:"red",
    borderRadius: 120,
    width: 120,
    height: 120,
    resizeMode: "cover",
    flex: 1,
  },
  premium: {
    position: "absolute",
    zIndex: 999,
    top: 130,
    height: 30,
    width: 180,
    backgroundColor: color_white,
    borderTopColor: color_fifth,
    borderTopWidth: 2,
    borderBottomColor: color_fifth,
    borderBottomWidth: 2,
  },
  premiumText: {
    lineHeight: 25,
    textAlign: "center",
    color: color_fifth,
    fontWeight: "bold",
    textTransform: "uppercase"
  },
  docWrap: {
    flexDirection: "row"
  },
  docName: {
    textTransform: "capitalize"
  },

  specialsTotal: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    fontWeight: "bold",
    fontSize: 16,
    color: "red"
  },
  specialsPriceOffer: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold"
  },
  aboutPocedure: {
    flexDirection: "column",
    marginVertical: 20
  },
  aboutPoceduretext1: {
    textAlign: "center"
  },
  aboutPoceduretext2: {
    textAlign: "center"
  },
  btn: {
    marginTop: 20,
    backgroundColor: color_primary,
    width: "60%",
    borderRadius: 12,
    paddingVertical: 8
  },
  btnText: {
    color: color_white,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "uppercase"
  },
  item: {
    paddingVertical: 10,
    flexDirection: "row",
    width: "100%",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  itemL: {
    width: "10%",
    justifyContent: "center"
  },
  itemR: {
    paddingLeft: 10,
    flexDirection: "column",
    width: "90%"
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 16
  },
  itemDescription: {
    fontSize: 14,
    textAlign: "justify"
  },
  ViewBtn: {
    borderColor: "silver",
    borderWidth: 0.5,
    borderRadius: 12,
    maxWidth: 100,
    flexDirection: "row",
    paddingHorizontal: 10,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    marginTop: 5
  },
  ViewBtnText: {
    color: "silver",
  }
})






const ITEM = ({ data }) => {

  const [open, setopen] = useState(false);
  return (
    <View style={styles.item}>
      <View style={styles.itemL}>
        <Icon name="gift-outline" width={30} height={30} fill={color_star} />
      </View>
      <View style={styles.itemR}>
        <Text style={styles.itemName}>{data.name}</Text>
        <Text style={styles.itemDescription}>
          {open === true ?
            data.description
            :
            data.description.length > 83 ?
              ((data.description.substring(0, 83 - 3)) + '...')
              :
              data.description
          }
        </Text>
        {
          data.description.length > 83 &&
          <TouchableOpacity onPress={() => setopen(!open)} style={styles.ViewBtn}>
            <Text style={styles.ViewBtnText}>
              {open === true ? "ver menos" : "ver más"}
            </Text>
            <Icon name={open === true ? 'arrow-ios-downward-outline' : 'arrow-ios-forward-outline'} width={20} height={20} fill={"silver"} />
          </TouchableOpacity>
        }
      </View>
    </View >
  )
}
