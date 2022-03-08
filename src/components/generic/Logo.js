import React, { useState, useEffect } from 'react'
import { View, Image, Text } from 'react-native'
import { color_white } from '../../styles/Colors.js'


function Logo() {
  const [itsShow, setitsShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setitsShow(false)
    }, 5000);
  }, []);

  if (itsShow === true) {
    return (
      <View
        style={{
          marginBottom: -5,
          backgroundColor: color_white,
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden"
        }}>
        <View style={{ width: "100%", height: 80, }}>
          <Image source={require('../../images/logoanimated1.png')} style={{ width: null, height: null, flex: 1, resizeMode: "center" }} />
        </View>
      </View>
    )
  }
  else {
    return false;
  }
}

export default Logo;