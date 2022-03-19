import React, { useEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { services } from '../../services/connection.js';

function DashboardServices(props) {
  const { t, i18n } = useTranslation();

  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = 1 }

  useEffect(() => {
    get();
  }, [randomCode]);

  async function get() {
    try {
      const res = await services.servicesList(i18n.language)
        let data = res[0]
        props.navigation.navigate( data.screen, { randomCode: Math.random(), data })
    }
    catch (error) { }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
      <Text>Loading...</Text>
    </SafeAreaView>
  )
}
export default DashboardServices;