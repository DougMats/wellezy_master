import React, { useState, useEffect } from 'react';
import { Switch, View, Text } from 'react-native';
import { Icon } from 'react-native-eva-icons';

function FilterSilver(props) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  useEffect(() => {
    props.function(isEnabled)
  }, [isEnabled]);

  let Width
  if (props.width) {
    Width = props.width
  }
  else {
    Width = "90%"
  }
  return (
    <View
      style={{
        height: 60,
        marginBottom: 10,
        backgroundColor: "rgba(0,167,180,0.1)",
        width: Width,
        borderRadius: 12,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between"
      }}>

      <View style={{ marginLeft: 5, width: 30, justifyContent: "center" }}>
        <Icon name={props.icon} width={25} height={25} fill="#00A7B4" />
      </View>

      <View style={{ width: "55%", flexDirection: "column", justifyContent: "center" }}>
        <Text style={{ color: "#00A7B4", fontSize: 10 }}>
          {props.textUp}
        </Text>
        <Text style={{ color: "#00A7B4", fontWeight: "bold", fontSize: 14 }}>
          {props.textDown}
        </Text>
      </View>

      <View style={{ height: 30, top: 5, width: 30, backgroundColor: "white", borderRadius: 30, alignContent: "center", alignItems: "center", justifyContent: "center" }}>
        <Switch
          trackColor={{ false: "#FFF", true: "#FFF" }}
          thumbColor={isEnabled ? "#00A7B4" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
}
export default FilterSilver;