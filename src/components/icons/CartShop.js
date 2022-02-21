import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { Icon } from 'react-native-eva-icons'
import { cartShop } from '../../services/connection.js';

function Index(props) {
  const [count, setcount] = useState(0);
  useEffect(() => {
    async function get() {
      const res = await cartShop.getCartShop(props.user)
      console.log("res: ", res)

      setcount(res.length)
    }
    get()
  }, [props]);

  return (
    <TouchableOpacity
    onPress={()=>props.goToScreen("PaymentCart",null)}
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
      <Icon name={"shopping-cart-outline"} width={30} height={30} fill={"silver"} />
    </TouchableOpacity>
  )
}

export default React.memo(Index);