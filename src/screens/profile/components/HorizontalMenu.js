import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-eva-icons';
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
            style={{ width: WIDTH, alignItems: "center", justifyContent: "center",
              borderBottomColor: props.Page === i.value ? props.colorActive : '',
              borderBottomWidth: props.Page === i.value ? 1 : 0 }}>
            <Icon name={i.name} height={25} width={25}
              fill={props.Page === i.value ? props.colorActive : props.color}
            />
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
export default React.memo(HorizontalMenu);