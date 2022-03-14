import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import IconSvg from '../../svg/icon_svg.js'
import { notifications } from '../../services/connection.js';

function Index(props) {
  const [count, setcount] = useState(0);
  useEffect(() => {
    async function get() {
      const res = await notifications.GetNews(props.lang, props.user, props.rol)
      const total = res.filter(obj => obj.view === 0).length
      setcount(total)
    }
    get()
  }, [props]);


  return (
    <TouchableOpacity
    onPress={()=>props.goToScreen('Profile', 5 )}
      style={{
        width: 35,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
      }}>
      {count > 0 &&
        <View style={{
          backgroundColor: "red",
          width: 15,
          height: 15,
          borderRadius: 15,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          zIndex: 9,
          top: -5,
          right: 0
        }}>
          <Text style={{
            color: "white", fontSize: 10, fontWeight: "bold", lineHeight: 12
          }}>{count}</Text>
        </View>
      }
      <IconSvg name={"bell-outline"} width={30} height={30} fill={"silver"} />
    </TouchableOpacity>
  )
}

export default React.memo(Index);