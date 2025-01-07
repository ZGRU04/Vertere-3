import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

import { globalStyle } from '../../../../themes/GlobalStyles'
import { ButtonModeEnum } from '../../../../themes/buttons/enums/ButtonMode.enum'
import { papersButtonVariables } from '../../../../themes/buttons/globalStyleButtons'
import { StateFlag } from '../../../shared/components/StateFlag'

export const HomeScreen = () => {

  const [dateTurn, setDateTurn] = useState();
  const [initHour, setInitHour] = useState();
  const [finishHour, setFinishHour] = useState();
  const [turnState, setTurnState] = useState();

  const submit = () => {
    console.log('Actibar iniciar horario')
  }

  return (
    <View style={globalStyle.container} >
      <View style={styles.spaceBeetween}>
        <View style={styles.infoContainer}>
          <View style={styles.row}>
            <Text style={styles.label} >Fecha de siguiente turno:</Text>
            <Text style={styles.value} >{ dateTurn ? dateTurn : '--' }</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label} >Hora de inicio:</Text>
            <Text style={styles.value} >{ initHour ? initHour : '--' }</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label} >Hora fin de turno:</Text>
            <Text style={styles.value} >{ finishHour ? finishHour : '--' }</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label} >Estado de turno:</Text>
            <Text style={styles.value} >{ turnState ? turnState : '--' }</Text>
          </View>
        </View>
        <View>
          <Button
            mode={ButtonModeEnum.CONTAINED}
            labelStyle={{color: papersButtonVariables.primaryButton.fontColor}}
            theme={{ colors: papersButtonVariables.primaryButton }}
            onPress={submit}
          >
            Iniciar turno de trabajo
          </Button>
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
    marginBottom: 15,
    alignItems: 'baseline'
  },

  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    minWidth: 220
  },

  value: {
    fontSize: 16,
    marginBottom: 20,
  },

  spaceBeetween: {
    justifyContent: 'space-between'
  }
});