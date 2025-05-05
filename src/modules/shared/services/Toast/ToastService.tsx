import Toast, { ToastConfig } from "react-native-toast-message";
import { View, Text, StyleSheet } from "react-native";

export const ToastService = {
    successToast: (text: string, text2?: string): void => {
        Toast.show({
            type: 'success',
            text1: text,
            text2: text2
        });
    },

    warningToast: (text: string, text2?: string) => {
        Toast.show({
            type: 'info',
            text1: text,
            text2: text2
        });
    },

    errorToast: (text: string, text2?: string) => {
        Toast.show({
            type: 'error',
            text1: text,
            text2: text2
        });
    }
}

export const toastConfig: ToastConfig = {
    custom_success: ({ text1, text2 }) => (
        <View style={toastStyles.success}>
            <Text style={toastStyles.textTitle}>{text1}</Text>
            {text2 && <Text style={toastStyles.text}>{text2}</Text>}
        </View>
    ),
  
    custom_warning: ({ text1, text2 }) => (
        <View style={toastStyles.warning}>
            <Text style={toastStyles.textTitle}>{text1}</Text>
            {text2 && <Text style={toastStyles.text}>{text2}</Text>}
        </View>
    ),
  
    custom_error: ({ text1, text2 }) => (
        <View style={toastStyles.error}>
            <Text style={toastStyles.textTitle}>{text1}</Text>
            {text2 && <Text style={toastStyles.text}>{text2}</Text>}
        </View>
    ),
  };
  
  const toastStyles = StyleSheet.create({
    success: {
        width: "95%",
        backgroundColor: "#4CAF50",
        padding: 15,
        borderRadius: 8,
    },
    warning: {
        width: "95%",
        backgroundColor: "#FFC107",
        padding: 15,
        borderRadius: 8,
    },
    error: {
        width: "95%",
        backgroundColor: "#F44336",
        padding: 15,
        borderRadius: 8,
    },
    textTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
    },
    text: {
        fontSize: 14,
        color: "#fff",
        flexWrap: "wrap",
    }
});