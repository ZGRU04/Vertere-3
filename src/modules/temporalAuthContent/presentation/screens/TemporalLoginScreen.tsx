import { useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native'
import { useSession } from '../../../../context/AuthContext';
import { TemporalLoginFormComponent } from '../components/TemporalLoginForm';
import { authService } from '../../../auth/services/authService';
import { saveData } from '../../../../utils/StorageService';
import { useState } from 'react';
import { ToastService } from '../../../shared/services/Toast/ToastService';

const logo = require('../../../../../assets/images/masser-logo.jpg');

const TemporalLoginScreen = () => {
    const [loading, setLoading] = useState(false);
    const { signIn } = useSession();
    const router = useRouter();

    const saveUserIntoStorage = async (userDetail: {employe: any, token: string }) => {
       await saveData('temporalUserDetail', userDetail)
    }

    const handleLogin = async (loginData: any) => {
        setLoading(true);
        try {
            const temporalAuthData = await authService.temporalAuth(loginData);
            if (temporalAuthData != null) {
                signIn(temporalAuthData.token);
                saveUserIntoStorage({ employe: temporalAuthData.employe, token: temporalAuthData.token});
                router.replace('/(drawer)');
            }
        } catch (error: any) {
            ToastService.errorToast(`${error?.message}`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView style={{flex:1,  backgroundColor: 'white'}}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <View style={styles.loadingImageContainer}>
                        <Image source={logo} style={styles.loadingImage} />
                    </View>
                </View>
            ) : (
                <View style={styles.container}>
                    <View style={styles.imageSection}>
                        <Image
                            source={logo}
                            style={styles.logo}
                            />
                    </View>
                    <View style={styles.formSection}>
                        <Text style={styles.title}>Ingresar al sistema</Text>
                        <TemporalLoginFormComponent onSubmit={handleLogin}></TemporalLoginFormComponent>
                    </View>
                </View>
            )}
        </SafeAreaView>
    )
}

export default TemporalLoginScreen;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 700,
        marginBottom: 20,
    },
    formSection: {
       marginBottom: 10,
    },
    imageSection: {
        marginTop: 55,
        marginBottom: 10,
        alignItems: 'center',
    },

    logo: {
        width: '85%',
        resizeMode: 'contain',
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: '#9E0C14',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingImageContainer: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 20
    },
    loadingImage: {
        width: 120,
        height: 30,
        resizeMode: 'contain',
    },
    spinner: {
        marginTop: 20,
    },
});
