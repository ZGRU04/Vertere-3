import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { globalStyle } from '../../../../themes/GlobalStyles'

export const HomeScreen = () => {
  return (
    <View style={globalStyle.container} >
        <View style={styles.infoContainer}>
          <View style={styles.row}>
            <Text style={styles.label} >label:</Text>
            <Text style={styles.value} >value</Text>
          </View>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
  infoContainer: {
    marginTop: 50,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    minWidth: 150
  },
  value: {
    fontSize: 16,
    marginBottom: 20,
  },
});