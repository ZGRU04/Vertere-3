import Drawer from 'expo-router/drawer';
import { Text, StyleSheet, Image, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSession } from '../../../src/context/AuthContext';
import { Redirect } from 'expo-router';
import { deleteData } from '../../../src/utils/StorageService';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Icon } from 'react-native-paper';

const DrawerLayout = () => {
    const logo = require('../../../assets/images/masser-logo.jpg');
    const { session, isLoading, signOut } = useSession();

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (!session) {
        return <Redirect href="/sign-in" />;
    }

    const removeUserIntoStorage = async () => {
        await deleteData('temporalUserDetail');
    };

    const handleLogout = async () => {
        await removeUserIntoStorage();
        await signOut();
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                screenOptions={{
                    headerTitle: () => (
                        <View>
                            <Image source={logo} style={styles.logo} />
                        </View>
                    ),
                    headerStyle: { backgroundColor: '#fff' },
                    headerTitleAlign: 'center',
                }}
                drawerContent={(props) => (
                    <View style={{ flex: 1 }}>
                        {/* Contenedor superior para los Drawer Items */}
                        <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
                            <DrawerItemList {...props} />
                        </DrawerContentScrollView>

                        {/* Botón de Cerrar Sesión fijo abajo */}
                        <View style={styles.drawerFooter}>
                            <DrawerItem
                                label="Cerrar sesión"
                                onPress={handleLogout}
                                labelStyle={{ color: 'red', fontWeight: 'bold' }}
                                icon={({ color, size }) => <Icon source="logout" color={color} size={size}/>}
                                
                            />
                        </View>
                    </View>
                )}
            >
                <Drawer.Screen
                    name="(tabs)"
                    options={{
                        drawerLabel: 'Home',
                        headerTitle: '',
                        drawerIcon: ({ color, size }) => <Icon source="home" color={color} size={size}/>
                    }}
                />
                <Drawer.Screen
                    name="profile"
                    options={{
                        drawerLabel: "Perfil",
                        title: "Perfil",
                        headerTitleAlign: 'center',
                        drawerIcon: ({ color, size }) => <Icon source="account" color={color} size={size}/>
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    drawerContent: {
        flexGrow: 1, // Permite que el contenido crezca y empuje el botón hacia abajo
    },
    drawerFooter: {
        borderTopWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    logo: {
        width: 200,
        height: 70,
        resizeMode: 'contain',
    },
});

export default DrawerLayout;