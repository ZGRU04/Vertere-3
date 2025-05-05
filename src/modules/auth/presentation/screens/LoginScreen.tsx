import { useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'

import { LoginFormComponent } from '../components/LoginForm';
import { Login } from '../../domain/entities/login';
import { useSession } from '../../../../context/AuthContext';
import { authService } from '../../services/authService';
import { UserAuth } from '../../data/models/userAuth';
import { saveData } from '../../../../utils/StorageService';

export const LoginScreen = () => {
    const { signIn } = useSession();
    const router = useRouter();

    const saveUserIntoStorage = async (userDetail: UserAuth) => {
        await saveData('userDetail', userDetail)
    }

    const handleLogin = async (loginData: Login) => {
        try {
            const authData: any = await authService.auth(loginData);
            signIn(authData.token)
            saveUserIntoStorage({branch_office: authData.branch_office, user: authData.data, token: authData.token})
            router.replace('/(drawer)');
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <SafeAreaView style={{flex:1,  backgroundColor: 'white'}}>
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <LoginFormComponent onSubmit={ handleLogin }></LoginFormComponent>
            </View>
        </SafeAreaView>
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
