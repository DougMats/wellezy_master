import React from 'react'
import { SafeAreaView, Text } from 'react-native'
import UserContext from '../../../contexts/UserContext'
import Menu from '../../components/generic/Menu';
import ProfileClient from './ProfileClient';
import ProfileMedic from './ProfileMedic';

function Profile(props) {
  const { userDetails, setUserDetails } = React.useContext(UserContext);
  return (
    <SafeAreaView style={{flex:1,}}>
        {/* {userDetails.rol === "client" && <ProfileClient {...props} />} */}
        {userDetails.rol === "client" && <ProfileClient {...props} />}
        {userDetails.rol === "medic" && <ProfileMedic {...props} />}
      <Menu props={props} option={2} />
    </SafeAreaView>
  )
}
export default Profile;