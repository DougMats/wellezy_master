import React, { useState } from 'react'
import { View, Text, Image, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import { useTranslation } from 'react-i18next';
import ScoreStars from '../stars/ScoreStars.js';

function CardVideos(props) {
  const [FullScreen, setFullScreen] = useState(false);
  const url = "https://www.youtube.com/watch?v=XFkzRNyygfk";
  return (
    <View style={styles.wrap}>
      <View style={styles.container}>
        <View style={{
          height: 180, width: "100%", padding: 5, position: "relative", flex: 1
        }}>
          {Platform.OS === "android" &&
            <Video
              source={{ uri: url }}
              automaticallyWaitsToMinimizeStalling
              controls={true}
              fullscreen={false}
              resizeMode={"stretch"}
              paused={false}
              audioOnly={false}
              poster={props.data.poster}
              posterResizeMode={"stretch"}
              style={{
                flex: 1,
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "relative"
              }}
            />
          }
        </View>
        <View style={{ flexDirection: "column", borderTopColor: "#eec", borderTopWidth: 0.5 }}>
          <Text style={{fontSize:14, color:"#000", fontWeight:"bold"}}>{props.data.title}</Text>
          <Text style={{fontSize:12, color:"#555"}}>{props.data.date}</Text>
          <Text style={{fontSize:12, color:"#555"}}>{props.data.medic}</Text>
          <Text style={{fontSize:12, color:"#555"}}>{props.data.info}</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  wrap: {

    alignContent: "center", alignItems: "center", width: "100%", marginBottom:20
  },
  container: {
    backgroundColor: "white", width: "90%", borderRadius: 8, padding: 10
  }
})
export default CardVideos;