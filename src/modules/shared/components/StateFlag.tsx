import { View, StyleSheet } from 'react-native';


export const StateFlag = (state: any) => {
  return (
    <View style={styles.pending}>{state}</View>
  )
}

const styles = StyleSheet.create({
    pending: {
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 5,
        color: 'white'
    },
    inProgress: {

    },
    completed: {

    },
    canceled: {

    }
    //pendiente
    //en progreso
    //completado
    //cancelado
});
