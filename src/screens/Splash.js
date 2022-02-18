import React, {useState, useRef, useEffect } from 'react';
import { Animated, Text, View, StyleSheet,Image,StatusBar, Dimensions } from 'react-native';


const Animation = (props) => {
  const MoveToLeft = useRef(new Animated.Value(250)).current
  React.useEffect(() => {
    Animated.timing(
      MoveToLeft,
      {
        toValue: 0,
        duration: 1000,
      },
    ).start();
  }, [MoveToLeft])
  return (
    <Animated.View
      style={{
        ...props.style,
        transform: [{ translateX: MoveToLeft }]
      }}
    >
      {props.children}
    </Animated.View>
  );
}


function Index(props) {
  const [loaded, setLoaded] = useState(false);
  return (
    <View style={styles.container}>
    <StatusBar backgroundColor="transparent" translucent />
    <Image style={styles.splash_top}
      source={require("../images/splash_top.png")}
    />
    <View style={{ width: "100%", height: "100%", }}>
      <View style={{ position: "absolute", width: "100%", alignItems: "center", alignContent: "center", }}>
        <Image style={styles.icon} source={require("../images/logoanimated3.png")} />
      </View>
      <Animation style={{ position: "absolute", width: "100%", alignItems: "center", alignContent: "center", }}>
        <Image style={styles.icon} source={require("../images/logoanimated2.png")} />
      </Animation>
      <View style={{ position: "absolute", width: "100%", alignItems: "center", alignContent: "center", }}>
        <Image style={styles.icon} source={require("../images/logoanimated1.png")} />
      </View>
    </View>
    <Image style={styles.splash_top}
      source={require("../images/abajo_3.png")}
    />
  </View> 
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#004074',
    flex: 1,
    alignItems: 'center',
    justifyContent: "space-evenly"
  },
  icon: {
    width: "80%",
    resizeMode: "contain"
  },
  splash_top: {
    width: "100%",
    resizeMode: "contain",
  },
  splash_bottom: {
    width: "100%",
    resizeMode: "contain",
  }
});

export default Index;