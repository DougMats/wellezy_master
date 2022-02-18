import React, { useState, useEffect } from 'react';
import { Switch, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-eva-icons';

function FilterGolden(props) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  useEffect(() => { props.function(isEnabled); }, [isEnabled]);

  let Width
  if (props.width) {
    Width = props.width
  }
  else {
    Width = "90%"
  }

  return (
    <View style={{  justifyContent: "space-between", height: 60, marginBottom: 0, backgroundColor: "white", width: Width, borderRadius: 12, padding: 10, flexDirection: "row" }}>
     
      <View style={{ marginLeft: 5, width: 30, justifyContent: "center" }}>
        <Icon name={props.icon} width={25} height={25} fill="orange" />
      </View>

      <View style={{ width: "60%", flexDirection: "row", }}>
        <Text style={{ lineHeight: 40, color: "orange", fontWeight: "bold", fontSize: 16 }}>
          {props.textLeft}
        </Text>
        <Text style={{ left: 10, lineHeight: 40, color: "orange", fontSize: 16 }}>
          {props.textRight}
        </Text>
      </View>

      <View style={{ height: 30, top: 5, width: 30, backgroundColor: "#eee", borderRadius: 30, alignContent: "center", alignItems: "center", justifyContent: "center" }}>
        <Switch
          trackColor={{ false: "#eee", true: "#eee" }}
          thumbColor={isEnabled ? "orange" : "#fff"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
}
export default FilterGolden;