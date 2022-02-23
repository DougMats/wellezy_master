import React from 'react';
import { Text } from 'react-native';
import { showLocation } from 'react-native-map-link'

function zfill(number=0, width=0) {
  var numberOutput = Math.abs(number);
  var length = number.toString().length;
  var zero = "0";
  if (width <= length) {
    if (number < 0) {
      return ("-" + numberOutput.toString());
    } else {
      return numberOutput.toString();
    }
  } else {
    if (number < 0) {
      return ("-" + (zero.repeat(width - length)) + numberOutput.toString());
    } else {
      return ((zero.repeat(width - length)) + numberOutput.toString());
    }
  }
}


function GetDiference(dias, horas) {
  const time = new Date();
  let response, year, month, day, hour, minute, second, Anio, mes, dia, hora, minu, segun, futureD, futureH, dif, tree1, tree2
  year = time.getFullYear()
  month = time.getMonth() + 1;
  day = time.getDate();
  hour = time.getHours()
  minute = time.getMinutes()
  second = time.getSeconds()
  futureD = dias.split("-")
  futureH = horas.split(":")
  Anio = futureD[2]
  mes = futureD[1]
  dia = futureD[0]
  hora = futureH[0]
  minu = futureH[1]
  segun = futureH[2]
  tree1 = new Date(Anio, mes, dia, hora, minu, segun);
  tree2 = new Date(year, month, day, hour, minute, second);
  dif = tree1 - tree2
  response = dif / 1000
  return response
}



function GetDiference2(dias, horas) {
  const time = new Date();
  let response, year, month, day, hour, minute, second, Anio, mes, dia, hora, minu, segun, futureD, futureH, dif, tree1, tree2
  year = time.getFullYear()
  month = time.getMonth() + 1;
  day = time.getDate();
  hour = time.getHours()
  minute = time.getMinutes()
  second = time.getSeconds()
  futureD = dias.split("-")
  futureH = horas.split(":")
  Anio = futureD[2]
  mes = futureD[1]
  dia = futureD[0]
  hora = futureH[0]
  minu = futureH[1]
  segun = futureH[2]
  tree1 = new Date(Anio, mes, dia, hora, minu, segun);
  tree2 = new Date(year, month, day, hour, minute, second);
  dif = tree2 - tree1
  response = dif / 1000
  return response
}





//function currencyFormat(coin="$", num=0) {
  function currencyFormat(coin, num) {
  return coin+' '+num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}



function globalStatusValoration(p, s) {
  let Response 
  if (s === 4)               { Response = ["red",    0, "Cancelada", "cancel"]; }
  if (p === "si" && s === 2) { Response = ["green",  1, "Por realizar","successful"]; }
  if (p === "si" && s === 2) { Response = ["green",  1, "Por Realizar", "successful"]; }
  if (p === "no" && s === 1) { Response = ["green",  1, "Por Realizar", "successful"]; }
  if (s === 3)               { Response = ["blue",   2, "Realizada", "done"]; }
  if (p === "si" && s === 0) { Response = ["orange", 3, "Pendiente por historial clínico", "pendHC"]; }
  if (p === "no" && s === 0) { Response = ["orange", 3, "Pendiente por historial clínico","pendHC"]; }
  if (p === "si" && s === 1) { Response = ["orange", 4, "Pendiente por subir fotos", "pendPh"]; }
  return Response;
}



function letterCounter(text, max) {
  return ((text.length > max) ? ((text.substring(0, max - 3)) + '...') : text)
}


function Name(title, name, surname) {
   return title + ". " + name.split(" ")[0] + " " + surname.split(" ")[0];
 }


const Offer = (price, offer, size) => {
  
  let res = ((offer * 100) / price) - 100
  let sizeText = size
  let sizeCircle = size * 3.5
  let sizeLine = sizeCircle
  res = res.toFixed(1);

  if (res < 0) {
    return (
      <Text
        style={{
          backgroundColor: res > 0 ? "green" : "red",
          color: "white",
          width: sizeCircle,
          height: sizeCircle,
          textAlign: "center",
          lineHeight: sizeLine,
          borderRadius: sizeCircle,
          fontSize: sizeText,
          fontWeight: "bold"
        }}
      >
        {res}%
      </Text>
    )
  }
  else {
    return (<></>)
  }
}

const InitialsName = (userName, userSurname) =>{

  let Name = "";
  let Sur = "";
  if (userName !== null || userSurname !== "") {
    Name = userName.split(" ")
    Sur = userSurname.split(" ")
    let Names = Name[0].charAt(0) + "" + Sur[0].charAt(0);
    return Names;
  }
  else {
    return Name;
  }
}


const extractDate = (date, position)=>{
  return date.split(" ")[position];
}


 const GotoMaps =(lat, lon)=> {
    showLocation({
      latitude: lat,
      longitude: lon,
      googleForceLatLon: false,
    })
  }



export {GotoMaps,extractDate, InitialsName, Offer, Name, GetDiference2, GetDiference, zfill, currencyFormat, globalStatusValoration, letterCounter};






