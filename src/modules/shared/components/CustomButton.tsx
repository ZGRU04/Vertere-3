import React from "react";
import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";

type CustomButtonProps = {
  loading?: boolean;
  disabled?: boolean;
  onPress: () => void;
  children: React.ReactNode;
};

export const CustomButton: React.FC<CustomButtonProps> = ({
  loading = false,
  disabled = false,
  onPress,
  children,
}) => {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      loading={loading}
      disabled={disabled}
      style={[
        styles.button,
        disabled ? styles.disabledButton : styles.enabledButton,
      ]}
      labelStyle={disabled ? styles.disabledLabel : styles.enabledLabel}
    >
      {children}
    </Button>
  );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 8, // Bordes redondeados
      },
      enabledButton: {
        backgroundColor: '#9e0c14', // Color primario
      },
      disabledButton: {
        backgroundColor: "rgba(158, 12, 20, 0.6)", // Color primario con opacidad
      },
      enabledLabel: {
        color: "#ffffff", // Texto blanco
      },
      disabledLabel: {
        color: "rgba(255, 255, 255, 0.6)", // Texto blanco con opacidad
    },
});