import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { DayAttendanceStatusEnum } from '../../home/domain/enums/dayAttendanceStatus.enum';

// Definir las props esperadas para el componente
interface StatusBadgeProps {
  status: DayAttendanceStatusEnum;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  if (!status) {
    console.error("Status is required!");
    return null;
  }
  const colors: { [key in DayAttendanceStatusEnum]: string } = {
    Pendiente: '#3F51B5',
    Iniciado: '#f8da45',
    Completado: '#24b550',
  };

  return (
    <View style={[styles.status, { backgroundColor: colors[status] }]}>
      <Text style={styles.statusText}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  status: {
    padding: 7.5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
  } as ViewStyle,
  statusText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  } as TextStyle,
});