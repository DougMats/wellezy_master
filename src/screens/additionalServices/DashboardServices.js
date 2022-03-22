import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    list: state.servicesReducer.list
  }
}

function DashboardServices({ list, navigation }) {
  const { t, i18n } = useTranslation();

    let data = list[0]
    navigation.navigate(data.screen, { randomCode: Math.random(), data })

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
      <Text>Loading...</Text>
    </SafeAreaView>
  )
}

export default connect(mapStateToProps, null)(DashboardServices);