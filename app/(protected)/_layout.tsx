import { Drawer } from 'expo-router/drawer';

export default function DrawerLayout() {
    return (
        <Drawer>
            <Drawer.Screen name="home" options={{ drawerLabel: 'Home', headerTitle: '' }} />
            <Drawer.Screen name="profile" options={{ drawerLabel: 'Perfil', headerTitle: 'Perfil' }} />
            <Drawer.Screen name="logout" options={{ drawerLabel: 'Cerrar sesión', headerTitle: 'Cerrar sesión' }} />
        </Drawer>
    );
}