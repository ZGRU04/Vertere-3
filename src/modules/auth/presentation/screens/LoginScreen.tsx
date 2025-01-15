import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { LoginFormComponent } from '../components/LoginForm';
import { Login } from '../../domain/entities/login';
import { useRouter } from 'expo-router';
import { PaperProvider } from 'react-native-paper';

export const LoginScreen = () => {
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();

    const formSubmited = (loginData: Login) => {
        router.replace('/(protected)/home');
    }

    return (
        <PaperProvider>
            <SafeAreaView style={{flex:1,  backgroundColor: 'white'}}>
                <View style={styles.container}>
                    <Text style={styles.title}>Login</Text>
                    <LoginFormComponent onSubmit={formSubmited}></LoginFormComponent>
                </View>
            </SafeAreaView>
        </PaperProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 700,
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        textAlign: 'center'
    },
});

/**
 * validacion, de inputs campo requerido  user, 
 * validacion de auth
 * redireccion de botton
 * alert de cuando algosale mal desde backend
 */
