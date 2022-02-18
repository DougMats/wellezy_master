import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { ActionSheet } from 'react-native-cross-actionsheet'

function FilterMaximus(props) {
  const [ListF, setListF] = useState(props.F);
  const [Father, setFather] = useState(null)
  const [Fathert, setFathert] = useState(props.Ft)
  const [OptionsF, setOptionsF] = useState(false)
  const [ServicesFatherSelected, setServicesFatherSelected] = useState(props.Sr);

  useEffect(() => {
    let options = []
    props.F.map((i) => { options.push({ text: i.name, onPress: () => { setFather(i.name), setFathert(i.name) } }) })
    setOptionsF(options);
  }, [ListF]);


  function ShowF() {
    ActionSheet.options({
      options: OptionsF,
      cancel: { onPress: () => console.log('cancel') }
    })
  }





















  const [ListCh, setListCh] = useState(props.Ch);
  const [Child, setChild] = useState(null)
  const [Childt, setChildt] = useState(props.Cht)
  const [OptionsCh, setOptionsCh] = useState(false)

  useEffect(() => {
    let options = []
    props.Ch.map((i) => { options.push({ text: i.name, onPress: () => { setChild(i.name), setChildt(i.name) } }) })
    setOptionsCh(options);
  }, [ListCh]);

  function ShowCh() {
    ActionSheet.options({
      options: OptionsCh,
      cancel: { onPress: () => console.log('cancel') }
    })
  }

  useEffect(() => {
    if(Father !== null){
      console.log("set A");
    props.GetFilterA(Father)}
  }, [Father]);


  useEffect(() => {
    if (Child !== null) {
      console.log("set B");
      props.GetFilterB(Child);
    }
  }, [Child]);
  




  return (
    <View style={{ height: 50, marginBottom: 10, backgroundColor: "white", width: "90%", borderRadius: 24, overflow: "hidden", flexDirection: "row",
    justifyContent:"space-around"
    
    }}>



      <TouchableOpacity onPress={() => ShowF()} style={{ minWidth:"20%", maxWidth: "33%", flexDirection: "row", justifyContent: "center", paddingTop: 15 }}>
        <Icon name='arrow-ios-downward-outline' width={20} height={20} fill="#777" />
        <Text style={{ color: "#777", marginLeft:2, fontSize:12 }}>{Fathert}</Text>
      </TouchableOpacity>




      <TouchableOpacity onPress={() => ShowCh()} style={{ minWidth:"20%", maxWidth: "34%", flexDirection: "row", justifyContent: "center", paddingTop: 15,
    borderLeftColor:"#ccc", borderLeftWidth:0.5,  borderRightColor:"#ccc", borderRightWidth:0.5
    }}>
        <Icon name='arrow-ios-downward-outline' width={20} height={20} fill="#777" />
        <Text style={{ color: "#777", marginLeft:2, fontSize:12 }}>{Childt}</Text>
      </TouchableOpacity>
     
      <TouchableOpacity onPress={() => ShowCh()} style={{ minWidth:"20%", maxWidth: "34%", flexDirection: "row", justifyContent: "center", paddingTop: 15 }}>
        <Icon name='arrow-ios-downward-outline' width={20} height={20} fill="#777" />
        <Text style={{ color: "#777", marginLeft:2, fontSize:12 }}>{ServicesFatherSelected}</Text>
      </TouchableOpacity>
     
{/* 
   <TouchableOpacity style={{ width: "33%", backgroundColor: "#00A7B4", justifyContent: "center", alignItems: "center", alignContent: "center" }}>
        <Icon name={props.icon} width={30} height={30} fill="#fff" />
      </TouchableOpacity>  */}
    </View>
  );
}
export default FilterMaximus;