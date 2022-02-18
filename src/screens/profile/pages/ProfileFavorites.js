import React, {useState} from 'react'
import {StyleSheet, View, Text} from 'react-native'

function ProfileFavorites(props){
const [data, setdata] = useState(props.data);
return(
  <View>
    <Text>favoritos</Text>
  </View>
)
}
export default ProfileFavorites;