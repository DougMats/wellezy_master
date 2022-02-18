import React, { useState, useContext, useEffect } from 'react'
import {
  // Clipboard,
  // ToastAndroid,
  // Platform,
  Dimensions, Image, TextInput, SafeAreaView, ScrollView, Text, View, TouchableOpacity, StatusBar, ActivityIndicator, StyleSheet, ImageBackground } from 'react-native'
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';

// // import CardExperiences from '../cards/CardExperiences';
// // import AfterBefore from '../cards/AfterBefore.js'
// // import Testimonials from '../cards/Testimonials.js'
// // import CardVideos from '../cards/CardVideos.js';

import {
  color_primary,
  color_secondary,
  color_tertiary,
  color_white,
  color_white_a,
  color_black,
  color_black_a,
  color_grey_light,
  color_grey_half,
  color_grey_dark,
  color_transparent,
  color_screen,
  color_fifth,
} from '../../styles/Colors.js'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function CardShare(props){
  const { t, i18n } = useTranslation();
  const maxWidth = ((windowWidth * 95) / 100) / 10
  const [menu, setmenu] = useState(false);



  // const socket = React.useContext(PostsContext)
  // const [posts, setPosts] = React.useState([])
  // const [shareId, setShareId] = React.useState(0)
  // const [newPost, setNewPost] = React.useState({})
  // const [displayOptions, setDisplayOptions] = React.useState(false)
  // const [shareItem, setShareItem] = React.useState(false)
  // const [Load, setLoad] = useState(false);
  // const [Load2, setLoad2] = useState(false);

  // React.useEffect(() => {
  //   setLoad(true)
  //   console.log(base_url(postsServer, `api/get/posts/7`))
  //   axios.get(base_url(postsServer, `api/get/posts/7`)).then((response) => {
  //     setPosts(response.data)
  //     setLoad(false)
  //   }).then(() => {
  //     //. . . 
  //   }).catch((e) => {
  //     console.log(e)
  //   })
  //   setTimeout(() => {
  //     StatusBar.setHidden(true);
  //   }, 3000)
  // }, [])

  // useEffect(() => {
  //   setPosts([newPost, ...posts])
  // }, [newPost])

  // useEffect(() => {
  //   console.log("compartiendo....")
  //   if (shareId !== 0) {
  //     console.log('Downloading base64 image from : ')
  //     console.log(base_url(postsServer, `api/get/post/${shareId}`))
  //     axios.get(base_url(postsServer, `api/get/post/${shareId}`)).then((response) => {
  //       const icon = 'https://i.stack.imgur.com/68g6v.jpg'
  //       const options = Platform.select({
  //         ios: {
  //           activityItemSources: [
  //             { // For using custom icon instead of default text icon at share preview when sharing with message.
  //               placeholderItem: {
  //                 type: 'url',
  //                 content: icon
  //               },
  //               item: {
  //                 default: {
  //                   type: 'text',
  //                   content: `${response.data.post} ${response.data.base_64}`
  //                 },
  //               },
  //               linkMetadata: {
  //                 title: response.data.post,
  //                 icon: icon
  //               }
  //             },
  //           ],
  //         },
  //         default: {
  //           title: 'Share',
  //           message: response.data.post,
  //           url: response.data.base_64
  //         },
  //       });
  //       Share.open(options);
  //       setDisplayOptions(false)
  //     }).then(() => {
  //       console.log('Compartido con exito', shareId)
  //       setSharedPost()
  //       console.log(userDetails)
  //     }).catch((e) => {
  //       console.log(e)
  //       console.log('No compartido o cancelado por el usuario')
  //     })
  //   }
  //   setLoad2(false)
  // }, [shareId])

  // const openPostsOptions = (item) => {
  //   setShareItem(item)
  //   setDisplayOptions(true)
  // }

  // async function share(item) {
  //   setLoad2(true)
  //   console.log("share", item)
  //   if (item != false) {
  //     setShareItem(item)
  //     setShareId(item._id)
  //   }
  // }

  // useEffect(() => {
  //   console.log("set share Item")
  // }, [shareItem]);

  // const copyText = (props) => {
  //   Clipboard.setString(props.post)
  //   ToastAndroid.showWithGravity(
  //     "Texto copiado al porta papeles",
  //     ToastAndroid.SHORT,
  //     ToastAndroid.CENTER
  //   );
  //   setDisplayOptions(false)
  // }

  // const setSharedPost = async () => {
  //   console.log("aja")
  //   const query_share = `${server1}/set-shared-post`
  //   const data = {
  //     post_id: shareId,
  //     user_id: userDetails.id_client
  //   }
  //   console.log('Consultando datos de : ', query_share)
  //   console.log(data)
  //   let result
  //   try {
  //     result = await axios.post(query_share, data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // const PostOptions = () => {
  //   return (
  //     <View style={{ flex: 1, position: 'absolute', zIndex: 100, flexDirection: 'row', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
  //       <BlurView style={styles.blurView} reducedTransparencyFallbackColor="gray" blurType="light" blurAmount={10} />
  //       <TouchableOpacity style={styles.buttonContainer} onPress={() => share()}>
  //         <Icon name={'share-outline'} width={20} height={20} fill='white' />
  //       </TouchableOpacity>
  //       <TouchableOpacity style={styles.buttonContainer} onPress={() => copyText()}>
  //         <Icon name={'copy-outline'} width={20} height={20} fill='white' />
  //       </TouchableOpacity>
  //       <TouchableOpacity style={styles.buttonContainer} onPress={() => setDisplayOptions(false)}>
  //         <Icon name={'close-circle-outline'} width={20} height={20} fill='white' />
  //       </TouchableOpacity>
  //     </View>
  //   )
  // }





  //_______________________________________________________________//}

  return (
    <View style={styles.card}>
      {menu === true &&
        <TouchableOpacity onPress={() => setmenu(false)} style={{
          position: "absolute",
          zIndex: 999,
          backgroundColor: "rgba(0,0,0,0.5)",
          width: "100%",
          height: "100%"
          }}>
          <View style={{
            position: "absolute",
            zIndex: 9,
            top: 0,
            right: 0,
            flexDirection: "column",
            backgroundColor: color_white,
            paddingTop: 25,
            paddingBottom:10,
            paddingRight: 35,
            borderBottomLeftRadius:12
          }}>
            <TouchableOpacity style={{
              position: "absolute",
              top: 5,
              right: 5
              }}
              onPress={() => setmenu(false)}>
              <Icon name={"close-outline"} width={25} height={25} fill={color_grey_half} />
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingHorizontal: 10, flexDirection: "row" }}><Icon name={"trash-2-outline"} width={25} height={25} fill={color_grey_half} /><Text style={{ marginLeft: 5 }}>eliminar</Text></TouchableOpacity>
            <TouchableOpacity style={{ paddingHorizontal: 10, flexDirection: "row" }}><Icon name={"edit-outline"} width={25} height={25} fill={color_grey_half} /><Text style={{ marginLeft: 5 }}>editar</Text></TouchableOpacity>
          </View>
        </TouchableOpacity>
      }

      <View style={styles.head}>
        <View style={{ paddingVertical: 5, justifyContent: "center", alignItems: "center", width: maxWidth * 1.5 }}>
          <View style={{ overflow: "hidden", backgroundColor: "#c9c9c9", width: maxWidth * 1, height: maxWidth * 1, borderRadius: maxWidth }}>
            <Image style={{ width: null, height: null, flex: 1, resizeMode: "cover" }} source={{ uri: props.userImg }} />
          </View>
        </View>
        <View style={{ justifyContent: "center", width: maxWidth * 7.5 }}>
          <Text style={{ fontSize: 16 }}>{props.userName} {props.userSurname}</Text>
          <Text style={{ fontSize: 12 }}>{props.date}</Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center", width: maxWidth }}>
          {/* <TouchableOpacity onPress={() => setmenu(true)}>
            <Icon name={"more-vertical-outline"} width={25} height={25} fill={color_grey_half} />
          </TouchableOpacity> */}
        </View>
      </View>

      <View style={{...styles.body}}>
        {props.body}
      </View>

      <View style={styles.foot}>
        <TouchableOpacity style={styles.btnFoot}>
          <Icon name={"star-outline"} width={25} height={25} fill={color_grey_half} />
          <Text style={styles.btnFootText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnFoot}>
          <Icon name={"edit-outline"} width={25} height={25} fill={color_grey_half} />
          <Text style={styles.btnFootText}>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnFoot}>
          <Icon name={"share-outline"} width={25} height={25} fill={color_grey_half} />
          <Text style={styles.btnFootText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}




const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    marginBottom: 10,
    alignSelf: "center",
    backgroundColor: color_white,
    width: "95%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

    borderRadius: 8,
    flexDirection: "column"
  },

  head: {
    flexDirection: "row",
    borderBottomColor: color_grey_light,
    borderBottomWidth:0.5
  },

  body: {},

  foot: {
    width: "90%",
    alignSelf: "center",
    borderTopColor: color_grey_light,
    borderTopWidth: 1,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  btnFoot: {
    flexDirection: "row",
    width: "30%",
    justifyContent: "center",
    alignItems: "center"
  },

  btnFootText: {
    color: color_grey_half,
    marginLeft: 5,
    fontSize: 14,
    lineHeight: 20
  }
});

export default React.memo(CardShare);