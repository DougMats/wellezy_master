import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import IconSvg from '../../../svg/icon_svg.js'
import styles from '../../../styles/styles.js'

function HorizontalMenu(props) {
  const data = props.list
  const WIDTH = props.maxWidth / props.list.length
  return (
    <View style={styles.profileMenuHorizontal}>
      {data.map((i, key) => {
        return (
          <TouchableOpacity
            key={key}
            onPress={() => props.setPage(i.value)}
            style={{
              width: WIDTH, alignItems: "center", justifyContent: "center",
              borderBottomColor: props.Page === i.value ? props.colorActive : '',
              borderBottomWidth: props.Page === i.value ? 1 : 0
            }}
          >


          {i.counter > 0 && 
            <View style={{ backgroundColor:"red", width:15, height:15, borderRadius:20, justifyContent:"center", alignItems:"center", position:"absolute", zIndex:9, top:-5, left:10}}>
              <Text style={{fontSize:10,fontWeight:"bold", color:"white" }}>{i.counter}</Text>
            </View>
            }

            <IconSvg
              name={props.Page === i.value ? i.icon : `${i.icon}-outline`}

              //name={i.icon}
              height={25}
              width={25}
              fill={props.Page === i.value ? props.colorActive : props.colorDisabled}
            />
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
export default React.memo(HorizontalMenu);