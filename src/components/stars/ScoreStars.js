import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-eva-icons';
function ScoreStars(props) {
  return (
    <View style={{ flexDirection: "row"}}>
      <Icon name={props.stars >= 1.00 ? 'star':'star-outline'} width={props.size} height={props.size} fill={props.color} />
      <Icon name={props.stars >= 2.0 ? 'star':'star-outline'} width={props.size} height={props.size} fill={props.color} />
      <Icon name={props.stars >= 3.00 ? 'star':'star-outline'} width={props.size} height={props.size} fill={props.color} />
      <Icon name={props.stars >= 4.00 ? 'star':'star-outline'} width={props.size} height={props.size} fill={props.color} />
      <Icon name={props.stars >= 4.75 ? 'star':'star-outline'} width={props.size} height={props.size} fill={props.color} />
      <Text style={{color:props.color, fontSize: props.size / 2, top: props.size / 10 }}> ({props.stars})</Text>
    </View>
  )
}

export default React.memo(ScoreStars);