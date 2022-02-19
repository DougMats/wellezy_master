import React from 'react'
import { StatusBar, TouchableOpacity, View, Image, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-eva-icons';
import styles from '../../../styles/styles.js'
import { file_server1 } from '../.././../../Env.js'

function Head(props) {
  return (
    <>
      <StatusBar backgroundColor={props.color_secondary} barStyle='light-content' />
      <LinearGradient style={styles.profileHeader} colors={[props.color_secondary, props.color_primary, props.color_primary]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
      <TouchableOpacity onPress={() => props.back()} style={{...styles.profileHeaderBtn, left: 20}}>
          <Icon name="arrow-ios-back-outline" width={30} height={30} fill={props.color_white} />
        </TouchableOpacity>
        
             <TouchableOpacity onPress={() => props.setvertical(true)} style={{...styles.profileHeaderBtn, right: 20}}>
          <Icon name="more-vertical" width={30} height={30} fill={props.color_white} />
        </TouchableOpacity>

        <View style={styles.profileHeaderAvatar}>
          <Image style={styles.profileHeaderAvatarImg} source={{ uri: `${file_server1}/img/wellezy/users/${props.user.photo_profile}` }} />
        </View>
        <View style={styles.profileHeaderText}>
          <Text style={styles.profileHeaderTextBig}>{props.user.name} {props.user.surname}</Text>
          <Text style={styles.profileHeaderTextSmall}>{props.user.email}</Text>
        </View> 
      </LinearGradient>
    </>
  )
}

export default React.memo(Head);