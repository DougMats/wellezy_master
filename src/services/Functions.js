import React from 'react';
import { Text } from 'react-native';

function currencyFormat(coin, num) {
  return coin + " " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function zfill(number, width) {
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

const offer = (price, offer, size) => {
  let res = ((offer * 100) / price) - 100
  let sizeText = size
  let sizeCircle = size * 2.5
  let sizeLine = sizeCircle

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

export { zfill, currencyFormat, offer };